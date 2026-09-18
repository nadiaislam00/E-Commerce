import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { generateId } from '../utils/formatters';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = generateId();
    const newToast = { id, message, type, duration };
    
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
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-4 text-white hover:text-gray-200">
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
