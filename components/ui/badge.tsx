import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "academic"
    | "attention"
    | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors",
        {
          "bg-primary-navy-light text-primary-navy border-transparent":
            variant === "default",
          "bg-success-light text-success border-transparent":
            variant === "success",
          "bg-warning-light text-warning border-transparent":
            variant === "warning",
          "bg-danger-light text-danger border-transparent":
            variant === "danger",
          "bg-info-light text-info border-transparent":
            variant === "info",
          "bg-academic-light text-academic border-transparent":
            variant === "academic",
          "bg-attention-light text-attention border-transparent":
            variant === "attention",
          "border-border-base text-text-secondary bg-surface-base":
            variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
