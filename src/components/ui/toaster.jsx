import { X } from "lucide-react";

import { useToastContext } from "@/components/ui/toast";

const variantClasses = {
  default: "border-border bg-background text-foreground",
  success: "border-emerald-500/50 bg-emerald-500/10 text-emerald-950 dark:text-emerald-50",
  destructive: "border-red-500/50 bg-red-500/10 text-red-950 dark:text-red-50",
};

export function Toaster() {
  const { toasts, dismissToast } = useToastContext();

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={[
            "pointer-events-auto overflow-hidden rounded-xl border shadow-lg backdrop-blur-sm",
            variantClasses[toast.variant ?? "default"],
          ].join(" ")}
        >
          <div className="flex items-start gap-3 p-3">
            <div className="min-w-0 flex-1">
              {toast.title && (
                <p className="text-sm font-semibold">{toast.title}</p>
              )}
              {toast.description && (
                <p className="mt-1 text-sm opacity-90">{toast.description}</p>
              )}
            </div>

            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => dismissToast(toast.id)}
              className="rounded-md p-1 text-current/80 transition hover:bg-black/5 hover:text-current"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
