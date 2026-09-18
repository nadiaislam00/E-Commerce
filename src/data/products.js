const products = [];

// Curated high-resolution imagery specifically tailored for Men and Kids apparel
const apparelImages = {
  'Men': {
    'Shirts': [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620012253295-c15c429fbb40?auto=format&fit=crop&w=800&q=80'
    ],
    'T-Shirts': [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
    ],
    'Trousers': [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80'
    ],
    'Jackets': [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    'Knitwear': [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80'
    ]
  },
  'Kids': {
    'Boys': [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca564?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80'
    ],
    'Girls': [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80'
    ],
    'Baby': [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771917714-d02c5240212f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=800&q=80'
    ],
    'Knitwear': [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80'
    ],
    'Outerwear': [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80'
    ]
  }
};

// 48 distinct, realistic apparel products focused solely on Men and Kids collections
const templates = [
  // --- MEN APPAREL (24 items) ---
  { cat: 'Men', sub: 'Shirts', name: 'Classic Oxford Cloth Button-Down' },
  { cat: 'Men', sub: 'Shirts', name: 'French Linen Relaxed Shirt' },
  { cat: 'Men', sub: 'Shirts', name: 'Japanese Selvedge Chambray Shirt' },
  { cat: 'Men', sub: 'Shirts', name: 'Garment-Dyed Twill Overshirt' },
  { cat: 'Men', sub: 'T-Shirts', name: 'Heavyweight Supima Cotton Tee' },
  { cat: 'Men', sub: 'T-Shirts', name: 'Waffle Knit Long Sleeve Henley' },
  { cat: 'Men', sub: 'T-Shirts', name: 'Mercerized Cotton Pocket Tee' },
  { cat: 'Men', sub: 'T-Shirts', name: 'Fine Pique Classic Polo Shirt' },
  { cat: 'Men', sub: 'Trousers', name: 'Tailored Slim Fit Chinos' },
  { cat: 'Men', sub: 'Trousers', name: 'Relaxed Linen Drawstring Trousers' },
  { cat: 'Men', sub: 'Trousers', name: 'Straight Leg Corduroy Pants' },
  { cat: 'Men', sub: 'Trousers', name: 'Japanese Selvedge Denim Jeans' },
  { cat: 'Men', sub: 'Jackets', name: 'Vintage Wash Trucker Denim Jacket' },
  { cat: 'Men', sub: 'Jackets', name: 'Minimalist Suede Bomber Jacket' },
  { cat: 'Men', sub: 'Jackets', name: 'Water-Repellent Utility Field Jacket' },
  { cat: 'Men', sub: 'Jackets', name: 'Unstructured Wool Blend Blazer' },
  { cat: 'Men', sub: 'Knitwear', name: 'Mongolian Cashmere Crewneck' },
  { cat: 'Men', sub: 'Knitwear', name: 'Fine Merino Wool Roll Neck' },
  { cat: 'Men', sub: 'Knitwear', name: 'Chunky Ribbed Shawl Cardigan' },
  { cat: 'Men', sub: 'Knitwear', name: 'Cotton-Linen Summer Sweater' },
  { cat: 'Men', sub: 'Trousers', name: 'Pleated Wool Flannel Trousers' },
  { cat: 'Men', sub: 'Shirts', name: 'Camp Collar Linen Short Sleeve' },
  { cat: 'Men', sub: 'T-Shirts', name: 'Raw Edge Slub Jersey T-Shirt' },
  { cat: 'Men', sub: 'Jackets', name: 'Insulated Quilted Work Jacket' },

  // --- KIDS APPAREL (24 items) ---
  { cat: 'Kids', sub: 'Boys', name: 'Boys Organic Cotton Striped Tee' },
  { cat: 'Kids', sub: 'Boys', name: 'Boys Stretch Chino Trousers' },
  { cat: 'Kids', sub: 'Boys', name: 'Boys French Terry Zip Hoodie' },
  { cat: 'Kids', sub: 'Boys', name: 'Boys Washed Denim Button Jacket' },
  { cat: 'Kids', sub: 'Boys', name: 'Boys Linen Drawstring Shorts' },
  { cat: 'Kids', sub: 'Girls', name: 'Girls Floral Embroidered Tiered Dress' },
  { cat: 'Kids', sub: 'Girls', name: 'Girls Pointelle Cotton Knit Cardigan' },
  { cat: 'Kids', sub: 'Girls', name: 'Girls Organic Cotton Ribbed Leggings' },
  { cat: 'Kids', sub: 'Girls', name: 'Girls Linen Pinafore Overall Dress' },
  { cat: 'Kids', sub: 'Girls', name: 'Girls Ruffled Flutter-Sleeve Blouse' },
  { cat: 'Kids', sub: 'Baby', name: 'Organic Cotton Kimono Baby Romper' },
  { cat: 'Kids', sub: 'Baby', name: 'Pure Cotton Ribbed Baby Sleepsuit' },
  { cat: 'Kids', sub: 'Baby', name: 'Knitted Cashmere Blend Baby Beanie' },
  { cat: 'Kids', sub: 'Baby', name: 'Muslin Cotton Baby Overall Set' },
  { cat: 'Kids', sub: 'Baby', name: 'Baby Merino Wool Booties & Mittens' },
  { cat: 'Kids', sub: 'Knitwear', name: 'Kids Chunky Cable Knit Jumper' },
  { cat: 'Kids', sub: 'Knitwear', name: 'Kids Colorblock Crewneck Sweater' },
  { cat: 'Kids', sub: 'Knitwear', name: 'Kids Fair Isle Organic Sweater' },
  { cat: 'Kids', sub: 'Outerwear', name: 'Kids Fleece-Lined Rain Anorak' },
  { cat: 'Kids', sub: 'Outerwear', name: 'Kids Quilted Puffer Vest' },
  { cat: 'Kids', sub: 'Outerwear', name: 'Kids Sherpa Collar Denim Jacket' },
  { cat: 'Kids', sub: 'Boys', name: 'Boys Cotton Plaid Casual Shirt' },
  { cat: 'Kids', sub: 'Girls', name: 'Girls Tiered Cotton Maxi Skirt' },
  { cat: 'Kids', sub: 'Baby', name: 'Organic Cotton Two-Piece Loungewear' }
];

const colors = [
  { name: 'Navy', hex: '#1B2A4A' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Heather Gray', hex: '#808080' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Terracotta', hex: '#D4544A' },
  { name: 'Olive Green', hex: '#556B2F' }
];

const menSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const kidsSizes = ['2Y', '3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'];
const babySizes = ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M'];
const materials = ['100% GOTS Organic Cotton', 'European Washed Linen', 'Fine Merino Wool', 'Supima Cotton'];

for (let i = 0; i < templates.length; i++) {
  const t = templates[i];
  const prod_id = `prod_${(i + 1).toString().padStart(3, '0')}`;

  let p_sizes = menSizes;
  if (t.cat === 'Kids') {
    p_sizes = t.sub === 'Baby' ? babySizes : kidsSizes;
  }

  const p_price = t.cat === 'Kids' ? (24 + (i * 5) % 65) : (45 + (i * 9) % 195);
  const onSale = (i % 6 === 0);
  const p_discount = onSale ? 20 : 0;
  const p_original = onSale ? Math.floor(p_price / 0.8) : p_price;

  // Retrieve category image pool
  const catPool = apparelImages[t.cat] || {};
  const subPool = catPool[t.sub] || Object.values(catPool)[0] || [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
  ];

  const img1 = subPool[i % subPool.length];
  const img2 = subPool[(i + 1) % subPool.length];
  const img3 = subPool[(i + 2) % subPool.length];
  const img4 = subPool[(i + 3) % subPool.length];

  products.push({
    id: prod_id,
    name: t.name,
    slug: t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    category: t.cat,
    subcategory: t.sub,
    brand: 'LOOM',
    images: [img1, img2, img3, img4],
    price: p_price,
    originalPrice: p_original,
    discount: p_discount,
    rating: Number((4.0 + ((i * 3) % 10) / 10).toFixed(1)),
    reviewCount: 15 + (i * 17) % 320,
    colors: [
      colors[i % colors.length],
      colors[(i + 1) % colors.length],
      colors[(i + 2) % colors.length]
    ],
    sizes: p_sizes,
    stock: (i === 11 || i === 31) ? 0 : (25 + i * 2),
    description: `The ${t.name} is an essential component of the LOOM collection. Designed with intentional simplicity, natural breathability, and certified skin-friendly dyes for day-long comfort.`,
    specifications: {
      "Fabric Composition": materials[i % materials.length],
      "Care Instructions": "Gentle machine wash cold, lay flat to dry",
      "Tailoring & Origin": "Crafted with ethical partner ateliers in Portugal",
      "Fit Profile": "Regular relaxed fit, true to size"
    },
    tags: ["clothing", "apparel", t.cat.toLowerCase(), t.sub.toLowerCase()],
    material: materials[i % materials.length],
    featured: (i % 5 === 0),
    bestseller: (i % 4 === 0),
    newArrival: (i % 3 === 0),
    createdAt: new Date(Date.now() - (i * 86400000)).toISOString()
  });
}

export { products };
export default products;
