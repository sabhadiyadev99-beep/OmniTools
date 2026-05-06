import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { Wrench, Menu, X, Github, Twitter, Mail, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
        <Link to="/" className="flex items-center group">
          <img 
            src="https://ratty-amber-w22xwlu7wn.edgeone.app/Screenshot%202026-05-06%20124816-Photoroom-Picsart-AiImageEnhancer-Picsart-AiImageEnhancer.png" 
            alt="ToolVanta Logo" 
            className="h-12 md:h-16 w-auto group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <div className="relative group min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search tools..."
              onFocus={() => {
                // If on homepage, focus the main search
                if (location.pathname === "/") {
                  document.querySelector('input[placeholder*="Search 20+ tools"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  (document.querySelector('input[placeholder*="Search 20+ tools"]') as HTMLInputElement)?.focus();
                } else {
                  // Redirect to home with search param if I want, but for now just link to home
                }
              }}
              onChange={(e) => {
                 const value = e.target.value;
                 if (location.pathname !== "/") {
                   navigate(`/?search=${encodeURIComponent(value)}`);
                 } else {
                   // If on home, we can also update the global search state if we had access to it, 
                   // but Home.tsx uses local state. For now, since focus is redirected on focus, 
                   // this part is mostly for when typing starts.
                   const mainSearch = document.querySelector('input[placeholder*="Search 20+ tools"]') as HTMLInputElement;
                   if (mainSearch) {
                     mainSearch.value = value;
                     mainSearch.dispatchEvent(new Event('input', { bubbles: true }));
                     mainSearch.focus();
                   }
                 }
              }}
              onClick={() => {
                if (location.pathname !== "/") {
                  navigate("/?search=");
                }
              }}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
            />
          </div>
          <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Tools</Link>
          <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">About</Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
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
        <div className="fixed inset-0 top-[65px] bg-white dark:bg-slate-950 z-40 md:hidden p-6 space-y-8 animate-in slide-in-from-top duration-300">
          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search tools..."
              onChange={(e) => {
                navigate(`/?search=${encodeURIComponent(e.target.value)}`);
              }}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary text-slate-900 dark:text-white outline-none text-sm placeholder:text-slate-500"
            />
          </div>
          <nav className="flex flex-col gap-6 text-xl font-bold">
            <Link to="/" className="text-slate-900 dark:text-white">Explore Tools</Link>
            <Link to="/about" className="text-slate-900 dark:text-white">About Us</Link>
            <Link to="/contact" className="text-slate-900 dark:text-white">Contact</Link>
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
          <Link to="/" className="flex items-center">
            <img src="https://ratty-amber-w22xwlu7wn.edgeone.app/Screenshot%202026-05-06%20124816-Photoroom-Picsart-AiImageEnhancer-Picsart-AiImageEnhancer.png" alt="ToolVanta Logo" className="h-12 w-auto" />
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
        <p>© {new Date().getFullYear()} ToolVanta. All rights reserved.</p>
        <p>Built with Gemini AI & Love.</p>
      </div>
    </footer>
  );
}
