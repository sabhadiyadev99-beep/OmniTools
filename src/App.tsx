import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Header, Footer } from "@/src/components/Layout";
import Home from "@/src/pages/Home";
import ToolDetailPage from "@/src/pages/ToolDetailPage";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-[#ffffff] dark:bg-[#020617] text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:category/:toolId" element={<ToolDetailPage />} />
              <Route path="/about" element={<SimplePage title="About Us" />} />
              <Route path="/privacy" element={<SimplePage title="Privacy Policy" />} />
              <Route path="/contact" element={<SimplePage title="Contact Us" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

function SimplePage({ title }: { title: string }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-8">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
      <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
        OmniTools was built to provide high-quality digital utilities for free. 
        Whether you're a creator looking for the perfect caption, a business owner needing 
        an invoice, or just someone looking for a secure password, we've got you covered.
      </p>
      <div className="pt-8">
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          ← Back to Tools
        </Link>
      </div>
    </div>
  );
}

