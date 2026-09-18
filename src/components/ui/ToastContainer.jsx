import React from 'react';
import { useToast } from '../../context/ToastContext';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: 'bg-success',
  error: 'bg-accent',
  info: 'bg-[#C9A84C]',
  warning: 'bg-warning',
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || icons.info;
        return (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-[var(--radius-lg)]
              text-white shadow-[var(--shadow-lg)] animate-slide-up
              ${colors[toast.type] || colors.info}
            `}
            role="alert"
          >
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 p-0.5 hover:opacity-80 transition-opacity"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
