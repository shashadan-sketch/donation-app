import React, { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900">Get in Touch / Request Callback</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Our support specialists are available 24/7 to assist you.</p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <span className="text-4xl">📞</span>
            <h3 className="text-base font-bold text-emerald-800">Callback Request Registered</h3>
            <p className="text-xs text-emerald-600">Our campaign advisor will call you within 15 minutes.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Your Name</label>
              <input type="text" required placeholder="Enter full name" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Phone Number</label>
              <input type="tel" maxLength="10" required placeholder="Enter 10-digit mobile number" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Query or Concern</label>
              <textarea rows="3" required placeholder="How can our support team assist you?" className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"></textarea>
            </div>
            <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-sm">
              Request An Instant Callback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}