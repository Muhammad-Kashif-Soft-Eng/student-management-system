import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback((toast) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const duration = toast.duration ?? 3000;

    setToasts((current) => [...current, { ...toast, id }]);

    if (duration > 0) {
      window.setTimeout(() => dismissToast(id), duration);
    }
  }, [dismissToast]);

  const value = useMemo(
    () => ({
      toasts,
      pushToast,
      dismissToast,
    }),
    [dismissToast, pushToast, toasts]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToastContext() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }

  return context;
}
