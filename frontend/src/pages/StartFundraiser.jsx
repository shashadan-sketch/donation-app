import React, { useState } from 'react';

export default function StartFundraiser() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    hospitalName: '',
    medicalCondition: '',
    targetAmount: '',
    city: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Zero Platform Fee
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Start a Fundraiser on SDN Donation
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Submit patient details. Our team will verify medical reports within 2-4 hours.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Application Submitted Successfully!</h3>
            <p className="mt-2 text-sm text-slate-600">
              Our verification officer will call you on <strong>{formData.phone}</strong> for hospital report validation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Patient Full Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Mohd Rashid" 
                  value={formData.patientName}
                  onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Contact Phone Number *
                </label>
                <input 
                  type="tel" 
                  required
                  placeholder="+91 98765 43210" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Hospital Name & Branch *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Apollo Hospital, Delhi" 
                  value={formData.hospitalName}
                  onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Target Amount Needed (₹) *
                </label>
                <input 
                  type="number" 
                  required
                  placeholder="500000" 
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Medical Condition / Treatment Details *
              </label>
              <textarea 
                rows="3"
                required
                placeholder="Explain the patient's illness, surgery requirement, and why urgent funds are needed..."
                value={formData.medicalCondition}
                onChange={(e) => setFormData({...formData, medicalCondition: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm transition shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              Submit Fundraiser Request
            </button>
          </form>
        )}

      </div>
    </div>
  );
}