import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const MegaMenu = ({ category, isVisible }) => {
  if (!isVisible || !category) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-[#141414] border-t border-[#C9A84C]/15 shadow-[0_16px_40px_rgba(0,0,0,0.8)] z-50 mt-0">
      <div className="max-w-7xl mx-auto px-8 py-7 flex gap-10">
        {/* Subcategory Links */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
          {category.subcategories?.map((sub) => (
            <Link
              key={sub.id}
              to={`/category/${category.slug}/${sub.slug}`}
              className="text-sm text-[#C0BCB4] hover:text-[#C9A84C] transition-colors py-0.5 font-light"
            >
              {sub.name}
            </Link>
          ))}
          <div className="col-span-full pt-4 mt-1 border-t border-[#222222]">
            <Link
              to={`/category/${category.slug}`}
              className="inline-flex items-center gap-1 text-sm text-[#C9A84C] font-semibold hover:text-[#E0BC6A] transition-colors"
            >
              Shop All {category.name}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Category Image */}
        {category.image && (
          <div className="w-52 shrink-0 relative group overflow-hidden rounded-lg bg-[#1E1E1E]">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-44 object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <Link
                to={`/category/${category.slug}`}
                className="inline-block bg-[#C9A84C] text-[#0E0E0E] px-3 py-1.5 text-xs font-bold rounded hover:bg-[#E0BC6A] transition-colors"
              >
                Explore {category.name}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
