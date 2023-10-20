INSERT INTO "transactions" ("amount", "created_at", "accounted_at", "source_account", "destination_account")
SELECT
    floor(random() * 99901 + 100) as "amount", -- Random amount between 100 and 100000
    now() - (random() * interval '30 days') as "created_at", -- Random created_at within the last 30 days
    now() - (random() * interval '30 days') as "accounted_at", -- Random accounted_at within the last 30 days
    '05103138650498282939298823' as "source_account", -- Keep the same source_account
    '19606417273928987553747070' as "destination_account" -- Keep the same destination_account
FROM generate_series(1, 100);

-- Update "accounted_at" to be exactly 10 hours after "created_at"
UPDATE "transactions"
SET "accounted_at" = "created_at" + interval '10 hours';
