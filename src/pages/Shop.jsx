import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import FilterSidebar from '../components/product/FilterSidebar';
import FilterDrawer from '../components/product/FilterDrawer';
import SortDropdown from '../components/product/SortDropdown';
import ProductGrid from '../components/product/ProductGrid';
import { Breadcrumb, Chip, Button, Pagination } from '../components/ui';
import productService from '../services/productService';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Parse filters from URL
  const currentFilters = {
    categories: searchParams.getAll('category'),
    subcategories: searchParams.getAll('subcategory'),
    colors: searchParams.getAll('color'),
    sizes: searchParams.getAll('size'),
    materials: searchParams.getAll('material'),
    priceMin: searchParams.get('minPrice') || '',
    priceMax: searchParams.get('maxPrice') || '',
    rating: Number(searchParams.get('rating')) || 0,
    inStock: searchParams.get('inStock') === 'true',
    sort: searchParams.get('sort') || 'featured',
    page: Number(searchParams.get('page')) || 1,
    limit: 12
  };

  const fetchProducts = async (filters) => {
    setLoading(true);
    try {
      // Map frontend filter shape to service shape if needed
      const serviceParams = {
        category: filters.categories,
        subcategory: filters.subcategories,
        priceMin: filters.priceMin,
        priceMax: filters.priceMax,
        colors: filters.colors,
        sizes: filters.sizes,
        rating: filters.rating,
        inStock: filters.inStock,
        sort: filters.sort,
        page: filters.page,
        limit: filters.limit
      };
      
      const res = await productService.getProducts(serviceParams);
      setProducts(res.products || []);
      setTotalCount(res.totalCount || 0);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch products', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentFilters);
  }, [searchParams]);

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams();
    
    if (newFilters.categories?.length) newFilters.categories.forEach(c => params.append('category', c));
    if (newFilters.subcategories?.length) newFilters.subcategories.forEach(c => params.append('subcategory', c));
    if (newFilters.colors?.length) newFilters.colors.forEach(c => params.append('color', c));
    if (newFilters.sizes?.length) newFilters.sizes.forEach(c => params.append('size', c));
    if (newFilters.materials?.length) newFilters.materials.forEach(c => params.append('material', c));
    if (newFilters.priceMin) params.set('minPrice', newFilters.priceMin);
    if (newFilters.priceMax) params.set('maxPrice', newFilters.priceMax);
    if (newFilters.rating) params.set('rating', newFilters.rating);
    if (newFilters.inStock) params.set('inStock', 'true');
    if (currentFilters.sort) params.set('sort', currentFilters.sort);
    
    setSearchParams(params);
  };

  const handleSortChange = (sort) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', sort);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    if (currentFilters.sort) params.set('sort', currentFilters.sort);
    setSearchParams(params);
  };

  const removeFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      const all = params.getAll(key);
      params.delete(key);
      all.filter(v => v !== value).forEach(v => params.append(key, v));
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  // Generate active filter chips
  const activeChips = [];
  currentFilters.categories.forEach(c => activeChips.push({ label: c, onRemove: () => removeFilter('category', c) }));
  currentFilters.subcategories.forEach(c => activeChips.push({ label: c, onRemove: () => removeFilter('subcategory', c) }));
  currentFilters.colors.forEach(c => activeChips.push({ label: c, onRemove: () => removeFilter('color', c) }));
  currentFilters.sizes.forEach(c => activeChips.push({ label: c, onRemove: () => removeFilter('size', c) }));
  currentFilters.materials.forEach(c => activeChips.push({ label: c, onRemove: () => removeFilter('material', c) }));
  if (currentFilters.priceMin || currentFilters.priceMax) {
    activeChips.push({ 
      label: `$${currentFilters.priceMin || '0'} - $${currentFilters.priceMax || 'Any'}`, 
      onRemove: () => { removeFilter('minPrice'); removeFilter('maxPrice'); }
    });
  }
  if (currentFilters.rating) activeChips.push({ label: `${currentFilters.rating}+ Stars`, onRemove: () => removeFilter('rating') });
  if (currentFilters.inStock) activeChips.push({ label: 'In Stock', onRemove: () => removeFilter('inStock') });

  return (
    <div className="bg-[#0E0E0E] min-h-screen pb-20">
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Shop' }
        ]} />
        
        <div className="mt-8 mb-8">
          <h1 className="text-4xl font-editorial font-bold text-white">
            All Products
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar 
            initialFilters={currentFilters} 
            onFilterChange={handleFilterChange} 
          />
          
          <FilterDrawer 
            isOpen={isFilterDrawerOpen}
            onClose={() => setIsFilterDrawerOpen(false)}
            initialFilters={currentFilters}
            onFilterChange={handleFilterChange}
            totalResults={totalCount}
          />

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#2F2F2F]">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  className="lg:hidden flex items-center gap-2"
                  onClick={() => setIsFilterDrawerOpen(true)}
                >
                  <SlidersHorizontal size={18} />
                  Filters
                </Button>
                <p className="text-sm text-[#A3A3A3]">
                  Showing <span className="font-medium text-white">{totalCount}</span> results
                </p>
              </div>
              
              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="hidden sm:flex items-center bg-[#141414] p-1 rounded-md">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-sm transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#C9A84C]' : 'text-[#737373] hover:text-white'}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-sm transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-[#C9A84C]' : 'text-[#737373] hover:text-white'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
                <SortDropdown value={currentFilters.sort} onChange={handleSortChange} />
              </div>
            </div>

            {activeChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-[#737373] mr-2">Active Filters:</span>
                {activeChips.map((chip, idx) => (
                  <Chip 
                    key={idx} 
                    label={chip.label} 
                    onRemove={chip.onRemove} 
                    variant="outline"
                  />
                ))}
                <button 
                  onClick={clearAllFilters}
                  className="text-sm text-[#C9A84C] hover:underline ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            <ProductGrid products={products} loading={loading} viewMode={viewMode} />
            
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination 
                  currentPage={currentFilters.page} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
