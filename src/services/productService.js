import { products } from '../data/products';
import { categories } from '../data/categories';
import { reviews } from '../data/reviews';

export const getProducts = (filters = {}) => {
  const {
    category,
    subcategory,
    priceMin,
    priceMax,
    colors,
    sizes,
    rating,
    inStock,
    search,
    sort,
    page = 1,
    limit = 12,
  } = filters;

  let filtered = [...products];

  if (category) {
    const cats = Array.isArray(category) ? category : [category];
    if (cats.length > 0) {
      filtered = filtered.filter((p) => 
        cats.some(c => 
          (p.category && p.category.toLowerCase() === c.toLowerCase()) || 
          (p.categorySlug && p.categorySlug.toLowerCase() === c.toLowerCase()) ||
          (p.categoryId && p.categoryId.toLowerCase() === c.toLowerCase())
        )
      );
    }
  }
  
  if (subcategory) {
    const subcats = Array.isArray(subcategory) ? subcategory : [subcategory];
    if (subcats.length > 0) {
      filtered = filtered.filter((p) => 
        subcats.some(s => {
          const sNorm = s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          const pSubNorm = (p.subcategory || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            (p.subcategory && p.subcategory.toLowerCase() === s.toLowerCase()) ||
            pSubNorm === sNorm ||
            (p.subcategorySlug && p.subcategorySlug.toLowerCase() === s.toLowerCase()) ||
            (p.subcategoryId && p.subcategoryId.toLowerCase() === s.toLowerCase())
          );
        })
      );
    }
  }

  if (priceMin !== undefined && priceMin !== '') {
    filtered = filtered.filter((p) => p.price >= Number(priceMin));
  }

  if (priceMax !== undefined && priceMax !== '') {
    filtered = filtered.filter((p) => p.price <= Number(priceMax));
  }

  if (colors && colors.length > 0) {
    filtered = filtered.filter((p) => p.colors?.some((c) => colors.includes(c.name || c)));
  }

  if (sizes && sizes.length > 0) {
    filtered = filtered.filter((p) => p.sizes?.some((s) => sizes.includes(s)));
  }

  if (rating !== undefined && rating > 0) {
    filtered = filtered.filter((p) => (p.rating || 0) >= Number(rating));
  }

  if (inStock) {
    filtered = filtered.filter((p) => p.stock > 0);
  }

  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.tags?.some((t) => t.toLowerCase().includes(query))
    );
  }

  if (sort) {
    switch (sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popularity':
        filtered.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
  }

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / limit);
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filtered.slice(startIndex, startIndex + limit);

  return {
    products: paginatedProducts,
    totalCount,
    totalPages,
    currentPage: page,
  };
};

export const getProductBySlug = (slug) => {
  if (!slug) return null;
  const decoded = decodeURIComponent(slug).toLowerCase().trim();
  return products.find((p) => 
    p.slug.toLowerCase() === decoded || 
    p.id.toLowerCase() === decoded ||
    p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === decoded
  ) || null;
};

export const getProductsByCategory = (categorySlug, subcategorySlug) => {
  return getProducts({ category: categorySlug, subcategory: subcategorySlug, limit: 100 });
};

export const searchProducts = (query) => {
  return getProducts({ search: query, limit: 20 });
};

export const getRelatedProducts = (productId, limit = 8) => {
  const currentProduct = products.find((p) => p.id === productId);
  if (!currentProduct) return [];
  
  return products
    .filter((p) => p.id !== productId && p.category === currentProduct.category)
    .slice(0, limit);
};

export const getFeaturedProducts = (limit = 8) => {
  return products.filter((p) => p.featured).slice(0, limit);
};

export const getBestsellers = (limit = 8) => {
  return [...products]
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
    .slice(0, limit);
};

export const getNewArrivals = (limit = 8) => {
  return [...products]
    .filter((p) => p.newArrival)
    .slice(0, limit);
};

export const getProductReviews = (productId) => {
  return reviews.filter((r) => r.productId === productId);
};

export const getCategories = () => {
  return categories || [];
};

export const getCategoryBySlug = (slug) => {
  return categories.find((c) => c.slug === slug) || null;
};

const productService = {
  getProducts,
  getProductBySlug,
  getProductsByCategory,
  searchProducts,
  getRelatedProducts,
  getFeaturedProducts,
  getBestsellers,
  getNewArrivals,
  getProductReviews,
  getCategories,
  getCategoryBySlug,
};

export default productService;

