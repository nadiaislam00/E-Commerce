import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { generateId } from '../utils/formatters';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((payload, explicitType, explicitDuration) => {
    const id = generateId();
    let message = payload;
    let type = explicitType || 'info';
    let duration = explicitDuration !== undefined ? explicitDuration : 3000;
    let title = null;

    if (payload !== null && typeof payload === 'object') {
      message = payload.message || payload.description || '';
      title = payload.title || '';
      type = payload.type || type;
      if (payload.duration !== undefined) duration = payload.duration;
    }

    const newToast = { id, message, title, type, duration };
    
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  }, [removeToast]);

  const value = useMemo(() => ({
    toasts,
    addToast,
    removeToast
  }), [toasts, addToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded shadow-lg text-white ${
              toast.type === 'success' ? 'bg-[#2D8B57]' :
              toast.type === 'error' ? 'bg-[#D4544A]' :
              toast.type === 'warning' ? 'bg-[#E09F3E]' :
              'bg-[#1B2A4A]'
            } transition-all transform duration-300 flex items-center justify-between`}
            style={{ minWidth: '250px' }}
          >
            <div className="flex flex-col">
              {toast.title && <span className="font-bold text-sm mb-0.5">{toast.title}</span>}
              <span className="text-sm">{String(toast.message)}</span>
            </div>
            <button onClick={() => removeToast(toast.id)} className="ml-4 text-white hover:text-gray-200 shrink-0 self-start">
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
