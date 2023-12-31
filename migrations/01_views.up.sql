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

create view "user_transactions" as
select
  t.*
from "transactions" t
join "accounts" a on a."number" = t."source_account" or a."number" = t."destination_account"
join "users" u on u."id" = a."user_id"
where u."id" = auth.uid();

create view "receipts_joined" as
select
  r.*,
  coalesce(ri."items", '[]'::jsonb) as "items"
from "receipts" r
left join lateral (
  select 
    jsonb_agg(jsonb_build_object(
      'name', ri."name",
      'price', ri."price",
      'amount', ri."amount",
      'category', ri."category"
    )) as "items"
  from "receipt_items" ri 
  where ri."receipt_id" = r."id"
) ri on true;

create view "user_unique_contacts" as
select
  u.*
from "users" u
inner join ( 
  select distinct "contact" from (
    select 
    	case 
    		when "user_one" = auth.uid() then "user_two"
    		else "user_one"
    	end as "contact"
    from "user_contacts" 
    where "user_one" = auth.uid() 
    or "user_two" = auth.uid()
  ) c
) c on c."contact" = u."id";

create view "transfer_request_details" as
select
  tr.*,
  jsonb_build_object(
    'id', u."id",
    'email', u."email",
    'full_name', u."full_name",
    'phone_number', u."phone_number"
  ) as "sender",
  i."total",
  i."items"
from "transfer_requests" tr
left join "accounts" a on a."number" = tr."sender_account"
left join "users" u on u."id" = a."user_id"
left join lateral (
  select
    sum(
      case 
        when trri."settlement_type" = 'money' then trri."amount"
        when trri."settlement_type" = 'no_of_items' then trri."amount" * ri."price"
        else ((trri."amount"::float / 10000)::float * ri."price"::float * ri."amount"::float)::int 
      end
    ) as "total",
    jsonb_agg(jsonb_build_object(
      'name', trri."name",
      'amount', trri."amount",
      'settlement_type', trri."settlement_type",
      'amount_money', case 
        when trri."settlement_type" = 'money' then trri."amount"
        when trri."settlement_type" = 'no_of_items' then trri."amount" * ri."price"
        else ((trri."amount"::float / 10000)::float * ri."price"::float * ri."amount"::float)::int 
      end
    )) as "items"
  from "transfer_request_receipt_items" trri
  left join "receipt_items" ri 
    on ri."name" = trri."name"
    and ri."receipt_id" = tr."receipt_id"
  where trri."transfer_request_id" = tr."id"
) i on true;