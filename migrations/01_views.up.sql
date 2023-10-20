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
