import React, { useState, useEffect } from 'react';

export function CountdownTimer({ targetDate, onExpire, className = '' }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const left = calculateTimeLeft(targetDate);
      setTimeLeft(left);
      if (left.total <= 0) {
        clearInterval(timer);
        onExpire?.();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate, onExpire]);

  if (timeLeft.total <= 0) return null;

  const blocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {blocks.map((block, i) => (
        <React.Fragment key={block.label}>
          <div className="text-center">
            <div className="bg-[#C9A84C] text-white font-semibold text-lg md:text-xl px-2.5 py-1.5 rounded-[var(--radius-md)] min-w-[44px] tabular-nums">
              {String(block.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] text-[#737373] mt-1 uppercase tracking-wider">{block.label}</div>
          </div>
          {i < blocks.length - 1 && (
            <span className="text-[#737373] text-lg font-bold mt-[-16px]">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function calculateTimeLeft(targetDate) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Breadcrumb({ items = [], className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1.5 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {index > 0 && <span className="text-[#737373]">/</span>}
            {item.href ? (
              <a
                href={item.href}
                className="text-[#A3A3A3] hover:text-[#C9A84C] transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-white font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Pagination({ currentPage, totalPages, onPageChange, className = '' }) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav aria-label="Pagination" className={`flex items-center justify-center gap-1 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm text-[#A3A3A3] hover:text-white hover:bg-[#141414] rounded-[var(--radius-md)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        ← Prev
      </button>
      {getVisiblePages().map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-[#737373]">…</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 text-sm rounded-[var(--radius-md)] transition-colors ${
              page === currentPage
                ? 'bg-[#C9A84C] text-white font-medium'
                : 'text-[#A3A3A3] hover:text-white hover:bg-[#141414]'
            }`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm text-[#A3A3A3] hover:text-white hover:bg-[#141414] rounded-[var(--radius-md)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  );
}

export function Tabs({ tabs = [], activeTab, onChange, className = '' }) {
  return (
    <div className={className}>
      <div className="flex border-b border-[#2F2F2F] overflow-x-auto no-scrollbar" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors relative
              ${activeTab === tab.id
                ? 'text-[#C9A84C]'
                : 'text-[#A3A3A3] hover:text-white'
              }
            `}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1.5 text-xs text-[#737373]">({tab.count})</span>
            )}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A84C]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Accordion({ items = [], className = '' }) {
  const [openItems, setOpenItems] = useState(new Set([items[0]?.id]));

  const toggle = (id) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`divide-y divide-border ${className}`}>
      {items.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => toggle(item.id)}
            className="w-full flex items-center justify-between py-4 text-left group"
            aria-expanded={openItems.has(item.id)}
          >
            <span className="text-sm font-medium text-white group-hover:text-secondary transition-colors">
              {item.title}
            </span>
            <span
              className={`text-[#737373] transition-transform duration-[250ms] ${
                openItems.has(item.id) ? 'rotate-180' : ''
              }`}
            >
              ▾
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-[250ms] ${
              openItems.has(item.id) ? 'max-h-[2000px] opacity-100 pb-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="text-sm text-[#A3A3A3] leading-relaxed">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-[#141414] flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-[#737373]" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[#A3A3A3] max-w-sm mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', message, onRetry, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
        <span className="text-2xl">⚠</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {message && <p className="text-sm text-[#A3A3A3] max-w-sm mb-6">{message}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 text-sm font-medium bg-[#C9A84C] text-white rounded-[var(--radius-md)] hover:bg-[#C9A84C]-light transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export function ImageZoom({ src, alt, className = '' }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      className={`relative overflow-hidden cursor-zoom-in ${className}`}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-[150ms] ${
          isZoomed ? 'scale-[2]' : 'scale-100'
        }`}
        style={
          isZoomed
            ? { transformOrigin: `${position.x}% ${position.y}%` }
            : undefined
        }
        draggable={false}
      />
    </div>
  );
}
