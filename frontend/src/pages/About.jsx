import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-extrabold text-slate-900">About SDN Donation</h2>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Empowering families with transparent, zero-fee crowdfunding for critical healthcare interventions.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 leading-relaxed text-sm text-slate-600">
        <h3 className="text-lg font-bold text-slate-900">Our Core Mission</h3>
        <p>
          SDN Donation was established to bridge the gap between expensive hospital procedures and financial vulnerability. In India, thousands of families enter poverty due to unexpected catastrophic illnesses.
        </p>
        <p>
          We offer an audited, peer-to-peer technology infrastructure where donors can directly contribute via secure UPI, verify their payments through 12-digit UTR reconciliation, and receive authenticated 80G tax acknowledgements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-emerald-50/60 border border-emerald-100 p-6 rounded-2xl">
          <h4 className="text-2xl font-black text-emerald-700">0%</h4>
          <p className="text-xs text-slate-600 mt-1 font-semibold">Platform Fee Charged</p>
        </div>
        <div className="bg-emerald-50/60 border border-emerald-100 p-6 rounded-2xl">
          <h4 className="text-2xl font-black text-emerald-700">100%</h4>
          <p className="text-xs text-slate-600 mt-1 font-semibold">Bank UTR Verified</p>
        </div>
        <div className="bg-emerald-50/60 border border-emerald-100 p-6 rounded-2xl">
          <h4 className="text-2xl font-black text-emerald-700">24x7</h4>
          <p className="text-xs text-slate-600 mt-1 font-semibold">Support Desk</p>
        </div>
      </div>
    </div>
  );
}