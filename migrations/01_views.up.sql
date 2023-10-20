create view "user_profile" as
select
  u."id",
  u."email",
  u."full_name",
  u."phone_number",
  a."number" as "account_number"
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
