import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export function Rating({ value, rating, max = 5, size = 'sm', showValue = false, count, className = '' }) {
  const currentRating = value !== undefined ? value : (rating !== undefined ? rating : 0);
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4.5 h-4.5',
    lg: 'w-5 h-5',
  };

  const stars = [];
  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(currentRating)) {
      stars.push(
        <Star
          key={i}
          className={`${sizeClasses[size]} fill-[#C9A84C] text-[#C9A84C]`}
        />
      );
    } else if (i - 0.5 <= currentRating) {
      stars.push(
        <StarHalf
          key={i}
          className={`${sizeClasses[size]} fill-[#C9A84C] text-[#C9A84C]`}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={`${sizeClasses[size]} text-[#2A2A2A]`}
        />
      );
    }
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">{stars}</div>
      {showValue && (
        <span className="text-sm font-medium text-[#C9A84C] ml-1">{currentRating.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-xs text-[#737373] ml-0.5">({count})</span>
      )}
    </div>
  );
}

export function PriceDisplay({ price, originalPrice, discount, size = 'md', className = '' }) {
  const priceClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <span className={`font-semibold text-white ${priceClasses[size]}`}>
        ${price.toFixed(2)}
      </span>
      {hasDiscount && (
        <>
          <span className={`text-[#737373] line-through ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            ${originalPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className={`font-medium text-[#C9A84C] ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
              -{discount}%
            </span>
          )}
        </>
      )}
    </div>
  );
}

export function QuantitySelector({ value = 1, onChange, min = 1, max = 99, size = 'md', className = '' }) {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrease = () => {
    if (value < max) onChange(value + 1);
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= min && val <= max) {
      onChange(val);
    }
  };

  const btnSize = size === 'sm' ? 'w-7 h-7 text-sm' : 'w-9 h-9 text-base';
  const inputSize = size === 'sm' ? 'w-10 h-7 text-sm' : 'w-12 h-9 text-base';

  return (
    <div className={`flex items-center border border-[#2F2F2F] rounded-[var(--radius-md)] ${className}`}>
      <button
        onClick={handleDecrease}
        disabled={value <= min}
        className={`${btnSize} flex items-center justify-center text-[#A3A3A3] hover:text-white hover:bg-[#141414] transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-l-[var(--radius-md)]`}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className={`${inputSize} text-center border-x border-[#2F2F2F] text-white bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        aria-label="Quantity"
      />
      <button
        onClick={handleIncrease}
        disabled={value >= max}
        className={`${btnSize} flex items-center justify-center text-[#A3A3A3] hover:text-white hover:bg-[#141414] transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-r-[var(--radius-md)]`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const variants = {
    default: 'bg-[#141414] text-[#A3A3A3]',
    primary: 'bg-[#C9A84C] text-white',
    secondary: 'bg-secondary-light text-[#C9A84C]',
    sale: 'bg-accent text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    new: 'bg-[#C9A84C] text-white',
    outline: 'border border-[#2F2F2F] text-[#A3A3A3]',
  };

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-[var(--radius-sm)] uppercase tracking-wider
        ${variants[variant] || variants.default}
        ${sizeClasses[size] || sizeClasses.sm}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export function Skeleton({ className = '', variant = 'rect' }) {
  const baseClasses = 'animate-shimmer rounded-[var(--radius-md)]';
  
  if (variant === 'circle') {
    return <div className={`${baseClasses} rounded-full ${className}`} />;
  }
  if (variant === 'text') {
    return <div className={`${baseClasses} h-4 ${className}`} />;
  }
  return <div className={`${baseClasses} ${className}`} />;
}

export function Chip({ children, label, onRemove, active = false, className = '' }) {
  const content = children || label;
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
        rounded-[var(--radius-full)] border transition-colors
        ${active
          ? 'bg-[#C9A84C] text-white border-primary'
          : 'bg-white text-white border-[#2F2F2F] hover:border-[#2F2F2F]-dark'
        }
        ${className}
      `}
    >
      {content}
      {onRemove && (
        <button
          onClick={onRemove}
          className={`ml-0.5 ${active ? 'text-white/70 hover:text-white' : 'text-[#737373] hover:text-white'}`}
          aria-label="Remove filter"
        >
          ×
        </button>
      )}
    </span>
  );
}

export function ProgressBar({ value = 0, max = 100, label, className = '' }) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-[#A3A3A3]">{label}</span>
          <span className="text-xs font-medium text-white">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-[#141414] rounded-[var(--radius-full)] overflow-hidden">
        <div
          className="h-full bg-secondary rounded-[var(--radius-full)] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
