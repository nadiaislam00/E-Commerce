import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Star } from 'lucide-react';
import { Button, Input, Checkbox, Badge } from '../../components/ui';
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

export default function FilterSidebar({ initialFilters = {}, onFilterChange, currentCategory }) {
  const [filters, setFilters] = useState({
    categories: [],
    subcategories: [],
    priceMin: '',
    priceMax: '',
    colors: [],
    sizes: [],
    rating: 0,
    inStock: false,
    materials: [],
    ...initialFilters
  });

  const [expanded, setExpanded] = useState({
    category: true,
    price: true,
    color: true,
    size: true,
    rating: true,
    availability: true,
    material: true,
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const toggleArrayFilter = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const handlePriceApply = () => {
    if (onFilterChange) onFilterChange(filters);
  };

  const clearAll = () => {
    const cleared = {
      categories: [], subcategories: [], priceMin: '', priceMax: '',
      colors: [], sizes: [], rating: 0, inStock: false, materials: []
    };
    setFilters(cleared);
    if (onFilterChange) onFilterChange(cleared);
  };

  const renderSectionHeader = (title, key) => (
    <button 
      onClick={() => toggleSection(key)}
      className="flex w-full items-center justify-between py-3 text-sm font-medium text-white hover:text-[#C9A84C] transition-colors"
    >
      {title}
      {expanded[key] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
  );

  return (
    <div className="w-72 flex-shrink-0 pr-8 hidden lg:block border-r border-[#2F2F2F]">
      <div className="flex items-center justify-between pb-4 border-b border-[#2F2F2F]">
        <h2 className="text-lg font-editorial font-semibold text-white">Filters</h2>
        <button onClick={clearAll} className="text-sm text-[#8A8A8A] hover:text-[#C9A84C] underline transition-colors">
          Clear All
        </button>
      </div>

      <div className="py-2 border-b border-[#2F2F2F]">
        {renderSectionHeader('Category', 'category')}
        {expanded.category && (
          <div className="pb-4 space-y-3">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm text-[#A3A3A3] cursor-pointer hover:text-[#C9A84C]">
                    <input 
                      type="checkbox"
                      checked={filters.categories?.includes(cat.name)}
                      onChange={() => toggleArrayFilter('categories', cat.name)}
                      className="rounded border-[#2F2F2F] text-[#C9A84C] focus:ring-primary"
                    />
                    <span>{cat.name}</span>
                  </label>
                  <span className="text-xs text-[#737373]">{cat.count}</span>
                </div>
                {(currentCategory === cat.name || filters.categories?.includes(cat.name)) && (
                  <div className="pl-6 space-y-2">
                    {cat.subcategories.map(sub => (
                      <label key={sub.id} className="flex items-center space-x-2 text-sm text-[#737373] cursor-pointer hover:text-[#A3A3A3]">
                        <input 
                          type="checkbox"
                          checked={filters.subcategories?.includes(sub.name)}
                          onChange={() => toggleArrayFilter('subcategories', sub.name)}
                          className="rounded border-[#2F2F2F] text-[#C9A84C] focus:ring-primary"
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

      <div className="py-2 border-b border-[#2F2F2F]">
        {renderSectionHeader('Price Range', 'price')}
        {expanded.price && (
          <div className="pb-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] text-sm">$</span>
                <Input 
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin}
                  onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                  className="pl-7"
                />
              </div>
              <span className="text-[#737373]">-</span>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] text-sm">$</span>
                <Input 
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
                  className="pl-7"
                />
              </div>
            </div>
            <Button variant="outline" className="w-full text-xs" onClick={handlePriceApply}>Apply</Button>
            <div className="space-y-2">
              {[
                { label: 'Under $50', min: '', max: '50' },
                { label: '$50 - $100', min: '50', max: '100' },
                { label: '$100 - $200', min: '100', max: '200' },
                { label: '$200+', min: '200', max: '' }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const newFilters = { ...filters, priceMin: preset.min, priceMax: preset.max };
                    setFilters(newFilters);
                    if (onFilterChange) onFilterChange(newFilters);
                  }}
                  className="block text-sm text-[#A3A3A3] hover:text-[#C9A84C] transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="py-2 border-b border-[#2F2F2F]">
        {renderSectionHeader('Colors', 'color')}
        {expanded.color && (
          <div className="pb-4 flex flex-wrap gap-2">
            {COLORS.map(color => {
              const isSelected = filters.colors?.includes(color.name);
              return (
                <button
                  key={color.name}
                  onClick={() => toggleArrayFilter('colors', color.name)}
                  className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    isSelected ? 'ring-2 ring-primary ring-offset-1' : 'border-[#2F2F2F] hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {isSelected && (
                    <Check size={14} className={color.name === 'White' || color.name === 'Cream' || color.name === 'Beige' ? 'text-[#C9A84C]' : 'text-white'} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="py-2 border-b border-[#2F2F2F]">
        {renderSectionHeader('Size', 'size')}
        {expanded.size && (
          <div className="pb-4 space-y-4">
            <div>
              <span className="text-xs text-[#737373] mb-2 block uppercase tracking-wider">Men's Sizes</span>
              <div className="flex flex-wrap gap-2">
                {MEN_SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleArrayFilter('sizes', size)}
                    className={`min-w-[2.5rem] px-2 py-1 text-xs border rounded-sm transition-colors ${
                      filters.sizes?.includes(size)
                        ? 'bg-[#C9A84C] text-white border-primary'
                        : 'bg-transparent text-white border-[#2F2F2F] hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs text-[#737373] mb-2 block uppercase tracking-wider">Kids' Sizes</span>
              <div className="flex flex-wrap gap-2">
                {KIDS_SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleArrayFilter('sizes', size)}
                    className={`min-w-[2.5rem] px-2 py-1 text-xs border rounded-sm transition-colors ${
                      filters.sizes?.includes(size)
                        ? 'bg-[#C9A84C] text-white border-primary'
                        : 'bg-transparent text-white border-[#2F2F2F] hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs text-[#737373] mb-2 block uppercase tracking-wider">Baby Sizes</span>
              <div className="flex flex-wrap gap-2">
                {BABY_SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleArrayFilter('sizes', size)}
                    className={`min-w-[2.5rem] px-2 py-1 text-xs border rounded-sm transition-colors ${
                      filters.sizes?.includes(size)
                        ? 'bg-[#C9A84C] text-white border-primary'
                        : 'bg-transparent text-white border-[#2F2F2F] hover:border-primary'
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

      <div className="py-2 border-b border-[#2F2F2F]">
        {renderSectionHeader('Rating', 'rating')}
        {expanded.rating && (
          <div className="pb-4 space-y-2">
            {[4, 3, 2].map(rating => (
              <button
                key={rating}
                onClick={() => updateFilter('rating', filters.rating === rating ? 0 : rating)}
                className={`flex items-center space-x-2 text-sm transition-colors ${
                  filters.rating === rating ? 'text-[#C9A84C] font-medium' : 'text-[#A3A3A3] hover:text-[#C9A84C]'
                }`}
              >
                <div className="flex text-warning">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < rating ? 'currentColor' : 'none'} className={i >= rating ? 'text-border-dark' : ''} />
                  ))}
                </div>
                <span>& Up</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="py-2 border-b border-[#2F2F2F]">
        {renderSectionHeader('Availability', 'availability')}
        {expanded.availability && (
          <div className="pb-4">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <div className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${filters.inStock ? 'bg-success' : 'bg-border-dark'}`}>
                <div className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${filters.inStock ? 'translate-x-5' : ''}`} />
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={filters.inStock || false}
                onChange={(e) => updateFilter('inStock', e.target.checked)}
              />
              <span className="text-sm text-[#A3A3A3] group-hover:text-[#C9A84C] transition-colors">In Stock Only</span>
            </label>
          </div>
        )}
      </div>

      <div className="py-2">
        {renderSectionHeader('Material', 'material')}
        {expanded.material && (
          <div className="pb-4 space-y-2">
            {MATERIALS.map(material => (
              <label key={material} className="flex items-center space-x-2 text-sm text-[#A3A3A3] cursor-pointer hover:text-[#C9A84C] transition-colors">
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
  );
}
