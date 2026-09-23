import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1.5 font-black text-2xl tracking-tight text-emerald-600">
          <span className="text-3xl leading-none">+</span>
          <span>SDN <span className="text-slate-900 font-extrabold">Donation</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <Link to="/causes" className="hover:text-emerald-600 transition-colors">Causes</Link>
          <Link to="/about" className="hover:text-emerald-600 transition-colors">About</Link>
          <Link to="/faqs" className="hover:text-emerald-600 transition-colors">FAQs</Link>
          <Link to="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
        </nav>
        <Link 
          to="/start-fundraiser" 
          className="text-xs sm:text-sm font-bold text-white bg-emerald-600 px-4 py-2 rounded-xl hover:bg-emerald-700 transition-all shadow-sm"
        >
          Start Fundraiser
        </Link>
      </div>
    </header>
  );
}