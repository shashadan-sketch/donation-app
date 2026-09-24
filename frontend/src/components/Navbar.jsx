import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/causes?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Main Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-base shadow-md shadow-emerald-500/20 group-hover:scale-105 transition transform">
                S
              </span>
              <span className="font-black text-slate-900 text-lg tracking-tight">
                SDN<span className="text-emerald-600">Donation</span>
              </span>
            </Link>

            {/* Home & Causes on top navbar */}
            <div className="hidden sm:flex items-center gap-2">
              <Link 
                to="/" 
                className="text-xs font-bold text-slate-700 hover:text-emerald-600 transition px-3 py-2 rounded-xl hover:bg-emerald-50/60"
              >
                Home
              </Link>
              <Link 
                to="/causes" 
                className="text-xs font-bold text-slate-700 hover:text-emerald-600 transition px-3 py-2 rounded-xl hover:bg-emerald-50/60"
              >
                Causes
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs sm:max-w-sm">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patient, hospital..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100/80 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition"
              />
              <span className="absolute left-3 top-2.5 text-xs text-slate-400 pointer-events-none">
                🔍
              </span>
            </form>
          </div>

          {/* Right Action & Stylized Menu */}
          <div className="flex items-center gap-3">
            <Link 
              to="/start-fundraiser" 
              className="hidden sm:inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition transform active:scale-95"
            >
              Start Fundraiser
            </Link>

            {/* Stylized Pill Menu Button */}
            <div className="relative">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition shadow-sm ${
                  menuOpen 
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700 ring-2 ring-emerald-500/20" 
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {/* 2-line mini indicator */}
                <div className="flex flex-col gap-1 items-end justify-center w-3.5">
                  <span className={`h-0.5 rounded-full bg-current transition-all ${menuOpen ? "w-3.5 rotate-45 translate-y-1.5" : "w-3.5"}`}></span>
                  <span className={`h-0.5 rounded-full bg-current transition-all ${menuOpen ? "opacity-0" : "w-2"}`}></span>
                  <span className={`h-0.5 rounded-full bg-current transition-all ${menuOpen ? "w-3.5 -rotate-45 -translate-y-1.5" : "w-3"}`}></span>
                </div>
                <span className="text-xs font-bold tracking-tight">More</span>
              </button>

              {/* Styled Dropdown Panel */}
              {menuOpen && (
                <div 
                  className="absolute right-0 mt-2.5 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Quick Navigation
                  </div>
                  
                  <Link 
                    to="/about" 
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition"
                  >
                    <span>ℹ️</span> About Us
                  </Link>
                  <Link 
                    to="/faqs" 
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition"
                  >
                    <span>❓</span> FAQs
                  </Link>
                  <Link 
                    to="/contact" 
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition"
                  >
                    <span>📞</span> Contact Support
                  </Link>
                  
                  <div className="border-t border-slate-100 my-1.5"></div>
                  
                  <Link 
                    to="/start-fundraiser" 
                    className="flex sm:hidden items-center gap-2 px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 rounded-xl transition"
                  >
                    <span>➕</span> Start Fundraiser
                  </Link>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </nav>
  );
}