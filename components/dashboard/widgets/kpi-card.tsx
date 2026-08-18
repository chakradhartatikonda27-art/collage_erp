import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  type?: "neutral" | "success" | "warning" | "danger" | "info" | "academic";
}

export function KPICard({ title, value, change, isPositive, type = "neutral" }: KPICardProps) {
  return (
    <Card className="hover:shadow-medium transition-shadow duration-300">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <p className="text-xs font-bold text-text-secondary tracking-wide uppercase select-none">
            {title}
          </p>
          <span
            className={cn(
              "inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full select-none",
              isPositive
                ? "bg-success-light text-success"
                : "bg-danger-light text-danger"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" />
            )}
            {change.split(" ")[0]}
          </span>
        </div>

        <div className="mt-3.5">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-primary">
            {value}
          </h3>
          <p className="text-[11px] text-text-muted mt-1 font-medium select-none">
            {change.substring(change.indexOf(" ") + 1)}
          </p>
        </div>

        {/* Decorative subtle colored indicator strip at the bottom of card */}
        <div
          className={cn(
            "h-1 w-full absolute bottom-0 left-0",
            {
              "bg-primary-navy/20": type === "neutral",
              "bg-success": type === "success",
              "bg-warning": type === "warning",
              "bg-danger": type === "danger",
              "bg-primary-blue": type === "info",
              "bg-academic": type === "academic",
            }
          )}
        />
      </CardContent>
    </Card>
  );
}
