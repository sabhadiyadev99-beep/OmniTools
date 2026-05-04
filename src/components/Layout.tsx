import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/src/lib/utils";
import { Wrench, Menu, X, Github, Twitter, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 py-3" 
        : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Wrench size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Omni<span className="text-primary">Tools</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Tools</Link>
          <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Contact</Link>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
          <ThemeToggle />
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] bg-white dark:bg-slate-950 z-40 md:hidden p-6 space-y-6">
          <nav className="flex flex-col gap-6 text-lg font-bold">
            <Link to="/">Tools</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 py-20 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1 space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <Wrench size={18} />
            </div>
            <span className="text-lg font-bold">OmniTools</span>
          </Link>
          <p className="text-sm text-slate-500 leading-relaxed">
            Helping creators and businesses streamline their digital existence with 20+ professional-grade online tools.
          </p>
          <div className="flex gap-4">
             <a href="#" className="p-2 rounded-lg bg-white dark:bg-slate-900 text-slate-400 hover:text-primary transition-colors"><Twitter size={18} /></a>
             <a href="#" className="p-2 rounded-lg bg-white dark:bg-slate-900 text-slate-400 hover:text-primary transition-colors"><Mail size={18} /></a>
             <a href="#" className="p-2 rounded-lg bg-white dark:bg-slate-900 text-slate-400 hover:text-primary transition-colors"><Github size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6">Tools</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link to="/creator/instagram-caption-generator" className="hover:text-primary">Caption Generator</Link></li>
            <li><Link to="/business/invoice-builder" className="hover:text-primary">Invoice Builder</Link></li>
            <li><Link to="/utility/qr-code-generator" className="hover:text-primary">QR Code Generator</Link></li>
            <li><Link to="/utility/password-generator" className="hover:text-primary">Secure Passwords</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/about" className="hover:text-primary">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold">Subscribe</h4>
          <p className="text-sm text-slate-500">Get notified when we release new free tools.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-sm outline-none focus:ring-1 ring-primary"
            />
            <button className="px-4 py-3 bg-primary text-white rounded-xl text-sm font-bold">Join</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between gap-4 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} OmniTools. All rights reserved.</p>
        <p>Built with Gemini AI & Love.</p>
      </div>
    </footer>
  );
}
