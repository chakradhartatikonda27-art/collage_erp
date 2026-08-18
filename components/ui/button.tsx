import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline" | "success";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-ring disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          {
            // Variants
            "bg-primary-blue text-white hover:bg-primary-blue-hover":
              variant === "primary",
            "bg-primary-navy text-white hover:bg-primary-navy-hover":
              variant === "secondary",
            "bg-danger text-white hover:bg-danger-hover": variant === "danger",
            "bg-success text-white hover:bg-success-hover": variant === "success",
            "border border-border-base bg-surface-base hover:bg-surface-hover text-text-primary":
              variant === "outline",
            "hover:bg-surface-hover text-text-secondary": variant === "ghost",
            
            // Sizes
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
            "h-10 w-10 p-0": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
