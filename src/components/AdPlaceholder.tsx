import React from "react";
import { cn } from "@/src/lib/utils";

interface AdPlaceholderProps {
  label?: string;
  className?: string;
  variant?: "horizontal" | "vertical" | "square";
}

export function AdPlaceholder({ label = "Sponsored Ad", className, variant = "horizontal" }: AdPlaceholderProps) {
  const hMap = {
    horizontal: "h-24 md:h-32 w-full",
    vertical: "h-[600px] w-full md:w-64",
    square: "h-64 w-full md:w-64"
  };

  return (
    <div 
      className={cn(
        "bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700",
        "flex items-center justify-center rounded-2xl overflow-hidden",
        hMap[variant],
        className
      )}
    >
      <div className="text-center p-4">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold mb-1">
          {label}
        </p>
        <div className="text-xs text-slate-300 dark:text-slate-600 italic">
          Place AdSense script here
        </div>
      </div>
    </div>
  );
}
