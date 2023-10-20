insert into "receipts" (seller_id, transaction_id)
select
  '47631d5a-5295-4c14-8727-5849575ac615'::uuid,
  t."id"
from "transactions" t;

create or replace function "get_random_name"()
  returns text
  language sql
as $$
  SELECT product_names[floor(array_upper(product_names, 1) * random() + 1)::int] FROM (
      SELECT ARRAY[
        'Large Hat', 'Deluxe Shoes', 'Large Shoes', 'Super Socks', 'Green Hat', 'Classic Jacket', 'Large Socks', 'Super Dress', 'Green Pants', 'Red Socks', 'Red Belt', 'Classic Dress', 'Deluxe Jacket', 'Red Dress', 'Ultra Belt', 'Small Shoes', 'Green Jeans', 'Classic Shirt', 'Super Dress', 'Classic Pants', 'Small Jacket', 'Green Belt', 'Premium Pants', 'Green Pants', 'Large Hat', 'Large Jacket', 'Green Belt', 'Ultra Jacket', 'Blue Pants', 'Deluxe Dress', 'Small Pants', 'Large Shoes', 'Blue Shoes', 'Super Gloves', 'Red Pants', 'Red Pants', 'Blue Socks', 'Red Shirt', 'Green Gloves', 'Large Shoes', 'Deluxe Pants', 'Premium Hat', 'Classic Gloves', 'Deluxe Dress', 'Large Shirt', 'Red Gloves', 'Large Shirt', 'Deluxe Pants', 'Classic Jeans', 'Ultra Shoes', 'Super Shoes', 'Classic Socks', 'Deluxe Pants', 'Red Gloves', 'Green Socks', 'Premium Shoes', 'Small Hat', 'Small Jacket', 'Small Belt', 'Premium Shirt', 'Ultra Gloves', 'Premium Belt', 'Blue Dress', 'Premium Dress', 'Small Shoes', 'Deluxe Gloves', 'Large Shirt', 'Large Hat', 'Green Shoes', 'Large Jeans', 'Green Dress', 'Large Socks', 'Classic Shoes', 'Super Belt', 'Large Shirt', 'Small Belt', 'Deluxe Pants', 'Super Hat', 'Deluxe Dress', 'Green Dress', 'Red Shirt', 'Super Jacket', 'Ultra Socks', 'Green Belt', 'Super Dress', 'Blue Socks', 'Large Socks', 'Small Jeans', 'Blue Gloves', 'Classic Shoes', 'Super Shirt', 'Blue Gloves', 'Super Gloves', 'Small Shoes', 'Classic Jacket', 'Classic Shirt', 'Deluxe Gloves', 'Deluxe Jacket', 'Large Jacket', 'Premium Jeans'] AS product_names
    ) AS subquery
$$;

create or replace function "get_random_category"()
  returns text
  language sql
as $$
  SELECT "name" FROM "categories" ORDER BY random() LIMIT 1
$$;

INSERT INTO receipt_items (
  "receipt_id",
  "name",
  "amount",
  "price",
  "category"
) SELECT
  r."id",
  get_random_name() AS "name",
  floor(random() * 5 + 1)AS "amount",
  round(random() * 19950 + 50)AS "price",
  get_random_category() AS "category"
from generate_series(1, 5) -- number of items per receipt
left join (select r."id" from "receipts" r) r on true; -- number of receipts to insert items for
