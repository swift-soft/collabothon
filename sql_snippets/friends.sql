-- sadly creates duplicates
insert into "user_contacts" (user_one, user_two) 
select 
	u1."id",
	u2."id"
from "users" u1
inner join "users" u2 on u2."id" != u1."id";