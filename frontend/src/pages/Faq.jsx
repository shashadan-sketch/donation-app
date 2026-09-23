import React, { useState } from 'react';

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "Is SDN Donation a donation platform?", a: "Yes, SDN Donation is an online technology platform connecting donors with patients and educational causes in need." },
    { q: "How can I create a fundraiser to get donations on SDN Donation?", a: "Click on 'Start a Free Fundraiser', fill out the treatment and hospital information, and get approved within 2 hours." },
    { q: "I need donations urgently to raise funds for medical treatment. How does SDN Donation help?", a: "We provide an instant verified UPI QR setup, real-time donor receipts, and social campaign outreach assistance." },
    { q: "Is medical fundraising a good way to reduce my medical bills?", a: "Yes, community donations prevent families from borrowing high-interest medical loans or distress-selling assets." },
    { q: "Treatment expenses for which diseases can be covered?", a: "All medical conditions including Cancer care, Kidney and Liver Transplants, Heart surgeries, and NICU premature infant care." },
    { q: "What is the verification process for fundraiser approval?", a: "Our team validates doctor recommendations, hospital admission IDs, and estimated treatment bills directly." }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
        <div className="w-10 h-1 bg-emerald-600 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 divide-y divide-slate-100">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-5 cursor-pointer hover:bg-slate-50/60 transition-colors" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
            <div className="flex justify-between items-center gap-3">
              <span className="text-sm font-semibold text-slate-800">{faq.q}</span>
              <span className="text-emerald-600 font-bold text-xl">{openFaq === idx ? '−' : '+'}</span>
            </div>
            {openFaq === idx && (
              <p className="text-xs sm:text-sm text-slate-500 mt-2.5 leading-relaxed pt-2 border-t border-slate-50">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}