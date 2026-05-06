import React, { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import canvasConfetti from "canvas-confetti";

export interface GeneratedOption {
  title: string;
  message: string;
  meaning: string;
}

export interface ResultCardProps {
  option: GeneratedOption;
  index: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({ option, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `💬 Option ${index + 1}: ${option.title}\n\n👉 Message:\n${option.message}\n\n🌐 Meaning:\n${option.meaning}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    canvasConfetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#2563eb", "#3b82f6"]
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = encodeURIComponent(`💬 ${option.title}\n\n👉 ${option.message}\n\n🌐 ${option.meaning}\n\nGenerated via ToolVanta`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "group relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800",
        "shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300",
        "flex flex-col gap-6"
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800/50 pb-4">
        <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <span className="text-xl">💬</span> Option {index + 1}: {option.title}
        </h4>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-all"
            title="Copy all"
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-green-500 transition-all"
            title="Share to WhatsApp"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500">
            👉 Message:
          </p>
          <p className="text-xl md:text-2xl font-medium text-slate-900 dark:text-white leading-relaxed">
            {option.message}
          </p>
          <button 
            onClick={() => {
                navigator.clipboard.writeText(option.message);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }}
            className="text-[10px] text-primary font-bold hover:underline"
          >
            Copy message only
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500">
            🌐 Meaning:
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {option.meaning}
          </p>
        </div>
      </div>

      <div className={cn(
        "absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-12 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
      )} />
    </motion.div>
  );
}
