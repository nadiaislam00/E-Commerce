import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button, Rating, PriceDisplay, EmptyState, Badge } from '../components/ui';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { products } from '../data/products';

export default function Compare() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const compareProducts = compareItems
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const handleAddToCart = (product) => {
    if (product.stock === 0) {
      addToast('This product is out of stock', 'error');
      return;
    }
    addToCart({
      product,
      color: product.colors[0]?.name || '',
      size: product.sizes[0] || '',
      quantity: 1,
    });
    addToast(`${product.name} added to cart`, 'success');
  };

  if (compareProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EmptyState
          title="No Products to Compare"
          description="Add products to compare by clicking the compare icon on product cards."
          action={
            <Link to="/shop">
              <Button>Browse Products</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const specKeys = [...new Set(compareProducts.flatMap((p) => Object.keys(p.specifications || {})))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/shop" className="flex items-center gap-1 text-sm text-[#A3A3A3] hover:text-secondary mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
          <h1 className="text-2xl font-semibold text-white">
            Compare Products ({compareProducts.length})
          </h1>
        </div>
        <Button variant="ghost" onClick={clearCompare}>Clear All</Button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          {/* Product Images */}
          <thead>
            <tr>
              <th className="w-40 p-4 text-left text-sm font-medium text-[#A3A3A3] border-b border-[#2F2F2F]">
                Product
              </th>
              {compareProducts.map((product) => (
                <th key={product.id} className="p-4 border-b border-[#2F2F2F] min-w-[220px]">
                  <div className="relative">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -top-1 -right-1 p-1 bg-[#141414] rounded-full hover:bg-border transition-colors"
                      aria-label="Remove from compare"
                    >
                      <X className="w-4 h-4 text-[#737373]" />
                    </button>
                    <Link to={`/product/${product.slug}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-56 object-cover rounded-[var(--radius-md)] mb-3"
                      />
                      <h3 className="text-sm font-medium text-white line-clamp-2 hover:text-secondary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Price */}
            <tr className="border-b border-[#2F2F2F]">
              <td className="p-4 text-sm font-medium text-[#A3A3A3]">Price</td>
              {compareProducts.map((p) => (
                <td key={p.id} className="p-4">
                  <PriceDisplay price={p.price} originalPrice={p.originalPrice} discount={p.discount} />
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr className="border-b border-[#2F2F2F] bg-[#141414]/30">
              <td className="p-4 text-sm font-medium text-[#A3A3A3]">Rating</td>
              {compareProducts.map((p) => (
                <td key={p.id} className="p-4">
                  <Rating value={p.rating} count={p.reviewCount} showValue />
                </td>
              ))}
            </tr>

            {/* Stock */}
            <tr className="border-b border-[#2F2F2F]">
              <td className="p-4 text-sm font-medium text-[#A3A3A3]">Availability</td>
              {compareProducts.map((p) => (
                <td key={p.id} className="p-4">
                  {p.stock > 10 ? (
                    <Badge variant="success">In Stock</Badge>
                  ) : p.stock > 0 ? (
                    <Badge variant="warning">Only {p.stock} left</Badge>
                  ) : (
                    <Badge variant="sale">Out of Stock</Badge>
                  )}
                </td>
              ))}
            </tr>

            {/* Colors */}
            <tr className="border-b border-[#2F2F2F] bg-[#141414]/30">
              <td className="p-4 text-sm font-medium text-[#A3A3A3]">Colors</td>
              {compareProducts.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {p.colors.map((c) => (
                      <div
                        key={c.name}
                        className="w-6 h-6 rounded-full border border-[#2F2F2F]"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Sizes */}
            <tr className="border-b border-[#2F2F2F]">
              <td className="p-4 text-sm font-medium text-[#A3A3A3]">Sizes</td>
              {compareProducts.map((p) => (
                <td key={p.id} className="p-4 text-sm text-white">
                  {p.sizes.length > 0 ? p.sizes.join(', ') : 'One Size'}
                </td>
              ))}
            </tr>

            {/* Material */}
            <tr className="border-b border-[#2F2F2F] bg-[#141414]/30">
              <td className="p-4 text-sm font-medium text-[#A3A3A3]">Material</td>
              {compareProducts.map((p) => (
                <td key={p.id} className="p-4 text-sm text-white">
                  {p.material || '—'}
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr className="border-b border-[#2F2F2F]">
              <td className="p-4 text-sm font-medium text-[#A3A3A3]">Category</td>
              {compareProducts.map((p) => (
                <td key={p.id} className="p-4 text-sm text-white capitalize">
                  {p.category} / {p.subcategory}
                </td>
              ))}
            </tr>

            {/* Specifications */}
            {specKeys.map((key, i) => (
              <tr key={key} className={`border-b border-[#2F2F2F] ${i % 2 === 0 ? 'bg-[#141414]/30' : ''}`}>
                <td className="p-4 text-sm font-medium text-[#A3A3A3] capitalize">{key}</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-sm text-white">
                    {p.specifications?.[key] || '—'}
                  </td>
                ))}
              </tr>
            ))}

            {/* Add to Cart */}
            <tr>
              <td className="p-4"></td>
              {compareProducts.map((p) => (
                <td key={p.id} className="p-4">
                  <Button
                    fullWidth
                    disabled={p.stock === 0}
                    onClick={() => handleAddToCart(p)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
