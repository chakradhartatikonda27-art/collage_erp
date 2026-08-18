"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  position?: "right" | "left";
}

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  position = "right"
}: DrawerProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          "fixed inset-y-0 w-full max-w-md bg-surface-base shadow-premium border-l border-border-base flex flex-col z-10 transition-transform duration-300 ease-in-out",
          {
            "right-0 animate-in slide-in-from-right": position === "right",
            "left-0 animate-in slide-in-from-left": position === "left",
          }
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-base/50">
          <div className="flex flex-col space-y-0.5">
            <h2 className="text-base font-semibold text-text-primary">{title}</h2>
            {description && (
              <p className="text-xs text-text-muted">{description}</p>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-text-muted hover:text-text-primary rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 text-sm text-text-secondary">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-border-base/50 bg-slate-50/50 flex items-center justify-end space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
