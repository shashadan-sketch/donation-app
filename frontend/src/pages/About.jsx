import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Who We Are
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">About SDN Donation</h2>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
          India's dedicated healthcare crowdfunding platform connecting compassionate donors with critically ill patients in need of emergency funding.
        </p>
      </div>

      {/* Main Mission Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <h3 className="text-xl font-bold text-slate-900">Transforming Healthcare Financing</h3>
          <p>
            In India, medical emergencies are among the primary causes pushing working-class families into debt traps. SDN Donation was created as a zero-fee technological solution to this crisis.
          </p>
          <p>
            By leveraging real-time UPI payment channels and strict 12-digit bank UTR audit trails, we ensure that every single rupee contributed reaches the hospital or the patient's verified account without hidden deductions.
          </p>
          <div className="pt-2">
            <Link to="/causes" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">
              Browse Active Causes →
            </Link>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-inner h-64 sm:h-80">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" 
            alt="Doctor caring for patient" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Key Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <span className="text-3xl p-3 bg-emerald-50 rounded-2xl inline-block">🤝</span>
          <h4 className="font-bold text-slate-900 text-base">0% Platform Fee</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Unlike commercial portals taking 5% to 8% cuts, we do not charge commissions on donations.
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <span className="text-3xl p-3 bg-emerald-50 rounded-2xl inline-block">📋</span>
          <h4 className="font-bold text-slate-900 text-base">Direct Document Audit</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every case is verified against official hospital estimates, doctor notes, and identity documents.
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <span className="text-3xl p-3 bg-emerald-50 rounded-2xl inline-block">📑</span>
          <h4 className="font-bold text-slate-900 text-base">80G Tax Deductions</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Eligible donors receive immediate digitally generated tax receipts for statutory deduction benefits.
          </p>
        </div>
      </div>

      {/* Fund Utilization Breakdown */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold">100% Financial Transparency</h3>
          <p className="text-xs text-slate-400">Where does every contributed rupee go?</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center pt-4">
          <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
            <span className="text-3xl font-black text-emerald-400">92%</span>
            <h5 className="font-bold text-sm mt-1">Direct Medical & Hospital Bills</h5>
            <p className="text-[11px] text-slate-400 mt-1">Direct payment to hospitals for medicines, surgeries & ICU care.</p>
          </div>
          <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
            <span className="text-3xl font-black text-emerald-400">5%</span>
            <h5 className="font-bold text-sm mt-1">Patient Post-Care & Medicine</h5>
            <p className="text-[11px] text-slate-400 mt-1">Follow-up rehabilitation and prescribed maintenance medication.</p>
          </div>
          <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
            <span className="text-3xl font-black text-emerald-400">3%</span>
            <h5 className="font-bold text-sm mt-1">Technology & Hosting</h5>
            <p className="text-[11px] text-slate-400 mt-1">Platform servers, UPI gateways, and SMS alert operations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}