import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
  { id: 'popular', label: 'Most Popular' }
];

export default function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = SORT_OPTIONS.find(opt => opt.id === value) || SORT_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-sm text-[#A3A3A3] bg-white border border-[#2F2F2F] px-4 py-2 rounded-md hover:border-[#2F2F2F]-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <span className="hidden sm:inline text-[#737373]">Sort by:</span>
        <span className="font-medium text-white">{selectedOption.label}</span>
        <ChevronDown size={16} className={`text-[#737373] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-[#2F2F2F] rounded-md shadow-lg z-20 py-1">
          {SORT_OPTIONS.map(option => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-[#141414] transition-colors"
            >
              <span className={value === option.id ? 'font-medium text-[#C9A84C]' : 'text-[#A3A3A3]'}>
                {option.label}
              </span>
              {value === option.id && <Check size={16} className="text-[#C9A84C]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
