import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1b1c19] text-white pt-12 pb-16 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 max-w-md mx-auto text-center space-y-4">
          <h4 className="text-sm font-bold text-white tracking-wide">Join The SDN Community</h4>
          <div className="flex items-center bg-white rounded-xl p-1 shadow-inner">
            <input 
              type="email" 
              placeholder="Email Id" 
              className="w-full px-3 py-1.5 text-xs text-slate-800 outline-none rounded-l-xl"
            />
            <button 
              type="button" 
              className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all"
            >
              Subscribe
            </button>
          </div>
          <div>
            <p className="text-xs text-slate-300 font-medium mb-2.5">Follow us</p>
            <div className="flex justify-center items-center gap-4 text-base text-slate-300">
              <span className="cursor-pointer hover:text-emerald-400">💬</span>
              <span className="cursor-pointer hover:text-emerald-400">📘</span>
              <span className="cursor-pointer hover:text-emerald-400">▶️</span>
              <span className="cursor-pointer hover:text-emerald-400">💼</span>
              <span className="cursor-pointer hover:text-emerald-400">🐦</span>
              <span className="cursor-pointer hover:text-emerald-400">📷</span>
            </div>
          </div>
        </div>

        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-1.5 font-black text-xl text-emerald-400">
            <span>+</span>
            <span>SDN <span className="text-white">Donation</span></span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            SDN Donation is an online technology platform connecting donors and donees. We do not provide any financial return in any form whatsoever.
          </p>
          <div className="flex justify-center gap-4 text-[11px] text-slate-400 underline">
            <Link to="/about" className="hover:text-emerald-400">About Us</Link>
            <Link to="/faqs" className="hover:text-emerald-400">FAQs</Link>
            <Link to="/contact" className="hover:text-emerald-400">Contact</Link>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 flex flex-wrap items-center justify-around gap-2 text-slate-700 text-xs font-black tracking-wider">
          <span className="text-blue-900">VISA</span>
          <span className="text-red-600">mastercard</span>
          <span className="text-blue-600">AMERICAN EXPRESS</span>
          <span className="text-sky-500 font-bold">Paytm</span>
          <span className="text-emerald-700 font-extrabold">UPI</span>
          <span className="text-slate-600 font-semibold">RTGS / NEFT</span>
        </div>
      </div>
    </footer>
  );
}