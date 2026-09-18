import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button, CountdownTimer, Rating } from '../components/ui';
import ProductCard from '../components/product/ProductCard';

import { products as initialProducts } from '../data/products';
import { categories as initialCategories } from '../data/categories';
import { banners as initialBanners } from '../data/banners';

const MOCK_TESTIMONIALS = [
  { id: 't1', name: 'Sarah J.', rating: 5, quote: "The quality of the linen shirt is unbelievable. It's become my everyday staple.", verified: true },
  { id: 't2', name: 'Michael T.', rating: 5, quote: "Fast shipping and the fit was perfect. Will definitely be ordering again.", verified: true },
  { id: 't3', name: 'Emma W.', rating: 4, quote: "Beautiful packaging and the dress looks exactly like the pictures.", verified: true },
];

export default function Home() {
  const [products] = useState(initialProducts);
  const [categories] = useState(initialCategories);
  const [banners] = useState(initialBanners);

  const newArrivals = products.filter(p => p.newArrival);
  const bestsellers = products.filter(p => p.bestseller).slice(0, 8);
  const flashSale = products.filter(p => p.discount > 0);
  const trending = products.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-[#0E0E0E]">
      <HeroSection banners={banners} />
      <CategoryGrid categories={categories} />
      <NewArrivals products={newArrivals} />
      <PromoBanner banner={banners[0]} />
      <Bestsellers products={bestsellers} />
      <FlashSaleSection products={flashSale} />
      <CollectionSpotlight />
      <TrendingSection products={trending} />
      <ReviewsSection testimonials={MOCK_TESTIMONIALS} />
    </div>
  );
}

/* ─────────── Hero ─────────── */
function HeroSection({ banners }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!banners || banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  return (
    <section className="relative w-full h-[340px] sm:h-[420px] md:h-[500px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <div className="absolute inset-0 bg-black/55 z-10" />
          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6">
            {/* Gold label */}
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A84C] font-semibold mb-3">
              TOOBA Collection
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 font-semibold tracking-tight">
              {banner.title}
            </h1>
            <p className="text-sm sm:text-base mb-7 max-w-xl text-white/70">{banner.subtitle}</p>
            <Button as={Link} to={banner.ctaLink} size="lg" className="px-8">
              {banner.ctaText}
            </Button>
          </div>
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-0 right-0 z-30 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-7 bg-[#C9A84C]' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────── Category Grid ─────────── */
function CategoryGrid({ categories }) {
  if (!categories || categories.length === 0) return null;
  return (
    <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 w-full">
      <div className="text-center mb-8">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A84C] font-semibold mb-2 block">
          Curated for You
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl text-[#F0EDE6] font-normal">
          Our Collections
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative overflow-hidden rounded-xl bg-[#161616] h-[260px] sm:h-[300px] md:h-[340px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104 opacity-70 group-hover:opacity-85"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 sm:p-7">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C9A84C] mb-1.5">
                TOOBA Collection
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-1.5">
                {category.name}
              </h3>
              <p className="text-[#A3A3A3] text-xs sm:text-sm line-clamp-1 mb-4 max-w-sm">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {category.subcategories?.slice(0, 3).map((sub) => (
                  <Link
                    key={sub.id}
                    to={`/category/${category.slug}/${sub.slug}`}
                    className="text-[11px] bg-white/10 hover:bg-[#C9A84C]/20 border border-white/15 hover:border-[#C9A84C]/40 backdrop-blur-sm px-2.5 py-1 rounded-full text-white/80 hover:text-[#C9A84C] transition-all"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
              <Button
                as={Link}
                to={`/category/${category.slug}`}
                size="sm"
                className="self-start"
              >
                Shop {category.name}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────── New Arrivals ─────────── */
function NewArrivals({ products }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({ left: dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A84C] font-semibold mb-1 block">Just In</span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#F0EDE6] font-normal">New Arrivals</h2>
          </div>
          <Link to="/shop?sort=newest" className="flex items-center gap-1 text-xs font-medium text-[#9A9488] hover:text-[#C9A84C] transition-colors">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="relative group/nav">
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-9 h-9 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C9A84C]/50 rounded-full flex items-center justify-center opacity-0 group-hover/nav:opacity-100 transition-all hidden md:flex">
            <ChevronLeft className="w-4 h-4 text-[#C9A84C]" />
          </button>

          <div ref={scrollRef} className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            {products.map(product => (
              <div key={product.id} className="w-[180px] sm:w-[200px] md:w-[220px] flex-none snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-9 h-9 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C9A84C]/50 rounded-full flex items-center justify-center opacity-0 group-hover/nav:opacity-100 transition-all hidden md:flex">
            <ChevronRight className="w-4 h-4 text-[#C9A84C]" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Promo Banner ─────────── */
function PromoBanner({ banner }) {
  if (!banner) return null;
  return (
    <section className="w-full bg-[#111111] border-y border-[#1E1E1E] my-0">
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[320px]">
        <div className="w-full md:w-1/2 h-[200px] sm:h-[240px] md:h-full overflow-hidden">
          <img
            src={banner.image || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80'}
            alt="Promo"
            className="w-full h-full object-cover opacity-75"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-14 bg-[#111111] text-center md:text-left">
          <div className="max-w-sm">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A84C] font-semibold mb-3 block">Effortless Style</span>
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-medium mb-3 text-[#F0EDE6]">
              Wardrobe Essentials
            </h2>
            <p className="text-[#737373] mb-6 text-sm leading-relaxed">
              Curated collections designed to seamlessly integrate into your daily wardrobe — pieces that speak to modern minimalism.
            </p>
            <Button as={Link} to="/shop" size="md" className="w-full sm:w-auto">
              Explore Collection
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Bestsellers ─────────── */
function Bestsellers({ products }) {
  return (
    <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 w-full">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A84C] font-semibold mb-1 block">Top Picks</span>
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#F0EDE6] font-normal">Bestsellers</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button as={Link} to="/shop?sort=popular" variant="outline" size="md">
          Shop All Bestsellers
        </Button>
      </div>
    </section>
  );
}

/* ─────────── Flash Sale ─────────── */
function FlashSaleSection({ products }) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  return (
    <section className="py-10 sm:py-14 bg-[#0A0A0A] border-y border-[#C9A84C]/10">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-7 gap-5">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A84C] font-semibold mb-1 block">Limited Time</span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#F0EDE6] font-normal flex items-center gap-2.5">
              Flash Sale <span role="img" aria-label="fire">🔥</span>
            </h2>
            <p className="text-[#737373] mt-1 text-sm">Up to 50% off selected styles.</p>
          </div>
          <div className="bg-[#161616] border border-[#C9A84C]/20 px-4 py-3 rounded-lg self-start inline-block">
            <CountdownTimer targetDate={targetDate} />
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          {products.map(product => (
            <div key={product.id} className="w-[180px] sm:w-[200px] md:w-[220px] flex-none snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Collection Spotlight ─────────── */
function CollectionSpotlight() {
  return (
    <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 w-full">
      <div className="text-center mb-8">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A84C] font-semibold mb-1 block">
          Explore
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl text-[#F0EDE6] font-normal">
          Shop by Category
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Men's */}
        <div className="relative group overflow-hidden rounded-xl h-[260px] sm:h-[300px] md:h-[340px] bg-[#161616]">
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors z-10" />
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85"
            alt="Men's Modern Tailoring"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-75"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 text-white">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-[#C9A84C] mb-2">Menswear</span>
            <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl mb-2.5 font-normal">Modern Men's Tailoring</h3>
            <p className="text-[#A3A3A3] text-xs max-w-xs mb-5 leading-relaxed">
              Structured lines, breathable linen, and garment-dyed textures made for effortless living.
            </p>
            <Button as={Link} to="/category/men" variant="outline" size="sm">
              Shop Men's Edit
            </Button>
          </div>
        </div>

        {/* Kids */}
        <div className="relative group overflow-hidden rounded-xl h-[260px] sm:h-[300px] md:h-[340px] bg-[#161616]">
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors z-10" />
          <img
            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=85"
            alt="Kids Organic Playwear"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-75"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 text-white">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-[#C9A84C] mb-2">Kids & Baby</span>
            <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl mb-2.5 font-normal">Organic Playwear</h3>
            <p className="text-[#A3A3A3] text-xs max-w-xs mb-5 leading-relaxed">
              Ultra-soft, skin-friendly GOTS certified cotton designed to endure playtime.
            </p>
            <Button as={Link} to="/category/kids" variant="outline" size="sm">
              Shop Kids Edit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Trending ─────────── */
function TrendingSection({ products }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({ left: dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A84C] font-semibold mb-1 block">Popular Right Now</span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#F0EDE6] font-normal">Trending Now</h2>
          </div>
        </div>

        <div className="relative group/nav">
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-9 h-9 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C9A84C]/50 rounded-full flex items-center justify-center opacity-0 group-hover/nav:opacity-100 transition-all hidden md:flex">
            <ChevronLeft className="w-4 h-4 text-[#C9A84C]" />
          </button>

          <div ref={scrollRef} className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            {products.map(product => (
              <div key={product.id} className="w-[180px] sm:w-[200px] md:w-[220px] flex-none snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-9 h-9 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C9A84C]/50 rounded-full flex items-center justify-center opacity-0 group-hover/nav:opacity-100 transition-all hidden md:flex">
            <ChevronRight className="w-4 h-4 text-[#C9A84C]" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Reviews ─────────── */
function ReviewsSection({ testimonials }) {
  return (
    <section className="py-12 sm:py-16 bg-[#0E0E0E] border-t border-[#1E1E1E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A84C] font-semibold mb-2 block">
            Customer Stories
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#F0EDE6] font-normal">
            What Our Community Says
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className="bg-[#141414] rounded-xl border border-[#222222] hover:border-[#C9A84C]/25 p-5 sm:p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(201,168,76,0.06)]"
            >
              <Rating value={testimonial.rating} size="sm" />
              <p className="text-[#8A8680] text-sm leading-relaxed font-light flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between border-t border-[#1E1E1E] pt-4">
                <span className="text-sm font-semibold text-[#D0CCC6]">{testimonial.name}</span>
                {testimonial.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#3A9E6F] bg-[#3A9E6F]/10 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
