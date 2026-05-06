import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";
import { tools } from "@/src/constants";
import { ToolCard } from "@/src/components/ToolCard";
import { AdPlaceholder } from "@/src/components/AdPlaceholder";
import { Search, Sparkles, Filter } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Home() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search");
    if (searchParam) {
      setSearch(searchParam);
    }
  }, [location.search]);

  const categories = ["All", "Creator", "Business", "Relationship", "Utility"];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                         tool.description.toLowerCase().includes(search.toLowerCase()) ||
                         tool.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
        >
          <Sparkles size={16} /> 20+ Professional Tools. One Hub.
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tighter"
        >
          <span className="text-slate-900 dark:text-white">Simplify Your</span>{" "}
          <span className="text-primary">Digital Workflow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
        >
          Free online tools for creators, businesses, and everyone else. 
          No login, no subscriptions, just pure utility.
        </motion.p>
      </section>

      <AdPlaceholder className="mb-16" />

      {/* Search & Filter */}
      <div className="sticky top-20 z-40 mb-12 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search 20+ tools (e.g. caption, invoice, password)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                "w-full pl-12 pr-6 py-4 rounded-2xl",
                "bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
                "focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all",
                "text-slate-900 dark:text-white placeholder:text-slate-500 shadow-sm"
              )}
            />
          </div>
          
          <div className="flex gap-2 p-1 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                  activeCategory === cat 
                    ? "bg-white dark:bg-slate-800 text-primary shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTools.map((tool, idx) => (
            <motion.div
              layout
              key={tool.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <div className="text-slate-400 dark:text-slate-600 flex justify-center">
            <Filter size={48} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">No tools found</h3>
          <p className="text-slate-500 dark:text-slate-400">Try searching for something else or browse categories.</p>
          <button 
            onClick={() => { setSearch(""); setActiveCategory("All"); }}
            className="text-primary font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      <AdPlaceholder className="mt-16" />
    </div>
  );
}
