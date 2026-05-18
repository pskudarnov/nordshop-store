"use client";

import { CheckCircle2, Info, X } from "lucide-react";
import { useUiStore } from "@/store/ui-store";

export function ToastViewport() {
  const toasts = useUiStore((s) => s.toasts);
  const removeToast = useUiStore((s) => s.removeToast);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[calc(var(--header-height,72px)+16px)] z-[130] mx-auto flex w-full max-w-6xl justify-end px-4 sm:px-6">
      <div className="flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className="pointer-events-auto rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-[var(--card-foreground)] shadow-[var(--shadow-soft)] backdrop-blur-sm animate-[toast-in_220ms_ease-out]"
          >
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">
                {toast.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <Info className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[var(--foreground)]">{toast.title}</p>
                {toast.message ? <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">{toast.message}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="rounded-md p-1 text-[var(--muted-foreground)] transition-colors duration-200 hover:bg-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
