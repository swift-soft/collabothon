create or replace function "get_random_transaction_title"()
  returns text
  language sql
as $$
  SELECT titles[floor(array_upper(titles, 1) * random() + 1)::int] FROM (
      SELECT ARRAY[
        'Grocery shopping', 'Restaurant', 'Żabka', 'Clothes&Co', 'Biedronka', 'Lidl'] AS titles
    ) AS subquery
$$;

INSERT INTO "transactions" ("title", "amount", "created_at", "accounted_at", "source_account", "destination_account")
SELECT
    get_random_transaction_title(),
    floor(random() * 49901 + 100) as "amount", -- Random amount between 100 and 100000
    now() - (random() * interval '30 days') as "created_at", -- Random created_at within the last 30 days
    now() - (random() * interval '30 days') as "accounted_at", -- Random accounted_at within the last 30 days
    '05103138650498282939298823' as "source_account", -- Keep the same source_account
    '53736385621521069198391732' as "destination_account" -- Keep the same destination_account
FROM generate_series(1, 20);

-- Update "accounted_at" to be exactly 10 hours after "created_at"
UPDATE "transactions"
SET "accounted_at" = "created_at" + interval '10 hours';
