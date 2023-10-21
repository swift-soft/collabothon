create or replace function "request_transfer"(
  "title" text,
  "receipt_id" uuid,
  "transfer_items" jsonb default '{}',
  "sender" uuid default auth.uid()
)
  returns void
  language plpgsql
  security definer
as $$
declare
  "transfer_request_id" uuid;
  "sender_account_number" text;
  "user_id" uuid;
  "item_data" jsonb;
begin
  select a."number" into "sender_account_number"
  from "accounts" a 
  where a."user_id" = "sender" limit 1;

  for "user_id", "item_data" in
      select "key", "value" from jsonb_each("transfer_items")
  loop
      insert into "transfer_requests"(
        "sender_account",
        "recipient_user",
        "title",
        "receipt_id"
      ) values (
        "sender_account_number",
        "user_id",
        "title",
        "receipt_id"
      ) returning "id" into "transfer_request_id";
      
      -- loop through the item data for each user
      for i in 0..jsonb_array_length(item_data) - 1
      loop
          insert into "transfer_request_receipt_items"(
            "transfer_request_id",
            "name",
            "settlement_type",
            "amount"
          ) values (
            "transfer_request_id",
            item_data->i->>'name',
            (item_data->i->>'settlement_type')::transfer_request_item_settlement_type,
            (item_data->i->>'amount')::integer
          );
      end loop;
  end loop;
end
$$;

create or replace function "get_user_stats"("from" timestamptz, "to" timestamptz)
  returns table (
    "category" text,
    "color" text,
    "total" numeric,
    "products" jsonb[]
  )
  language sql
as $$
  select
    c."name" as "category",
    c."color",
    coalesce(i."total", 0),
    coalesce(i."products", '{}') as "products"
  from "categories" c
  left join lateral (
  	select
  		sum(ri."price" * ri."amount") as "total",
    	array_agg(jsonb_build_object(
      		'name', ri."name",
      		'price', ri."price",
      		'amount', ri."amount"::int,
      		'date', t."created_at"
    	)) as "products"
    from "receipt_items" ri
  	inner join "receipts" r on r."id" = ri."receipt_id"
 	  inner join "transactions" t on t."id" =  r."transaction_id"
  	inner join "accounts" a on a."number" = t."source_account"
  	inner join "users" u on u."id" = a."user_id"
  	where ri."category" = c."name"
    and t."created_at" between "from" and "to"
  	and a."user_id" = auth.uid()
  ) i on true;
$$;

create or replace function "accept_transfer_request"("id" uuid)
  returns void
  language plpgsql
  security definer
as $$
declare
  "new_transaction_id" uuid;
begin
  insert into "transactions" (
    "title",
    "amount",
    "destination_account",
    "source_account"
  ) select
      trd."title",
      trd."total",
      trd."sender_account",
      (select a."number" from "accounts" a where a."user_id" = auth.uid() limit 1)
  from "transfer_request_details" trd
  where trd."id" = accept_transfer_request."id"
  returning transactions."id" into "new_transaction_id";

  update "transfer_requests" tr set 
    "state" = 'accepted',
    "decision_at" = now(),
    "transaction_id" = "new_transaction_id"
  where tr."id" = accept_transfer_request."id";
end
$$;
