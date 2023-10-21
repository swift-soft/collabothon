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
