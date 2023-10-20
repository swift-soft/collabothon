create or replace function "get_account_balance"()
  returns int
  language sql
as $$
  select
    sum(
      case
        when a."number" = t."source_account" then -1 * t."amount"
        else t."amount"
      end
    ) 
  from "transactions" t
  join "accounts" a on a."number" = t."source_account" or a."number" = t."destination_account"
  join "users" u on u."id" = a."user_id"
  where u."id" = auth.uid();
$$;

create view "user_profile" as
select
  u."id",
  u."email",
  u."full_name",
  u."phone_number",
  a."number" as "account_number",
  get_account_balance() as "account_balance"
from "users" as u
left join "accounts" a on a."user_id" = u."id"
where auth.uid() = u."id";

create view "transaction_details" as
select
  t.*,
  da."destination_account_details",
  sa."source_account_details"
from "transactions" t
left join lateral (
  select jsonb_build_object(
    'number', a."number",
    'user', jsonb_build_object(
      'id', u."id",
      'email', u."email",
      'full_name', u."full_name",
      'phone_number', u."phone_number"
    ),
    'seller', case 
                when s."id" is null then null 
                else jsonb_build_object(
                  'id', s."id",
                  'name', s."name",
                  'nip', s."nip"
                ) 
              end
  ) "destination_account_details"
  from "accounts" a
  left join "users" u on u."id" = a."user_id"  
  left join "sellers" s on s."account_number" = a."number"
  where a."number" = t."destination_account"
) da on true
left join lateral (
  select jsonb_build_object(
    'number', a."number",
    'user', jsonb_build_object(
      'id', u."id",
      'email', u."email",
      'full_name', u."full_name",
      'phone_number', u."phone_number"
    ),
    'seller', case 
                when s."id" is null then null 
                else jsonb_build_object(
                  'id', s."id",
                  'name', s."name",
                  'nip', s."nip"
                ) 
              end
  ) "source_account_details"
  from "accounts" a
  left join "users" u on u."id" = a."user_id"  
  left join "sellers" s on s."account_number" = a."number"
  where a."number" = t."source_account"
) sa on true
where 
  (da."destination_account_details"->'user'->>'id')::uuid = auth.uid()
  or (sa."source_account_details"->'user'->>'id')::uuid = auth.uid();

create or replace function "get_user_stats"("from" timestamptz, "to" timestamptz)
  returns table (
    "category" text,
    "total" numeric,
    "products" jsonb[]
  )
  language sql
as $$
  select
    ri."category",
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
  where 
    t."created_at" between "from" and "to"
    and u."id" = auth.uid()
  group by ri."category"
$$;

create view "user_transactions" as
select
  t.*
from "transactions" t
join "accounts" a on a."number" = t."source_account" or a."number" = t."destination_account"
join "users" u on u."id" = a."user_id"
where u."id" = auth.uid();
