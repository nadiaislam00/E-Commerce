import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Share2, Ruler, Check, AlertCircle, ShoppingBag, ThumbsUp, Star, Truck, RotateCcw } from 'lucide-react';
import { 
  Button, Badge, Rating, PriceDisplay, QuantitySelector, 
  Breadcrumb, Tabs, Accordion, Skeleton 
} from '../components/ui';
import ProductGallery from '../components/product/ProductGallery';
import ProductCard from '../components/product/ProductCard'; 
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { getProductBySlug, getRelatedProducts, getProductReviews } from '../services/productService';
import { products } from '../data/products';
import { reviews as reviewsData } from '../data/reviews';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const reviewsRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [reviewSort, setReviewSort] = useState('recent');
  const [visibleReviews, setVisibleReviews] = useState(5);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const { addToRecentlyViewed, recentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prod = await getProductBySlug(slug);
        if (prod) {
          setProduct(prod);
          if (prod.colors?.length > 0) setSelectedColor(prod.colors[0]);
          if (prod.sizes?.length > 0) {
            const firstAvailable = prod.sizes.find(s => prod.stock > 0);
            if (firstAvailable) setSelectedSize(firstAvailable);
          }
          setQuantity(1);
          
          const related = await getRelatedProducts(prod.id);
          setRelatedProducts(related);
          
          const prodReviews = await getProductReviews(prod.id);
          setReviews(prodReviews);
          
          addToRecentlyViewed(prod.id);
        }
      } catch (error) {
        console.error('Error fetching product data', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [slug]);

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      addToast({ title: 'Error', message: 'Please select a size', type: 'error' });
      return;
    }
    if (product.colors?.length > 0 && !selectedColor) {
      addToast({ title: 'Error', message: 'Please select a color', type: 'error' });
      return;
    }
    if (product.stock === 0) {
      addToast({ title: 'Error', message: 'Product is out of stock', type: 'error' });
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.discount ? product.price - product.discount : product.price,
      image: product.images?.[0] || '',
      color: selectedColor?.name || selectedColor,
      size: selectedSize,
      quantity
    });
    addToast({ title: 'Success', message: 'Added to cart successfully!', type: 'success' });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    if (product.stock > 0) {
      navigate('/checkout');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      addToast({ title: 'Success', message: 'Link copied to clipboard!', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: 'Failed to copy link', type: 'error' });
    }
  };

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sortedReviews = useMemo(() => {
    let sorted = [...reviews];
    if (reviewSort === 'recent') sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (reviewSort === 'highest') sorted.sort((a, b) => b.rating - a.rating);
    else if (reviewSort === 'lowest') sorted.sort((a, b) => a.rating - b.rating);
    return sorted;
  }, [reviews, reviewSort]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-[55%]"><Skeleton className="w-full aspect-[4/5] rounded-xl" /></div>
          <div className="w-full lg:w-[45%] space-y-6">
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="w-3/4 h-12" />
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/"><Button>Return to Home</Button></Link>
      </div>
    );
  }

  const stockStatus = product.stock > 10 ? 'in-stock' : (product.stock > 0 ? 'low-stock' : 'out-of-stock');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: product.category, href: `/category/${product.category.toLowerCase()}` },
    { label: product.subcategory, href: `/category/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}` },
    { label: product.name }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        
        {/* Left Column - Gallery */}
        <div className="w-full lg:w-[55%]">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column - Details */}
        <div className="w-full lg:w-[45%] flex flex-col">
          <Breadcrumb items={breadcrumbItems} className="mb-4" />
          
          <h1 className="text-3xl font-semibold text-white mb-2 font-editorial">
            {product.name}
          </h1>
          <div className="text-sm text-[#A3A3A3] mb-4 uppercase tracking-wider">
            {product.brand}
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="cursor-pointer" onClick={scrollToReviews}>
              <Rating value={product.rating} readOnly />
            </div>
            <span className="text-sm text-[#A3A3A3] cursor-pointer hover:underline" onClick={scrollToReviews}>
              ({product.reviewCount} Reviews)
            </span>
          </div>

          <div className="mb-6">
            <PriceDisplay 
              price={product.price} 
              originalPrice={product.originalPrice} 
              discount={product.discount}
              className="text-3xl"
            />
          </div>

          <hr className="border-[#2F2F2F] mb-6" />

          {/* Color Selection */}
          {product.colors?.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">
                Color: <span className="text-[#A3A3A3]">{selectedColor?.name || 'Select a color'}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor?.name === color.name 
                        ? 'border-primary ring-2 ring-primary ring-offset-2' 
                        : 'border-[#2F2F2F] hover:border-text-muted'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select color ${color.name}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-medium">Size: <span className="text-[#A3A3A3]">{selectedSize || 'Select a size'}</span></p>
                <button 
                  className="text-sm text-[#A3A3A3] flex items-center gap-1 hover:text-[#C9A84C] transition-colors"
                  onClick={() => setSizeGuideOpen(true)}
                >
                  <Ruler size={14} /> Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => {
                  const isAvailable = product.stock > 0;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={!isAvailable}
                      className={`min-w-12 px-3 py-2 text-sm border rounded-md transition-all ${
                        selectedSize === size
                          ? 'border-[#C9A84C] bg-[#C9A84C] text-[#0E0E0E]'
                          : isAvailable
                            ? 'border-[#2F2F2F] hover:border-[#C9A84C] hover:text-[#C9A84C] text-white bg-transparent'
                            : 'border-[#2F2F2F] bg-[#141414] text-[#737373] line-through cursor-not-allowed'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stock Indicator */}
          <div className="mb-6 flex items-center gap-2 text-sm font-medium">
            {stockStatus === 'in-stock' && <><Check size={16} className="text-success" /> <span className="text-success">In Stock</span></>}
            {stockStatus === 'low-stock' && <><AlertCircle size={16} className="text-warning" /> <span className="text-warning">Only {product.stock} left!</span></>}
            {stockStatus === 'out-of-stock' && <><AlertCircle size={16} className="text-[#C9A84C]" /> <span className="text-[#C9A84C]">Out of Stock</span></>}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:gap-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="self-start sm:self-auto">
                <QuantitySelector 
                  value={quantity} 
                  onChange={setQuantity} 
                  min={1} 
                  max={product.stock > 0 ? product.stock : 1}
                  disabled={stockStatus === 'out-of-stock'}
                />
              </div>
              <Button 
                className="flex-1 w-full" 
                onClick={handleAddToCart}
                disabled={stockStatus === 'out-of-stock'}
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleBuyNow}
              disabled={stockStatus === 'out-of-stock'}
            >
              Buy Now
            </Button>
          </div>

          <div className="flex gap-6 mb-8 border-t border-b border-[#2F2F2F] py-4">
            <button 
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isInWishlist(product.id) ? 'text-[#C9A84C]' : 'text-[#A3A3A3] hover:text-[#C9A84C]'}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={18} className={isInWishlist(product.id) ? 'fill-accent' : ''} /> 
              {isInWishlist(product.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}
            </button>
            <button 
              className="flex items-center gap-2 text-sm font-medium text-[#A3A3A3] hover:text-[#C9A84C] transition-colors"
              onClick={handleShare}
            >
              <Share2 size={18} /> Share
            </button>
          </div>

          {/* Accordions */}
          <div className="space-y-4">
            <Accordion title="Description" defaultOpen={true}>
              <div className="text-[#A3A3A3] text-sm leading-relaxed prose">
                <p>{product.description}</p>
                {product.material && <p className="mt-2"><strong>Material:</strong> {product.material}</p>}
              </div>
            </Accordion>
            
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <Accordion title="Specifications">
                <div className="text-sm">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex border-b border-[#2F2F2F] py-2 last:border-0">
                      <span className="w-1/3 text-[#A3A3A3] font-medium">{key}</span>
                      <span className="w-2/3 text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </Accordion>
            )}

            <Accordion title="Shipping & Returns">
              <div className="text-sm text-[#A3A3A3] space-y-3">
                <div className="flex gap-3">
                  <Truck size={20} className="text-[#C9A84C] shrink-0" />
                  <div>
                    <strong className="text-white block">Free Standard Shipping</strong>
                    Enjoy free shipping on all orders over $100. Delivery typically takes 3-5 business days.
                  </div>
                </div>
                <div className="flex gap-3">
                  <RotateCcw size={20} className="text-[#C9A84C] shrink-0" />
                  <div>
                    <strong className="text-white block">30-Day Returns</strong>
                    Not quite right? Return it within 30 days of receiving your order for a full refund.
                  </div>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-editorial font-bold mb-6">Complete the Look</h2>
          <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 scrollbar-hide">
            {relatedProducts.map(rp => (
              <div key={rp.id} className="min-w-[220px] sm:min-w-[260px] md:min-w-[280px] w-[220px] sm:w-[260px] md:w-[280px] shrink-0">
                <ProductCard product={rp} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div ref={reviewsRef} className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-editorial font-bold mb-8">Customer Reviews</h2>
        
        <div className="flex flex-col md:flex-row gap-12 mb-8">
          {/* Rating Summary */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6 bg-[#141414] rounded-xl">
            <div className="text-5xl font-bold mb-2">{product.rating?.toFixed(1) || '0.0'}</div>
            <Rating value={product.rating || 0} readOnly className="mb-2" />
            <div className="text-sm text-[#A3A3A3]">Based on {product.reviewCount || 0} reviews</div>
            
            <div className="w-full mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map(star => {
                const count = reviews.filter(r => Math.round(r.rating) === star).length;
                const percent = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-3">{star}</span>
                    <Star size={12} className="fill-warning text-warning" />
                    <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-warning rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="w-8 text-right text-[#A3A3A3]">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold">{reviews.length} Reviews</h3>
              <select 
                className="border border-[#2F2F2F] rounded-md px-3 py-1.5 text-sm bg-white"
                value={reviewSort}
                onChange={(e) => setReviewSort(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>

            <div className="space-y-6">
              {sortedReviews.slice(0, visibleReviews).map(review => (
                <div key={review.id} className="border-b border-[#2F2F2F] pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Rating value={review.rating} readOnly size={14} className="mb-1" />
                      <div className="flex items-center gap-2 text-sm font-medium">
                        {review.userName}
                        {review.verified && <Badge variant="success" className="text-[10px] px-1.5 py-0">Verified</Badge>}
                      </div>
                    </div>
                    <span className="text-sm text-[#A3A3A3]">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-2">{review.title}</h4>
                  <p className="text-sm text-[#A3A3A3] mb-4">{review.text}</p>
                  <button className="text-xs font-medium text-[#A3A3A3] flex items-center gap-1 hover:text-[#C9A84C]">
                    <ThumbsUp size={14} /> Helpful ({review.helpful})
                  </button>
                </div>
              ))}
            </div>

            {visibleReviews < reviews.length && (
              <Button 
                variant="outline" 
                className="w-full mt-6"
                onClick={() => setVisibleReviews(prev => prev + 5)}
              >
                Load More Reviews
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-editorial font-bold mb-6">Recently Viewed</h2>
          <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 scrollbar-hide">
            {recentlyViewed
              .map(id => products.find(p => p.id === id))
              .filter(rv => rv && rv.id !== product.id)
              .map(rv => (
              <div key={rv.id} className="min-w-[220px] sm:min-w-[260px] md:min-w-[280px] w-[220px] sm:w-[260px] md:w-[280px] shrink-0">
                <ProductCard product={rv} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal (Simple Implementation) */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button 
              className="absolute top-4 right-4 text-[#A3A3A3] hover:text-[#C9A84C]"
              onClick={() => setSizeGuideOpen(false)}
            >
              <AlertCircle className="rotate-45" /> {/* Close icon using AlertCircle rotated */}
            </button>
            <h3 className="text-xl font-editorial font-bold mb-4">Size Guide</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-[#141414]">
                    <th className="p-3 border border-[#2F2F2F]">Size</th>
                    <th className="p-3 border border-[#2F2F2F]">Chest (in)</th>
                    <th className="p-3 border border-[#2F2F2F]">Waist (in)</th>
                    <th className="p-3 border border-[#2F2F2F]">Hips (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border border-[#2F2F2F] font-medium">XS</td><td className="p-3 border border-[#2F2F2F]">32-34</td><td className="p-3 border border-[#2F2F2F]">24-26</td><td className="p-3 border border-[#2F2F2F]">34-36</td></tr>
                  <tr><td className="p-3 border border-[#2F2F2F] font-medium">S</td><td className="p-3 border border-[#2F2F2F]">34-36</td><td className="p-3 border border-[#2F2F2F]">26-28</td><td className="p-3 border border-[#2F2F2F]">36-38</td></tr>
                  <tr><td className="p-3 border border-[#2F2F2F] font-medium">M</td><td className="p-3 border border-[#2F2F2F]">36-38</td><td className="p-3 border border-[#2F2F2F]">28-30</td><td className="p-3 border border-[#2F2F2F]">38-40</td></tr>
                  <tr><td className="p-3 border border-[#2F2F2F] font-medium">L</td><td className="p-3 border border-[#2F2F2F]">38-40</td><td className="p-3 border border-[#2F2F2F]">30-32</td><td className="p-3 border border-[#2F2F2F]">40-42</td></tr>
                  <tr><td className="p-3 border border-[#2F2F2F] font-medium">XL</td><td className="p-3 border border-[#2F2F2F]">40-42</td><td className="p-3 border border-[#2F2F2F]">32-34</td><td className="p-3 border border-[#2F2F2F]">42-44</td></tr>
                </tbody>
              </table>
            </div>
            <Button className="w-full mt-6" onClick={() => setSizeGuideOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
