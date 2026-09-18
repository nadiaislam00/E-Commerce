import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock } from 'lucide-react';
import { CountdownTimer, Badge } from '../components/ui';
import ProductCard from '../components/product/ProductCard';
import { products } from '../data/products';

export default function FlashSale() {
  const saleProducts = useMemo(
    () => products.filter((p) => p.discount > 0 && p.stock > 0),
    []
  );

  const targetDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    d.setHours(23, 59, 59, 0);
    return d.toISOString();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="bg-[#C9A84C] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-8 h-8 text-warning" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Flash Sale</h1>
            <Flame className="w-8 h-8 text-warning" />
          </div>
          <p className="text-lg text-white/80 mb-8">
            Limited time offers on premium pieces. Don't miss out!
          </p>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-secondary" />
            <span className="text-sm font-medium text-secondary uppercase tracking-wider">
              Ends in
            </span>
          </div>
          <div className="flex justify-center">
            <CountdownTimer targetDate={targetDate} />
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[#A3A3A3]">
            <span className="font-semibold text-white">{saleProducts.length}</span> items on sale
          </p>
          <Link to="/shop" className="text-sm text-secondary hover:underline">
            View All Products →
          </Link>
        </div>

        {saleProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#A3A3A3]">No sale items available right now. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
