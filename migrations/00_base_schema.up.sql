create table "users" (
  "id" uuid references auth."users" primary key,
  "email" text not null unique,
  "full_name" text,
  "phone_number" text unique
);

create function handle_new_user()
  returns trigger
  language plpgsql
  security definer
as $$
begin
  insert into public."users" (
    "id",
    "email",
    "full_name",
    "phone_number"
  ) values (
    new."id",
    new."email",
    new."raw_user_meta_data"->>'full_name',
    new."raw_user_meta_data"->>'phone_number'
  ) on conflict ("id") do update set
    "email" = excluded."email",
    "phone_number" = excluded."phone_number",
    "full_name" = excluded."full_name";

  return new;
end;
$$ ;

create trigger "on_auth_user_created"
after insert on auth."users"
for each row execute procedure public."handle_new_user"();

-- secrets

create table "secrets" (
  "name" text primary key,
  "value" text not null
);

create or replace function get_secret("name" text)
  returns text language sql
as $$
    select s."value" from "secrets" s where s."name" = get_secret."name";
$$;

-- accounts table

create table "accounts" (
  "number" text primary key,
  "user_id" uuid not null references "users"("id")
);

-- sellers

create table "sellers" (
  "id" uuid primary key default uuid_generate_v4(),
  "account_number" text not null references "accounts"("number") on delete cascade,
  "name" text not null,
  "nip" text
);

-- Transactions Table
create table "transactions" (
    "id" uuid primary key default uuid_generate_v4(),
    "created_at" timestamptz not null default now(),
    "accounted_at" timestamptz,
    "title" text not null,
    "amount" int not null default 0,
    "source_account" text references "accounts"("number") on delete cascade,
    "destination_account" text references "accounts"("number") on delete cascade,

    check(extract(timezone from "created_at") = '0')
);

-- receipts

create table "receipts" (
    "id" uuid primary key default uuid_generate_v4(),
    "seller_id" uuid not null references "sellers"("id") on delete cascade,
    "transaction_id" uuid not null references "transactions"("id") on delete cascade
);

create extension if not exists "citext";

create table "categories" (
  "name" citext primary key
);

create table "receipt_items" (
  "receipt_id" uuid not null references "receipts"("id") on delete cascade,
  "name" citext not null,
  "amount" numeric(12,5) not null, -- can be weight or exact count
  "price" int not null,
  "category" citext references "categories"("name") on delete set null,

  primary key ("receipt_id", "name") 
);

-- transfer requests

create type transfer_state as enum ('sent', 'received', 'accepted', 'rejected');

create table "transfer_requests" (
  "id" uuid primary key default uuid_generate_v4(),
  "sender_account" text not null references "accounts"("number") on delete cascade,
  "recipient_account" text not null references "accounts"("number") on delete cascade,
  
  "title" text not null,

  "requested_at" timestamptz not null default now(),
  "decision_at" timestamptz,
  "state" transfer_state not null default 'sent',

  "receipt_id" uuid not null references "receipts"("id") on delete cascade
);

create table "transfer_request_receipt_items" (
  "transfer_request_id" uuid not null references "transfer_requests"("id") on delete cascade,
  "name" citext not null,
  "amount" int -- of money
);