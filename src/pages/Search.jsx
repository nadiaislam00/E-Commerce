import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronRight, Search as SearchIcon } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import SortDropdown from '../components/product/SortDropdown';
import { searchProducts } from '../services/productService';
import { Button } from '../components/ui';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('featured');

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const data = await searchProducts(query);
        setResults(data);
      } catch (error) {
        console.error('Failed to search products', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      fetchResults();
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  // Handle sorting
  const sortedResults = [...results].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    return 0; // featured/default
  });

  return (
    <div className="min-h-screen bg-[#FAFAF7] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-8">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#1A1A1A]">Search Results</span>
        </nav>

        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-2">Search Results</h1>
            <p className="text-[#6B6B6B]">
              {isLoading ? (
                <span>Searching for "{query}"...</span>
              ) : (
                <span>{results.length} results for "{query}"</span>
              )}
            </p>
          </div>
          {results.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#6B6B6B]">Sort by:</span>
              <SortDropdown value={sortOption} onChange={setSortOption} />
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#E5E1DB] border-t-[#C8956C] rounded-full animate-spin"></div>
          </div>
        ) : results.length > 0 ? (
          <ProductGrid products={sortedResults} />
        ) : (
          <div className="bg-white rounded-xl border border-[#E5E1DB] p-12 text-center max-w-2xl mx-auto mt-12">
            <div className="w-16 h-16 bg-[#F2EDE8] rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-8 h-8 text-[#9B9B9B]" />
            </div>
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">No products found for "{query}"</h2>
            <p className="text-[#6B6B6B] mb-8">
              We couldn't find anything matching your search. Try adjusting your keywords or browsing our categories.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button as={Link} to="/category/men" variant="outline">Shop Men</Button>
              <Button as={Link} to="/category/kids" variant="outline">Shop Kids</Button>
              <Button as={Link} to="/shop" variant="primary">View All Products</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
