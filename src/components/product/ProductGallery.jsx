import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ImageZoom } from '../../components/ui';

export default function ProductGallery({ images = [], productName = '' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleKeyDown = useCallback((e) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') setLightboxOpen(false);
    if (e.key === 'ArrowRight') setActiveIndex((prev) => (prev + 1) % images.length);
    if (e.key === 'ArrowLeft') setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [lightboxOpen, images.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 sm:gap-4 w-full">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:w-20 lg:w-24 shrink-0 scrollbar-hide py-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative rounded-md overflow-hidden w-16 h-16 md:w-full md:h-auto aspect-square shrink-0 border-2 transition-colors ${
              activeIndex === idx ? 'border-primary ring-1 ring-primary' : 'border-transparent hover:border-[#2F2F2F]'
            }`}
          >
            <img src={img} alt={`${productName} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div 
        className="flex-1 relative cursor-zoom-in group bg-[#141414] rounded-lg overflow-hidden aspect-[4/5] max-h-[640px] w-full" 
        onClick={() => setLightboxOpen(true)}
      >
        <ImageZoom 
          src={images[activeIndex]} 
          alt={`${productName} view ${activeIndex + 1}`} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={24} />
          </button>
          
          <div className="relative flex items-center justify-center w-full max-w-5xl h-[70vh]">
            <button 
              className="absolute left-4 md:left-8 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
              onClick={(e) => { e.stopPropagation(); setActiveIndex((prev) => (prev - 1 + images.length) % images.length); }}
            >
              <ChevronLeft size={32} />
            </button>
            
            <img 
              src={images[activeIndex]} 
              alt={`${productName} lightbox ${activeIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            <button 
              className="absolute right-4 md:right-8 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
              onClick={(e) => { e.stopPropagation(); setActiveIndex((prev) => (prev + 1) % images.length); }}
            >
              <ChevronRight size={32} />
            </button>
          </div>
          
          <div className="flex gap-3 mt-6 max-w-full overflow-x-auto p-2 no-scrollbar">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 shrink-0 transition-opacity ${
                  activeIndex === idx ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${productName} lightbox thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
