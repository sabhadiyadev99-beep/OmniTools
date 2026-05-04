import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-xl transition-all duration-300",
        "bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-primary/50",
        "text-slate-600 dark:text-slate-300"
      )}
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
