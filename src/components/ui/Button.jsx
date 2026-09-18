import React from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: '!bg-[#C9A84C] !text-[#0E0E0E] hover:!bg-[#E0BC6A] shadow-sm font-semibold',
  secondary: '!bg-[#1E1E1E] !text-[#C9A84C] !border !border-[#C9A84C]/30 hover:!border-[#C9A84C] hover:!bg-[#C9A84C]/10',
  outline: '!border !border-[#C9A84C] !text-[#C9A84C] hover:!bg-[#C9A84C] hover:!text-[#0E0E0E] font-semibold',
  ghost: '!text-[#F0EDE6] hover:!bg-[#1E1E1E]',
  danger: '!bg-[#E05252] !text-white hover:!bg-red-700',
  dark: '!bg-[#0E0E0E] !text-[#F0EDE6] !border !border-[#2A2A2A] hover:!border-[#C9A84C] hover:!text-[#C9A84C]',
  white: '!bg-white !text-[#0E0E0E] hover:!bg-[#F0EDE6] font-semibold',
};

const sizes = {
  sm: '!px-4 !py-2 !text-sm',
  md: '!px-6 !py-3 !text-sm',
  lg: '!px-8 !py-3.5 !text-base',
  xl: '!px-10 !py-4 !text-lg',
  icon: '!p-2.5',
};

export function Button({
  as: Component = 'button',
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  const isButton = Component === 'button';
  return (
    <Component
      className={`!inline-flex items-center justify-center gap-2 font-medium !rounded-md transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={isButton ? (disabled || loading) : undefined}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </Component>
  );
}
