import QRCode from "react-qr-code";
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [showQr, setShowQr] = useState(false);
  const goal = 100000;
  const collected = 45000;
  const progress = Math.min((collected / goal) * 100, 100);

  const presetAmounts = [1, 500, 1000, 2500];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePresetSelect = (val) => {
    setFormData({ ...formData, amount: val });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.amount) {
      alert("Please fill all details");
      return;
    }
    setShowQr(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-2 border border-blue-200">
            Active Campaign
          </span>
          <h1 className="text-2xl font-bold text-slate-800">Support Student Welfare</h1>
          <p className="text-slate-500 text-sm mt-1">
            Help provide digital learning resources to underprivileged students.
          </p>
        </div>

        {/* Campaign Progress */}
        <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
            <span>₹{collected.toLocaleString()} raised</span>
            <span className="text-slate-400">Target: ₹{goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Feedback Alert */}
        {statusMessage.text && (
          <div
            className={`p-3 rounded-lg text-sm mb-4 text-center font-medium ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
    Phone Number
  </label>
  <input
    type="tel"
    name="phone"
    required
    value={formData.phone || ''}
    onChange={handleChange}
    placeholder="Enter 10-digit mobile number"
    pattern="[0-9]{10}"
    maxLength="10"
    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
  />
</div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
              Amount (INR)
            </label>
            
            <div className="grid grid-cols-4 gap-2 mb-2">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePresetSelect(amt)}
                  className={`py-1.5 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                    Number(formData.amount) === amt
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                name="amount"
                min="1"
                required
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter custom amount"
                className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 mt-2 cursor-pointer"
          >
            {loading ? 'Opening Gateway...' : `Donate ₹${formData.amount || '0'}`}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-4">
          🔒 Secure UPI payment powered by QR code
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-500 mt-4 border-t border-slate-200 pt-3">
          <a href="/about.html" target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline">About Us</a>
          <span>•</span>
          <a href="/contact.html" target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline">Contact Us</a>
          <span>•</span>
          <a href="/terms.html" target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline">Terms</a>
          <span>•</span>
          <a href="/privacy.html" target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline">Privacy</a>
        </div>
      </div>

      {/* UPI QR Modal */}
      {showQr && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#ffffff',
            padding: '24px',
            borderRadius: '16px',
            textAlign: 'center',
            maxWidth: '340px',
            width: '90%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold', color: '#111' }}>
              Scan to Pay with UPI
            </h3>
            <p style={{ margin: '0 0 16px 0', color: '#555', fontSize: '14px' }}>
              Paying <strong>₹{formData.amount}</strong> to <strong>SDN SHAIKHh</strong>
            </p>

            <div style={{ background: '#fff', padding: '12px', display: 'inline-block', border: '1px solid #eee', borderRadius: '12px' }}>
              <QRCode 
                value={`upi://pay?pa=sdnsheikh375@okhdfcbank&pn=SDN%20SHAIKHh&am=${formData.amount}&cu=INR`} 
                size={190} 
              />
            </div>

            <p style={{ marginTop: '12px', fontSize: '12px', color: '#666', wordBreak: 'break-all' }}>
              UPI ID: <strong>sdnsheikh375@okhdfcbank</strong>
            </p>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  alert('Thank you! Payment completed.');
                  setShowQr(false);
                }}
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Payment Done
              </button>

              <button
                type="button"
                onClick={() => setShowQr(false)}
                style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}