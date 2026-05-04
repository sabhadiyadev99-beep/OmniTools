import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Tool } from "@/src/constants";
import { cn } from "@/src/lib/utils";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group"
    >
      <Link
        to={tool.path}
        className={cn(
          "block p-6 rounded-3xl h-full transition-all duration-300",
          "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800",
          "hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20",
          "flex flex-col relative overflow-hidden"
        )}
      >
        <div className={cn(
          "w-12 h-12 rounded-2xl mb-4 flex items-center justify-center transition-colors",
          "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
          "group-hover:bg-primary/10 group-hover:text-primary"
        )}>
          <Icon size={24} />
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
          {tool.name}
        </h3>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {tool.description}
        </p>

        <div className="mt-auto pt-6 flex items-center text-xs font-semibold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Open Tool <ArrowRight size={14} className="ml-2" />
        </div>

        <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
      </Link>
    </motion.div>
  );
}
