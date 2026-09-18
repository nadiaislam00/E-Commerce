import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check, Star, X } from 'lucide-react';
import { Button, Input, Checkbox, Drawer } from '../../components/ui';
import { categories as CATEGORIES } from '../../data/categories';

const COLORS = [
  { name: 'Black', hex: '#000000' }, { name: 'White', hex: '#FFFFFF' }, { name: 'Navy', hex: '#1B2A4A' },
  { name: 'Beige', hex: '#D4C5B0' }, { name: 'Brown', hex: '#8B6914' }, { name: 'Red', hex: '#D4544A' },
  { name: 'Green', hex: '#2D8B57' }, { name: 'Blue', hex: '#4A90D9' }, { name: 'Pink', hex: '#E8A0B4' },
  { name: 'Gray', hex: '#9B9B9B' }, { name: 'Cream', hex: '#F5E6D3' }, { name: 'Olive', hex: '#6B7B3A' }
];

const MEN_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const KIDS_SIZES = ['2Y', '3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'];
const BABY_SIZES = ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M'];
const MATERIALS = ['Organic Cotton', 'European Linen', 'Merino Wool', 'Supima Cotton', 'Denim', 'Fleece'];

export default function FilterDrawer({ isOpen, onClose, initialFilters = {}, onFilterChange, currentCategory, totalResults = 0 }) {
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const [expanded, setExpanded] = useState({
    category: true, price: true, color: true, size: true, rating: true, availability: true, material: true,
  });

  const toggleSection = (section) => setExpanded(prev => ({ ...prev, [section]: !prev[section] }));

  const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  const toggleArrayFilter = (key, value) => {
    setFilters(prev => {
      const current = prev[key] || [];
      const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const clearAll = () => {
    setFilters({
      categories: [], subcategories: [], priceMin: '', priceMax: '',
      colors: [], sizes: [], rating: 0, inStock: false, materials: []
    });
  };

  const handleApply = () => {
    if (onFilterChange) onFilterChange(filters);
    onClose();
  };

  const renderSectionHeader = (title, key) => (
    <button 
      onClick={() => toggleSection(key)}
      className="flex w-full items-center justify-between py-4 text-base font-medium text-white"
    >
      {title}
      {expanded[key] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
  );

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="left" size="md">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-[#2F2F2F] bg-[#0E0E0E] z-10">
          <h2 className="text-xl font-editorial font-semibold">Filters</h2>
          <button onClick={onClose} className="p-2 text-[#737373] hover:text-[#C9A84C] rounded-full hover:bg-[#141414] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24">
          <div className="border-b border-[#2F2F2F]">
            {renderSectionHeader('Category', 'category')}
            {expanded.category && (
              <div className="pb-4 space-y-4">
                {CATEGORIES.map(cat => (
                  <div key={cat.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-3 text-base text-[#A3A3A3] cursor-pointer">
                        <Checkbox 
                          checked={filters.categories?.includes(cat.name)}
                          onChange={() => toggleArrayFilter('categories', cat.name)}
                        />
                        <span>{cat.name}</span>
                      </label>
                      <span className="text-sm text-[#737373]">{cat.count}</span>
                    </div>
                    {(currentCategory === cat.name || filters.categories?.includes(cat.name)) && (
                      <div className="pl-8 space-y-3">
                        {cat.subcategories.map(sub => (
                          <label key={sub.id} className="flex items-center space-x-3 text-base text-[#737373] cursor-pointer">
                            <Checkbox 
                              checked={filters.subcategories?.includes(sub.name)}
                              onChange={() => toggleArrayFilter('subcategories', sub.name)}
                            />
                            <span>{sub.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-b border-[#2F2F2F]">
            {renderSectionHeader('Price Range', 'price')}
            {expanded.price && (
              <div className="pb-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]">$</span>
                    <Input 
                      type="number" placeholder="Min" value={filters.priceMin || ''}
                      onChange={(e) => updateFilter('priceMin', e.target.value)} className="pl-7"
                    />
                  </div>
                  <span className="text-[#737373]">-</span>
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]">$</span>
                    <Input 
                      type="number" placeholder="Max" value={filters.priceMax || ''}
                      onChange={(e) => updateFilter('priceMax', e.target.value)} className="pl-7"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-b border-[#2F2F2F]">
            {renderSectionHeader('Colors', 'color')}
            {expanded.color && (
              <div className="pb-6 flex flex-wrap gap-3">
                {COLORS.map(color => {
                  const isSelected = filters.colors?.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => toggleArrayFilter('colors', color.name)}
                      className={`relative w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? 'ring-2 ring-primary ring-offset-2' : 'border-[#2F2F2F]'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && <Check size={18} className={color.name === 'White' || color.name === 'Cream' || color.name === 'Beige' ? 'text-[#C9A84C]' : 'text-white'} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-b border-[#2F2F2F]">
            {renderSectionHeader('Size', 'size')}
            {expanded.size && (
              <div className="pb-6 space-y-5">
                <div>
                  <span className="text-sm font-medium text-[#737373] mb-3 block">Men's Sizes</span>
                  <div className="flex flex-wrap gap-3">
                    {MEN_SIZES.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleArrayFilter('sizes', size)}
                        className={`min-w-[3rem] px-3 py-2 text-sm border rounded transition-colors ${
                          filters.sizes?.includes(size) ? 'bg-[#C9A84C] text-white border-primary' : 'bg-transparent text-white border-[#2F2F2F]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-[#737373] mb-3 block">Kids' Sizes</span>
                  <div className="flex flex-wrap gap-3">
                    {KIDS_SIZES.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleArrayFilter('sizes', size)}
                        className={`min-w-[3rem] px-3 py-2 text-sm border rounded transition-colors ${
                          filters.sizes?.includes(size) ? 'bg-[#C9A84C] text-white border-primary' : 'bg-transparent text-white border-[#2F2F2F]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-[#737373] mb-3 block">Baby Sizes</span>
                  <div className="flex flex-wrap gap-3">
                    {BABY_SIZES.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleArrayFilter('sizes', size)}
                        className={`min-w-[3rem] px-3 py-2 text-sm border rounded transition-colors ${
                          filters.sizes?.includes(size) ? 'bg-[#C9A84C] text-white border-primary' : 'bg-transparent text-white border-[#2F2F2F]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-b border-[#2F2F2F]">
            {renderSectionHeader('Rating', 'rating')}
            {expanded.rating && (
              <div className="pb-6 space-y-4">
                {[4, 3, 2].map(rating => (
                  <button
                    key={rating}
                    onClick={() => updateFilter('rating', filters.rating === rating ? 0 : rating)}
                    className={`flex items-center space-x-3 text-base ${
                      filters.rating === rating ? 'text-[#C9A84C] font-medium' : 'text-[#A3A3A3]'
                    }`}
                  >
                    <div className="flex text-warning">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill={i < rating ? 'currentColor' : 'none'} className={i >= rating ? 'text-border-dark' : ''} />
                      ))}
                    </div>
                    <span>& Up</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-b border-[#2F2F2F]">
            {renderSectionHeader('Availability', 'availability')}
            {expanded.availability && (
              <div className="pb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${filters.inStock ? 'bg-success' : 'bg-border-dark'}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${filters.inStock ? 'translate-x-6' : ''}`} />
                  </div>
                  <input
                    type="checkbox" className="hidden"
                    checked={filters.inStock || false}
                    onChange={(e) => updateFilter('inStock', e.target.checked)}
                  />
                  <span className="text-base text-[#A3A3A3]">In Stock Only</span>
                </label>
              </div>
            )}
          </div>

          <div>
            {renderSectionHeader('Material', 'material')}
            {expanded.material && (
              <div className="pb-6 space-y-4">
                {MATERIALS.map(material => (
                  <label key={material} className="flex items-center space-x-3 text-base text-[#A3A3A3] cursor-pointer">
                    <Checkbox
                      checked={filters.materials?.includes(material)}
                      onChange={() => toggleArrayFilter('materials', material)}
                    />
                    <span>{material}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2F2F2F] bg-[#0E0E0E] flex gap-4">
          <Button variant="outline" className="flex-1" onClick={clearAll}>Clear All</Button>
          <Button variant="primary" className="flex-1" onClick={handleApply}>Show {totalResults} Results</Button>
        </div>
      </div>
    </Drawer>
  );
}
