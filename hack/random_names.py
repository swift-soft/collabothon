import random

# List of possible words for product names
adjectives = ['Red', 'Green', 'Blue', 'Small', 'Large', 'Premium', 'Deluxe', 'Super', 'Ultra', 'Classic']
nouns = ['Shirt', 'Shoes', 'Hat', 'Pants', 'Socks', 'Dress', 'Jacket', 'Jeans', 'Gloves', 'Belt']

# Generate 100 random product names
product_names = []

for _ in range(100):
    product_name = f"{random.choice(adjectives)} {random.choice(nouns)}"
    product_names.append(product_name)

print(product_names)
