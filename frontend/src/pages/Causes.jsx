import React from 'react';
import { Link } from 'react-router-dom';

export default function Causes() {
  const causesList = [
    { icon: "🎗️", title: "Cancer Treatment", raised: "₹2 Crore", desc: "Chemotherapy and surgical care for underprivileged patients." },
    { icon: "🫘", title: "Kidney Transplant", raised: "₹46 Lakh", desc: "Emergency organ transplant surgeries and lifelong immunosuppressants." },
    { icon: "❤️", title: "Open Heart Surgery", raised: "₹35 Lakh", desc: "Pediatric and adult cardiac bypass and arterial repairs." },
    { icon: "👶", title: "NICU Premature Care", raised: "₹25 Lakh", desc: "Critical incubator and ventilator life-support for newborns." },
    { icon: "🦴", title: "Bone Marrow Transplant", raised: "₹40 Lakh", desc: "Stem cell replacement for severe thalassemia and leukemia." },
    { icon: "🧠", title: "Brain & Spine Neuro Care", raised: "₹30 Lakh", desc: "Emergency trauma, stroke, and spinal restorative procedures." }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900">Explore Medical Causes</h2>
        <p className="text-sm text-slate-500 mt-2">Verified treatments requiring urgent community support</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {causesList.map((c, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-4xl p-3 bg-emerald-50 rounded-2xl inline-block">{c.icon}</span>
              <h3 className="font-bold text-slate-800 text-lg">{c.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">{c.raised} Max</span>
              <Link to="/" className="text-xs font-bold text-slate-700 hover:text-emerald-600">Donate Now →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}