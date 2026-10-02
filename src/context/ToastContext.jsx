import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Trash2, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const toast = {
    success: (msg, duration) => showToast(msg, "success", duration),
    delete: (msg, duration) => showToast(msg, "delete", duration),
    error: (msg, duration) => showToast(msg, "error", duration),
    info: (msg, duration) => showToast(msg, "info", duration),
  };

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}

      {/* Floating Top-Right Toast Notifications Container */}
      <div 
        aria-live="polite"
        className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((item) => {
          const isSuccess = item.type === "success";
          const isDelete = item.type === "delete";
          const isError = item.type === "error";

          let borderClass = "border-emerald-200 bg-white";
          let dotClass = "bg-emerald-500";
          let icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;

          if (isDelete) {
            borderClass = "border-red-200 bg-white";
            dotClass = "bg-red-500";
            icon = <Trash2 className="w-4 h-4 text-red-600 shrink-0" />;
          } else if (isError) {
            borderClass = "border-rose-200 bg-white";
            dotClass = "bg-rose-500";
            icon = <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />;
          } else if (item.type === "info") {
            borderClass = "border-blue-200 bg-white";
            dotClass = "bg-blue-500";
            icon = <Info className="w-4 h-4 text-blue-600 shrink-0" />;
          }

          return (
            <div
              key={item.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border shadow-lg shadow-black/5 transition-all duration-300 transform translate-y-0 opacity-100 ${borderClass}`}
              role="alert"
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full animate-pulse shrink-0 ${dotClass}`} />
                {icon}
                <span className="text-xs sm:text-sm font-semibold text-gray-800">
                  {item.message}
                </span>
              </div>

              <button
                onClick={() => removeToast(item.id)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
