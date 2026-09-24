import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Mission Banner */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            About Our Mission
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            SDN Donation Platform
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
            SDN Donation is a dedicated medical relief initiative designed to ensure no critical surgery or emergency treatment is delayed due to a lack of financial support.
          </p>

          {/* Highlights */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center border-t border-slate-100 pt-8">
            <div>
              <div className="text-2xl font-black text-emerald-600">100%</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Direct to Hospital</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">0%</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Platform Fee</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">Instant</div>
              <div className="text-xs font-medium text-slate-500 mt-1">PDF Tax Receipt</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">24/7</div>
              <div className="text-xs font-medium text-slate-500 mt-1">Medical Support</div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
              🛡️
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Verified Documents</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every patient undergoes strict KYC and hospital doctor consultation before any campaign goes live.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
              ⚡
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Instant UPI Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Donations are linked with 12-digit UTR verification ensuring absolute transparency for every rupee given.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
              🤝
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Community First</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Empowering families in critical medical emergencies with transparent social-sharing tools.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}