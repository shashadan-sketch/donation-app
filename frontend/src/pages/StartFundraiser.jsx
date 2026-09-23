import React, { useState } from 'react';

export default function StartFundraiser() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100">
        <h2 className="text-2xl font-extrabold text-slate-900 text-center">Start a Free Medical Fundraiser</h2>
        <p className="text-xs sm:text-sm text-slate-500 text-center mt-1 mb-8">
          Fill in the details to receive instant medical financial support with 0% platform fee.
        </p>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <span className="text-4xl">🎉</span>
            <h3 className="text-lg font-bold text-emerald-800">Fundraiser Submitted!</h3>
            <p className="text-xs text-emerald-600">Our medical verification desk will review your documents and contact you within 2 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Patient Full Name</label>
              <input type="text" required placeholder="e.g. Ishant Gupta" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Medical Condition / Ailment</label>
              <input type="text" required placeholder="e.g. Cancer Treatment / Kidney Transplant" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Hospital & City Name</label>
              <input type="text" required placeholder="e.g. Apollo Hospital, Mumbai" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Target Amount Needed (INR)</label>
              <input type="number" required placeholder="e.g. 500000" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Contact Mobile Number</label>
              <input type="tel" maxLength="10" required placeholder="10-digit number" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer">
              Submit Fundraiser Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}