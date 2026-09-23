import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      "Support SDN Donation - Emergency Medical Aid & Life Care Initiative. Please donate or share: " + window.location.origin
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-1.5 font-bold text-xl text-emerald-600 tracking-tight">
          <span className="text-2xl leading-none font-black text-emerald-600">+</span>
          <span className="text-slate-900 font-extrabold">SDN</span>
          <span>Donation</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <Link to="/causes" className="hover:text-emerald-600 transition-colors">Causes</Link>
          <Link to="/about" className="hover:text-emerald-600 transition-colors">About</Link>
          <Link to="/faqs" className="hover:text-emerald-600 transition-colors">FAQs</Link>
          <Link to="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
        </nav>

        {/* Action Buttons: WhatsApp Share & 3 Dots Menu */}
        <div className="flex items-center gap-2.5">
          
          {/* WhatsApp Share Button */}
          <button
            onClick={shareOnWhatsApp}
            title="Share on WhatsApp"
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            {/* WhatsApp SVG Icon */}
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* 3 Dots Menu Button */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
              title="More Pages"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </button>

            {/* 3 Dots Dropdown Menu */}
            {showMenu && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-sm font-medium animate-fade-in"
                onClick={() => setShowMenu(false)}
              >
                <Link to="/" className="block px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition">
                  🏠 Home
                </Link>
                <Link to="/causes" className="block px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition">
                  🎯 Causes
                </Link>
                <Link to="/about" className="block px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition">
                  ℹ️ About Us
                </Link>
                <Link to="/faqs" className="block px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition">
                  ❓ FAQs
                </Link>
                <Link to="/contact" className="block px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition">
                  📞 Contact
                </Link>
                <div className="border-t border-slate-100 my-1"></div>
                <Link to="/start-fundraiser" className="block px-4 py-2 text-emerald-600 font-bold hover:bg-emerald-50 transition">
                  ➕ Start Fundraiser
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}