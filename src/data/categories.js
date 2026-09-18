export const categories = [
  {
    id: 'cat_men',
    name: 'Men',
    slug: 'men',
    description: 'Refined tailoring, structured casualwear, premium outerwear, and everyday essentials for men.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    subcategories: [
      { id: 'sub_m_shirt', name: 'Shirts', slug: 'shirts' },
      { id: 'sub_m_tshirt', name: 'T-Shirts & Polos', slug: 't-shirts' },
      { id: 'sub_m_trouser', name: 'Trousers & Chinos', slug: 'trousers' },
      { id: 'sub_m_jacket', name: 'Jackets & Coats', slug: 'jackets' },
      { id: 'sub_m_knitwear', name: 'Knitwear & Sweaters', slug: 'knitwear' }
    ]
  },
  {
    id: 'cat_kids',
    name: 'Kids',
    slug: 'kids',
    description: 'Thoughtfully designed organic cotton clothing, playful sets, and durable apparel for boys, girls, and babies.',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=85',
    subcategories: [
      { id: 'sub_k_boy', name: 'Boys Clothing', slug: 'boys' },
      { id: 'sub_k_girl', name: 'Girls Clothing', slug: 'girls' },
      { id: 'sub_k_baby', name: 'Baby Essentials', slug: 'baby' },
      { id: 'sub_k_knit', name: 'Kids Knitwear', slug: 'knitwear' },
      { id: 'sub_k_outer', name: 'Kids Outerwear', slug: 'outerwear' }
    ]
  }
];

export default categories;
