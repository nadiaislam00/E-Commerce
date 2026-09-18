import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children, size = 'md', className = '' }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = '';
      };
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`
          relative bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]
          w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto
          animate-scale-in ${className}
        `}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2F2F2F]">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-[var(--radius-sm)] hover:bg-[#141414] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-[#A3A3A3]" />
            </button>
          </div>
        )}
        <div className={title ? 'p-6' : 'p-6'}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Drawer({ isOpen, onClose, title, children, side = 'right', className = '' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = '';
      };
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slideClass = side === 'right' ? 'animate-slide-in-right right-0' : 'animate-slide-in-left left-0';

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`
          absolute top-0 ${slideClass} h-full w-full max-w-md bg-white shadow-[var(--shadow-lg)]
          flex flex-col ${className}
        `}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2F2F2F]">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-[var(--radius-sm)] hover:bg-[#141414] transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5 text-[#A3A3A3]" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
