"use client";

import { useERP } from "@/context/erp-context";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToastContainer() {
  const { toasts, removeToast } = useERP();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-start p-4 rounded-xl border shadow-premium animate-in slide-in-from-bottom-4 duration-300 bg-surface-base",
            {
              "border-success/30 bg-success-light/80 text-success-hover":
                toast.type === "success",
              "border-warning/30 bg-warning-light/80 text-warning-hover":
                toast.type === "warning",
              "border-danger/30 bg-danger-light/80 text-danger-hover":
                toast.type === "danger",
              "border-info/30 bg-info-light/80 text-primary-blue-hover":
                toast.type === "info",
            }
          )}
        >
          <div className="flex-shrink-0 mr-3">
            {toast.type === "success" && <CheckCircle className="h-5 w-5" />}
            {toast.type === "warning" && <AlertCircle className="h-5 w-5" />}
            {toast.type === "danger" && <AlertCircle className="h-5 w-5" />}
            {toast.type === "info" && <Info className="h-5 w-5" />}
          </div>
          <div className="flex-1 text-sm font-medium pr-4 leading-snug">
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-text-muted hover:text-text-primary rounded-lg p-0.5 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
