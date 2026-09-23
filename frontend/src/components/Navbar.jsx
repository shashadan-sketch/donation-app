import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-1.5 font-black text-2xl tracking-tight text-emerald-600"
        >
          <span className="text-3xl leading-none">+</span>
          <span>SDN <span className="text-slate-900 font-extrabold">Donation</span></span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <Link to="/causes" className="hover:text-emerald-600 transition-colors">Causes</Link>
          <Link to="/about" className="hover:text-emerald-600 transition-colors">About</Link>
          <Link to="/faqs" className="hover:text-emerald-600 transition-colors">FAQs</Link>
          <Link to="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link 
            to="/start-fundraiser" 
            className="text-xs sm:text-sm font-bold text-white bg-emerald-600 px-4 py-2 rounded-xl hover:bg-emerald-700 transition-all shadow-sm"
          >
            Start Fundraiser
          </Link>

          {/* 3 Dots / Hamburger Button for Mobile */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            <div className="space-y-1 w-5">
              <span className={`block h-0.5 bg-slate-800 rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 bg-slate-800 rounded transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-slate-800 rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-3 shadow-xl animate-fadeIn">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)} 
            className="block text-sm font-semibold text-slate-700 hover:text-emerald-600 py-1.5 border-b border-slate-50"
          >
            🏠 Home
          </Link>
          <Link 
            to="/causes" 
            onClick={() => setIsOpen(false)} 
            className="block text-sm font-semibold text-slate-700 hover:text-emerald-600 py-1.5 border-b border-slate-50"
          >
            🎗️ Causes
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsOpen(false)} 
            className="block text-sm font-semibold text-slate-700 hover:text-emerald-600 py-1.5 border-b border-slate-50"
          >
            ℹ️ About Us
          </Link>
          <Link 
            to="/faqs" 
            onClick={() => setIsOpen(false)} 
            className="block text-sm font-semibold text-slate-700 hover:text-emerald-600 py-1.5 border-b border-slate-50"
          >
            ❓ FAQs
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)} 
            className="block text-sm font-semibold text-slate-700 hover:text-emerald-600 py-1.5"
          >
            📞 Contact & Support
          </Link>
        </div>
      )}
    </header>
  );
}