import os
import random
from datetime import datetime, timedelta

os.makedirs(r"d:\e-com\src\data", exist_ok=True)

categories_data = [
    {
        "id": "cat_women", "name": "Women", "slug": "women", "description": "Elevate your style with our latest women's collection.", "image": "https://picsum.photos/seed/catwomen/800/1000",
        "subcategories": [
            {"id": "sub_w_dress", "name": "Dresses", "slug": "dresses"},
            {"id": "sub_w_top", "name": "Tops", "slug": "tops"},
            {"id": "sub_w_bottom", "name": "Bottoms", "slug": "bottoms"},
            {"id": "sub_w_outerwear", "name": "Outerwear", "slug": "outerwear"},
            {"id": "sub_w_knitwear", "name": "Knitwear", "slug": "knitwear"}
        ]
    },
    {
        "id": "cat_men", "name": "Men", "slug": "men", "description": "Classic and contemporary pieces for the modern man.", "image": "https://picsum.photos/seed/catmen/800/1000",
        "subcategories": [
            {"id": "sub_m_shirt", "name": "Shirts", "slug": "shirts"},
            {"id": "sub_m_tshirt", "name": "T-Shirts", "slug": "t-shirts"},
            {"id": "sub_m_trouser", "name": "Trousers", "slug": "trousers"},
            {"id": "sub_m_jacket", "name": "Jackets", "slug": "jackets"},
            {"id": "sub_m_knitwear", "name": "Knitwear", "slug": "knitwear"}
        ]
    },
    {
        "id": "cat_accessories", "name": "Accessories", "slug": "accessories", "description": "The perfect finishing touches to any outfit.", "image": "https://picsum.photos/seed/catacc/800/1000",
        "subcategories": [
            {"id": "sub_a_bag", "name": "Bags", "slug": "bags"},
            {"id": "sub_a_scarf", "name": "Scarves", "slug": "scarves"},
            {"id": "sub_a_belt", "name": "Belts", "slug": "belts"},
            {"id": "sub_a_jewelry", "name": "Jewelry", "slug": "jewelry"},
            {"id": "sub_a_sunglasses", "name": "Sunglasses", "slug": "sunglasses"}
        ]
    },
    {
        "id": "cat_home", "name": "Home & Living", "slug": "home-living", "description": "Curated essentials for a beautiful home.", "image": "https://picsum.photos/seed/cathome/800/1000",
        "subcategories": [
            {"id": "sub_h_bedding", "name": "Bedding", "slug": "bedding"},
            {"id": "sub_h_decor", "name": "Decor", "slug": "decor"},
            {"id": "sub_h_candles", "name": "Candles & Fragrance", "slug": "candles-fragrance"},
            {"id": "sub_h_tableware", "name": "Tableware", "slug": "tableware"},
            {"id": "sub_h_textiles", "name": "Textiles", "slug": "textiles"}
        ]
    },
    {
        "id": "cat_footwear", "name": "Footwear", "slug": "footwear", "description": "Step out in style with our premium footwear.", "image": "https://picsum.photos/seed/catshoe/800/1000",
        "subcategories": [
            {"id": "sub_f_sneaker", "name": "Sneakers", "slug": "sneakers"},
            {"id": "sub_f_boot", "name": "Boots", "slug": "boots"},
            {"id": "sub_f_sandal", "name": "Sandals", "slug": "sandals"},
            {"id": "sub_f_loafer", "name": "Loafers", "slug": "loafers"},
            {"id": "sub_f_heel", "name": "Heels", "slug": "heels"}
        ]
    },
    {
        "id": "cat_kids", "name": "Kids", "slug": "kids", "description": "Comfortable and playful styles for little ones.", "image": "https://picsum.photos/seed/catkid/800/1000",
        "subcategories": [
            {"id": "sub_k_boy", "name": "Boys", "slug": "boys"},
            {"id": "sub_k_girl", "name": "Girls", "slug": "girls"},
            {"id": "sub_k_baby", "name": "Baby", "slug": "baby"},
            {"id": "sub_k_shoe", "name": "Shoes", "slug": "shoes"},
            {"id": "sub_k_acc", "name": "Accessories", "slug": "accessories"}
        ]
    }
]

import json
def write_js(filename, data, export_name):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(f"export const {export_name} = {json.dumps(data, indent=2)};\n")

write_js(r'd:\e-com\src\data\categories.js', categories_data, 'categories')

# Generate Products
products = []
categories_map = {
    'Women': ['Silk Midi Dress', 'Linen Blend Top', 'Wool Cashmere Coat', 'Merino Wool Sweater', 'Denim Maxi Skirt', 'Tailored Wide-Leg Trousers', 'Cotton Poplin Blouse', 'Chunky Knit Cardigan', 'Pleated Satin Skirt'],
    'Men': ['Oxford Cloth Shirt', 'Organic Cotton T-Shirt', 'Slim Fit Chino Trousers', 'Vintage Wash Denim Jacket', 'Cashmere Crewneck Sweater', 'Linen Drawstring Shorts', 'Suede Bomber Jacket', 'Pique Polo Shirt', 'Corduroy Straight Pants'],
    'Accessories': ['Pebbled Leather Tote', 'Printed Silk Scarf', 'Classic Leather Belt', '18k Gold Hoop Earrings', 'Acetate Cat-Eye Sunglasses', 'Waxed Canvas Backpack', 'Sterling Silver Pendant', 'Braided Leather Belt', 'Metal Aviator Sunglasses'],
    'Home & Living': ['Hand-Glazed Ceramic Vase', 'Bergamot Scented Candle', 'Washed Linen Bedding Set', 'Chunky Woven Throw', 'Matte Dinner Plate Set', 'Linen Table Runner', 'Solid Marble Coasters', 'Carved Wooden Bowl', 'Hand-Blown Glass Carafe'],
    'Footwear': ['Classic Canvas Sneakers', 'Leather Chelsea Boots', 'Leather Strappy Sandals', 'Suede Penny Loafers', 'Suede Block Heels', 'Performance Running Shoes', 'Lace-Up Combat Boots', 'Leather Mules', 'Slip-on Leather Sneakers'],
    'Kids': ['Boys Graphic Print Tee', 'Girls Floral Tiered Dress', 'Organic Cotton Baby Romper', 'Kids Washed Denim Jacket', 'Boys Cotton Chino Shorts', 'Girls Pointelle Knit Sweater', 'Baby Ribbed Beanie', 'Kids Velcro Sneakers', 'Girls Stretch Leggings']
}

colors_pool = [
    {"name": "Black", "hex": "#000000"}, {"name": "White", "hex": "#FFFFFF"}, {"name": "Navy", "hex": "#1B2A4A"},
    {"name": "Beige", "hex": "#F5F5DC"}, {"name": "Terracotta", "hex": "#D4544A"}, {"name": "Olive", "hex": "#808000"},
    {"name": "Grey", "hex": "#808080"}, {"name": "Brown", "hex": "#A52A2A"}
]

clothing_sizes = ['XS', 'S', 'M', 'L', 'XL']
shoe_sizes = ['6', '7', '8', '9', '10', '11']
materials = ['100% Cotton', 'Silk Blend', '100% Linen', 'Cashmere Blend', 'Genuine Leather', 'Ceramic', 'Glass']

prod_id = 1

# Targets: 8 featured, 10 bestsellers, 12 new arrivals, 6 on sale (discount > 0), 3 out of stock.
flags = [
    {'featured': True} for _ in range(8)
] + [{'bestseller': True} for _ in range(10)] + [{'newArrival': True} for _ in range(12)] + [{'onSale': True} for _ in range(6)] + [{'outOfStock': True} for _ in range(3)]
flags += [{}] * (54 - len(flags))
random.seed(42)
random.shuffle(flags)

now = datetime.now()

for cat_idx, cat in enumerate(categories_data):
    cat_name = cat['name']
    subcats = cat['subcategories']
    items = categories_map[cat_name]
    for item_idx, item_name in enumerate(items):
        slug = item_name.lower().replace(' ', '-').replace(',', '')
        
        flag = flags[prod_id - 1]
        
        price = random.randint(29, 399)
        original_price = price
        discount = 0
        
        if flag.get('onSale'):
            discount = random.choice([10, 15, 20, 30, 50])
            original_price = int(price / (1 - discount/100))
            
        stock = 0 if flag.get('outOfStock') else random.randint(10, 100)
        
        sizes = []
        if cat_name in ['Women', 'Men', 'Kids']:
            sizes = clothing_sizes
            if 'Shoes' in item_name or 'Sneakers' in item_name:
                sizes = shoe_sizes
        elif cat_name == 'Footwear':
            sizes = shoe_sizes
            
        product = {
            "id": f"prod_{prod_id:03d}",
            "name": item_name,
            "slug": slug,
            "category": cat_name,
            "subcategory": random.choice(subcats)['name'],
            "brand": "LOOM",
            "images": [f"https://picsum.photos/seed/p{prod_id}img{i}/600/800" for i in range(1, random.randint(4, 6))],
            "price": price,
            "originalPrice": original_price,
            "discount": discount,
            "rating": round(random.uniform(3.5, 5.0), 1),
            "reviewCount": random.randint(10, 500),
            "colors": random.sample(colors_pool, random.randint(2, 5)),
            "sizes": sizes,
            "stock": stock,
            "description": f"The {item_name} brings unparalleled comfort and timeless style to your everyday routine. Crafted with premium materials, it is designed to last and keep you looking your best. A perfect addition to your curated lifestyle.",
            "specifications": {
                "Material": random.choice(materials),
                "Care": "Machine wash cold or dry clean",
                "Origin": "Imported",
                "Fit": "Regular fit, true to size"
            },
            "tags": ["premium", "everyday", "essential"],
            "material": random.choice(materials),
            "featured": flag.get('featured', False),
            "bestseller": flag.get('bestseller', False),
            "newArrival": flag.get('newArrival', False),
            "createdAt": (now - timedelta(days=random.randint(1, 100))).isoformat()
        }
        products.append(product)
        prod_id += 1

write_js(r'd:\e-com\src\data\products.js', products, 'products')

# Reviews
reviews = []
first_names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia']
last_names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
titles_5 = ['Amazing quality', 'Love it!', 'Perfect fit', 'Highly recommend', 'Exceeded expectations']
titles_3 = ['Just okay', 'Good but could be better', 'Not bad', 'Average', 'Decent quality']

for i in range(1, 61):
    pid = f"prod_{random.randint(1, 54):03d}"
    rating = random.choices([5,4,3,2,1], weights=[50,30,10,5,5])[0]
    title = random.choice(titles_5) if rating >= 4 else random.choice(titles_3)
    text = f"I bought this recently and it has been {title.lower()}. The quality is exactly what you would expect from LOOM."
    
    reviews.append({
        "id": f"rev_{i:03d}",
        "productId": pid,
        "userName": f"{random.choice(first_names)} {random.choice(last_names)[0]}.",
        "rating": rating,
        "date": (now - timedelta(days=random.randint(1, 60))).strftime('%Y-%m-%d'),
        "title": title,
        "text": text,
        "helpful": random.randint(0, 50),
        "verified": random.choice([True, True, False])
    })

write_js(r'd:\e-com\src\data\reviews.js', reviews, 'reviews')

# Coupons
coupons = [
    { "code": "WELCOME10", "type": "percentage", "value": 10, "minOrder": 50, "maxDiscount": 50, "expiresAt": "2027-12-31", "active": True },
    { "code": "SUMMER20", "type": "percentage", "value": 20, "minOrder": 100, "maxDiscount": 100, "expiresAt": "2027-08-31", "active": True },
    { "code": "FREESHIP", "type": "shipping", "value": 0, "minOrder": 75, "maxDiscount": 0, "expiresAt": "2027-12-31", "active": True },
    { "code": "LOOM15", "type": "percentage", "value": 15, "minOrder": 80, "maxDiscount": 75, "expiresAt": "2027-12-31", "active": True },
    { "code": "FLASH30", "type": "percentage", "value": 30, "minOrder": 150, "maxDiscount": 200, "expiresAt": "2023-01-01", "active": False }
]
write_js(r'd:\e-com\src\data\coupons.js', coupons, 'coupons')

# Banners
banners = [
    { "id": "ban_hero_1", "title": "Fall Collection 2026", "subtitle": "Discover the new cozy essentials.", "ctaText": "Shop Now", "ctaLink": "/collections/fall", "image": "https://picsum.photos/seed/hero1/1200/600", "type": "hero" },
    { "id": "ban_hero_2", "title": "Minimalist Home", "subtitle": "Elevate your living space.", "ctaText": "Explore Home", "ctaLink": "/category/home-living", "image": "https://picsum.photos/seed/hero2/1200/600", "type": "hero" },
    { "id": "ban_hero_3", "title": "Premium Denim", "subtitle": "Styles that last a lifetime.", "ctaText": "Shop Denim", "ctaLink": "/collections/denim", "image": "https://picsum.photos/seed/hero3/1200/600", "type": "hero" },
    { "id": "ban_promo_1", "title": "Summer Clearance", "subtitle": "Up to 50% off selected items.", "ctaText": "Shop Sale", "ctaLink": "/sale", "image": "https://picsum.photos/seed/promo1/1200/600", "type": "promo" },
    { "id": "ban_promo_2", "title": "Member Exclusive", "subtitle": "Get 20% off your next order.", "ctaText": "Join Now", "ctaLink": "/register", "image": "https://picsum.photos/seed/promo2/1200/600", "type": "promo" }
]
for cat in categories_data:
    banners.append({
        "id": f"ban_cat_{cat['slug']}",
        "title": cat['name'],
        "subtitle": f"Explore our {cat['name'].lower()} collection.",
        "ctaText": f"Shop {cat['name']}",
        "ctaLink": f"/category/{cat['slug']}",
        "image": f"https://picsum.photos/seed/bancat{cat['slug']}/1200/600",
        "type": "category"
    })
write_js(r'd:\e-com\src\data\banners.js', banners, 'banners')

# Users
users = [{
    "id": "usr_001",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "+1 (555) 123-4567",
    "avatar": "https://picsum.photos/seed/janedoe/200/200",
    "addresses": [
        {
            "id": "addr_1", "label": "Home", "name": "Jane Doe", "phone": "+1 (555) 123-4567",
            "address": "123 Loom Street, Apt 4B", "city": "New York", "state": "NY", "country": "USA", "postalCode": "10001", "isDefault": True
        }
    ],
    "paymentMethods": [
        { "id": "pm_1", "type": "Visa", "last4": "4242", "expiry": "12/28", "isDefault": True }
    ],
    "notifications": [
        { "id": "notif_1", "title": "Order Shipped", "message": "Your order #ORD-1002 has been shipped.", "date": (now - timedelta(days=2)).isoformat(), "read": True },
        { "id": "notif_2", "title": "Welcome to LOOM", "message": "Thanks for joining our community!", "date": (now - timedelta(days=30)).isoformat(), "read": True }
    ]
}]
write_js(r'd:\e-com\src\data\users.js', users, 'users')

# Orders
orders = [
    {
        "id": "ord_001", "orderNumber": "ORD-1001", "date": (now - timedelta(days=15)).isoformat(), "status": "delivered",
        "items": [
            { "productId": "prod_001", "name": "Silk Midi Dress", "image": "https://picsum.photos/seed/p1img1/600/800", "color": "Navy", "size": "M", "quantity": 1, "price": 129 }
        ],
        "subtotal": 129, "discount": 0, "shipping": 10, "tax": 11.61, "total": 150.61,
        "shippingAddress": users[0]['addresses'][0], "paymentMethod": users[0]['paymentMethods'][0],
        "timeline": [
            { "status": "placed", "date": (now - timedelta(days=15)).isoformat(), "description": "Order placed successfully" },
            { "status": "shipped", "date": (now - timedelta(days=14)).isoformat(), "description": "Order shipped" },
            { "status": "delivered", "date": (now - timedelta(days=12)).isoformat(), "description": "Order delivered" }
        ],
        "trackingNumber": "TRK987654321"
    },
    {
        "id": "ord_002", "orderNumber": "ORD-1002", "date": (now - timedelta(days=3)).isoformat(), "status": "shipped",
        "items": [
            { "productId": "prod_010", "name": "Oxford Cloth Shirt", "image": "https://picsum.photos/seed/p10img1/600/800", "color": "White", "size": "L", "quantity": 2, "price": 59 }
        ],
        "subtotal": 118, "discount": 11.8, "shipping": 0, "tax": 9.55, "total": 115.75,
        "shippingAddress": users[0]['addresses'][0], "paymentMethod": users[0]['paymentMethods'][0],
        "timeline": [
            { "status": "placed", "date": (now - timedelta(days=3)).isoformat(), "description": "Order placed successfully" },
            { "status": "shipped", "date": (now - timedelta(days=1)).isoformat(), "description": "Order shipped" }
        ],
        "trackingNumber": "TRK123456789"
    },
    {
        "id": "ord_003", "orderNumber": "ORD-1003", "date": (now - timedelta(days=1)).isoformat(), "status": "processing",
        "items": [
            { "productId": "prod_020", "name": "Printed Silk Scarf", "image": "https://picsum.photos/seed/p20img1/600/800", "color": "Red", "size": "", "quantity": 1, "price": 45 }
        ],
        "subtotal": 45, "discount": 0, "shipping": 5, "tax": 4.05, "total": 54.05,
        "shippingAddress": users[0]['addresses'][0], "paymentMethod": users[0]['paymentMethods'][0],
        "timeline": [
            { "status": "placed", "date": (now - timedelta(days=1)).isoformat(), "description": "Order placed successfully" }
        ],
        "trackingNumber": ""
    },
    {
        "id": "ord_004", "orderNumber": "ORD-1004", "date": (now - timedelta(days=20)).isoformat(), "status": "returned",
        "items": [
            { "productId": "prod_030", "name": "Washed Linen Bedding Set", "image": "https://picsum.photos/seed/p30img1/600/800", "color": "Beige", "size": "Queen", "quantity": 1, "price": 199 }
        ],
        "subtotal": 199, "discount": 0, "shipping": 0, "tax": 17.91, "total": 216.91,
        "shippingAddress": users[0]['addresses'][0], "paymentMethod": users[0]['paymentMethods'][0],
        "timeline": [
            { "status": "placed", "date": (now - timedelta(days=20)).isoformat(), "description": "Order placed successfully" },
            { "status": "delivered", "date": (now - timedelta(days=17)).isoformat(), "description": "Order delivered" },
            { "status": "returned", "date": (now - timedelta(days=5)).isoformat(), "description": "Return processed" }
        ],
        "trackingNumber": "TRK555666777"
    },
    {
        "id": "ord_005", "orderNumber": "ORD-1005", "date": (now - timedelta(days=5)).isoformat(), "status": "cancelled",
        "items": [
            { "productId": "prod_040", "name": "Leather Chelsea Boots", "image": "https://picsum.photos/seed/p40img1/600/800", "color": "Black", "size": "10", "quantity": 1, "price": 150 }
        ],
        "subtotal": 150, "discount": 0, "shipping": 0, "tax": 13.5, "total": 163.5,
        "shippingAddress": users[0]['addresses'][0], "paymentMethod": users[0]['paymentMethods'][0],
        "timeline": [
            { "status": "placed", "date": (now - timedelta(days=5)).isoformat(), "description": "Order placed successfully" },
            { "status": "cancelled", "date": (now - timedelta(days=4)).isoformat(), "description": "Order cancelled by user" }
        ],
        "trackingNumber": ""
    }
]
write_js(r'd:\e-com\src\data\orders.js', orders, 'orders')

print("All mock data files successfully generated.")
