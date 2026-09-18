import React, { forwardRef } from 'react';

export const Input = forwardRef(function Input({
  label,
  error,
  icon: Icon,
  className = '',
  type = 'text',
  ...props
}, ref) {
  return (
    <div className="w-full !mb-6">
      {label && (
        <label className="block text-sm font-medium text-white/90 !mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
        )}
        <input
          ref={ref}
          type={type}
          className={`
            w-full !px-4 !py-2 text-sm bg-[#0E0E0E] !border !border-[#2F2F2F] !rounded-md
            text-white placeholder:text-[#525252]
            focus:outline-none focus:!border-[#C9A84C] focus:bg-[#141414] focus:ring-1 focus:ring-[#C9A84C]
            transition-colors duration-200
            disabled:bg-[#141414] disabled:text-[#525252] disabled:cursor-not-allowed
            ${Icon ? '!pl-10' : ''}
            ${error ? '!border-red-500 focus:!border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className="w-full !mb-6">
      {label && (
        <label className="block text-sm font-medium text-white/90 !mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full !px-4 !py-2 text-sm bg-[#0E0E0E] !border !border-[#2F2F2F] !rounded-md
          text-white placeholder:text-[#525252]
          focus:outline-none focus:!border-[#C9A84C] focus:bg-[#141414] focus:ring-1 focus:ring-[#C9A84C]
          transition-colors duration-200 resize-vertical min-h-[100px]
          ${error ? '!border-red-500 focus:!border-red-500 focus:ring-red-500' : ''}
          ${className}



        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-[#C9A84C]">{error}</p>
      )}
    </div>
  );
}

export function Select({ label, error, options = [], placeholder, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white mb-1.5">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-2.5 text-sm bg-white border border-[#2F2F2F] rounded-[var(--radius-md)]
          text-white appearance-none cursor-pointer
          focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary
          transition-colors duration-[150ms]
          bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B6B6B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')]
          bg-no-repeat bg-[right_12px_center]
          ${error ? 'border-accent' : ''}
          ${className}
        `}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs text-[#C9A84C]">{error}</p>
      )}
    </div>
  );
}

export function Checkbox({ label, className = '', ...props }) {
  return (
    <label className={`flex items-center gap-2.5 cursor-pointer group ${className}`}>
      <input
        type="checkbox"
        className="w-4 h-4 !rounded !border !border-[#2F2F2F] !bg-[#141414] !text-[#C9A84C] focus:!ring-[#C9A84C] cursor-pointer !accent-[#C9A84C]"
        {...props}
      />
      {label && (
        <span className="text-sm text-white/80 group-hover:text-white transition-colors">
          {label}
        </span>
      )}
    </label>
  );
}

export function RadioGroup({ label, name, options = [], value, onChange, className = '' }) {
  return (
    <fieldset className={className}>
      {label && (
        <legend className="block text-sm font-medium text-white mb-2">
          {label}
        </legend>
      )}
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 border-[#2F2F2F] text-secondary focus:ring-secondary cursor-pointer accent-secondary"
            />
            <span className="text-sm text-white">
              {opt.label}
            </span>
            {opt.description && (
              <span className="text-xs text-[#737373]">{opt.description}</span>
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
