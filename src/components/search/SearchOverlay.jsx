import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Chip } from '../ui';
import { searchProducts } from '../../services/productService';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const popularSearches = ['Linen Shirt', 'Summer Dress', 'Leather Bag', 'Cashmere Sweater', 'Sneakers'];

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('loom_recent_searches');
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved));
        } catch (e) {
          // ignore
        }
      }
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSuggestions([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchProducts(query);
        setSuggestions(results.slice(0, 5));
      } catch (error) {
        console.error("Search error", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const saveRecentSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;
    const updated = [searchTerm, ...recentSearches.filter(s => s.toLowerCase() !== searchTerm.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('loom_recent_searches', JSON.stringify(updated));
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    saveRecentSearch(query.trim());
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  const executeSearch = (term) => {
    saveRecentSearch(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    onClose();
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('loom_recent_searches');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}>
      <div className="bg-[#FAFAF7] w-full" onClick={e => e.stopPropagation()}>
        <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9B9B9B] w-5 h-5" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories, or keywords..."
                className="w-full pl-12 pr-12 py-4 bg-white border border-[#E5E1DB] rounded-lg focus:outline-none focus:border-[#C8956C] focus:ring-1 focus:ring-[#C8956C] text-[#1A1A1A] text-lg placeholder:text-[#9B9B9B]"
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9B9B9B] hover:text-[#1A1A1A]"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </form>
            <button onClick={onClose} className="text-[#6B6B6B] hover:text-[#1A1A1A] hidden md:block font-medium">
              Cancel
            </button>
          </div>

          <div className="mt-8 max-h-[60vh] overflow-y-auto pb-8">
            {!query.trim() ? (
              <div className="space-y-8">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-[#6B6B6B] flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Recent Searches
                      </h3>
                      <button onClick={clearRecent} className="text-sm text-[#9B9B9B] hover:text-[#1A1A1A] underline">
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, i) => (
                        <button
                          key={i}
                          onClick={() => executeSearch(term)}
                          className="px-4 py-2 bg-white border border-[#E5E1DB] rounded-full text-sm text-[#1A1A1A] hover:border-[#C8956C] hover:text-[#C8956C] transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-[#6B6B6B] flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4" /> Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => executeSearch(term)}
                        className="px-4 py-2 bg-white border border-[#E5E1DB] rounded-full text-sm text-[#1A1A1A] hover:border-[#C8956C] hover:text-[#C8956C] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {isSearching ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-[#E5E1DB] border-t-[#C8956C] rounded-full animate-spin"></div>
                  </div>
                ) : suggestions.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-medium text-[#6B6B6B] mb-4">Products</h3>
                    <div className="space-y-4">
                      {suggestions.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-4 group"
                        >
                          <div className="w-16 h-16 bg-[#F2EDE8] rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={product.images?.[0] || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80'}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-[#1A1A1A] font-medium group-hover:text-[#C8956C] transition-colors">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[#1A1A1A] font-medium">${product.price.toFixed(2)}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-[#9B9B9B] line-through text-sm">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <button
                      onClick={() => executeSearch(query)}
                      className="mt-6 flex items-center gap-2 text-[#C8956C] font-medium hover:text-[#b5835b] transition-colors w-full py-2"
                    >
                      View all {suggestions.length > 0 ? 'results' : ''} for "{query}"
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <SearchIcon className="w-12 h-12 text-[#E5E1DB] mx-auto mb-4" />
                    <p className="text-[#1A1A1A] font-medium text-lg">No results found for "{query}"</p>
                    <p className="text-[#6B6B6B] mt-2">Try checking for typos or using more general terms.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
