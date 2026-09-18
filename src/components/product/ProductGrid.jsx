import React from 'react';
import ProductCard from './ProductCard';
import { Skeleton, EmptyState } from '../../components/ui';
import { ShoppingBag } from 'lucide-react';

export default function ProductGrid({ products = [], loading = false, viewMode = 'grid' }) {
  if (loading) {
    return (
      <div className={`grid gap-3 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`flex ${viewMode === 'list' ? 'flex-row gap-4 sm:gap-6 h-40 sm:h-48' : 'flex-col gap-2 sm:gap-3'}`}>
            <Skeleton className={viewMode === 'list' ? 'w-36 sm:w-48 h-full rounded-md shrink-0' : 'w-full aspect-[3/4] rounded-md'} />
            <div className={`flex flex-col gap-2 ${viewMode === 'list' ? 'flex-1 py-2 sm:py-4' : 'w-full'}`}>
              <Skeleton className="w-1/3 h-4" />
              <Skeleton className="w-3/4 h-5" />
              <Skeleton className="w-1/4 h-5 mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-12">
        <EmptyState
          icon={<ShoppingBag size={48} className="text-[#737373]" />}
          title="No products found"
          description="We couldn't find any products matching your current filters. Try adjusting or clearing some filters."
          actionText="Clear Filters"
          onAction={() => window.location.search = ''}
        />
      </div>
    );
  }

  return (
    <div className={`grid gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-10 ${
      viewMode === 'grid' 
        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
        : 'grid-cols-1'
    }`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
}
