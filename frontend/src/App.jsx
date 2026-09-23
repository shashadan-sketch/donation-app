import QRCode from "react-qr-code";
import React, { useState } from 'react';
import jsPDF from 'jspdf';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const goal = 100000;
  const collected = 45000;
  const progress = Math.min((collected / goal) * 100, 100);

  const presetAmounts = [100, 500, 1000, 2500];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePresetSelect = (val) => {
    setFormData({ ...formData, amount: val });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.amount) {
      alert("Please fill all details");
      return;
    }
    setShowQr(true);
  };

  const handlePaymentComplete = () => {
    const transactionDetails = {
      receiptNo: `REC-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      donorName: formData.name,
      phone: formData.phone,
      amount: formData.amount,
      upiId: 'sdnsheikh375@okhdfcbank'
    };

    setReceiptData(transactionDetails);
    setShowQr(false);
    setShowReceiptModal(true);
  };

  const downloadReceiptPDF = () => {
    if (!receiptData) return;

    const doc = new jsPDF();

    doc.setDrawColor(200, 200, 200);
    doc.rect(10, 10, 190, 277);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.text("DONATION ACKNOWLEDGEMENT", 105, 28, { align: "center" });

    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "normal");
    doc.text("Empower Underprivileged Students - Digital Learning Initiative", 105, 36, { align: "center" });

    doc.setDrawColor(226, 232, 240);
    doc.line(20, 42, 190, 42);

    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(`Receipt No: ${receiptData.receiptNo}`, 20, 52);
    doc.text(`Date: ${receiptData.date}`, 145, 52);

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, 60, 170, 75, 4, 4, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text("Contribution Summary", 30, 72);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    doc.text("Donor Name:", 30, 85);
    doc.setFont("helvetica", "bold");
    doc.text(`${receiptData.donorName}`, 75, 85);

    doc.setFont("helvetica", "normal");
    doc.text("Contact Number:", 30, 95);
    doc.setFont("helvetica", "bold");
    doc.text(`${receiptData.phone}`, 75, 95);

    doc.setFont("helvetica", "normal");
    doc.text("Amount Contributed:", 30, 105);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 101, 52);
    doc.text(`INR ${receiptData.amount}/-`, 75, 105);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    doc.text("Paid to UPI ID:", 30, 115);
    doc.text(`${receiptData.upiId}`, 75, 115);

    doc.line(20, 145, 190, 145);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("Tax Exemption & Notice:", 20, 158);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 116, 139);
    doc.text("1. Thank you for supporting student digital literacy. Your support aids device funding & access.", 20, 166);
    doc.text("2. Eligible for deductions under 80G as per government regulations.", 20, 174);
    doc.text("3. This is a computer generated acknowledgement slip and does not require a physical signature.", 20, 182);

    doc.setDrawColor(226, 232, 240);
    doc.line(20, 250, 190, 250);
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text("Student Welfare Digital Initiative • Verified Campaign", 105, 260, { align: "center" });

    doc.save(`Donation_Receipt_${receiptData.receiptNo}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-6">
          <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden shadow-inner group">
            <img 
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80" 
              alt="Students studying" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
              Verified Non-Profit Cause
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-xl text-white">
              <span className="text-xs bg-emerald-500/90 text-white px-2 py-0.5 rounded font-medium">80G Tax Exemption</span>
              <p className="text-xs text-slate-200 mt-1">Donations are 50% tax deductible under section 80G</p>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Empower Underprivileged Students with Digital Learning Tools
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
              Education is the key to breaking the cycle of poverty. With your support, we provide essential study tablets, high-speed internet connectivity, and quality online learning subscriptions to meritorious students from disadvantaged backgrounds.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-slate-50">
              <span className="text-2xl">🛡️</span>
              <div>
                <h4 className="text-xs font-bold text-slate-800">100% Direct</h4>
                <p className="text-[11px] text-slate-500 leading-tight">Zero middlemen</p>
              </div>
            </div>
            <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-slate-50">
              <span className="text-2xl">⚡</span>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Instant UPI</h4>
                <p className="text-[11px] text-slate-500 leading-tight">Real-time credit</p>
              </div>
            </div>
            <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-slate-50">
              <span className="text-2xl">🤝</span>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Transparency</h4>
                <p className="text-[11px] text-slate-500 leading-tight">Receipt proof</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2 overflow-hidden">
                <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-blue-400 text-white font-bold text-xs flex items-center justify-center">S</span>
                <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-indigo-500 text-white font-bold text-xs flex items-center justify-center">A</span>
                <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">M</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                Joined by <strong className="text-slate-900 font-semibold">120+ active donors</strong> this week
              </p>
            </div>
            <span className="text-xs font-semibold text-blue-700">#EducationForAll</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 sticky top-6">
          <div className="text-center mb-5">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-2 border border-blue-200">
              Active Campaign
            </span>
            <h2 className="text-xl font-bold text-slate-800">Support Student Welfare</h2>
            <p className="text-slate-500 text-xs mt-1">
              Choose an amount to make an immediate impact
            </p>
          </div>

          <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
            <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-700 mb-2">
              <span className="text-blue-600 font-bold">₹{collected.toLocaleString()} raised</span>
              <span className="text-slate-400 font-normal">Target: ₹{goal.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1 tracking-wide">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
                pattern="[0-9]{10}"
                maxLength="10"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5 tracking-wide">
                Select or Enter Amount (INR)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2.5">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handlePresetSelect(amt)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      Number(formData.amount) === amt
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
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
                  className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 disabled:opacity-50 mt-3 cursor-pointer active:scale-[0.99]"
            >
              {loading ? 'Opening Gateway...' : `Donate ₹${formData.amount || '0'}`}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
            🔒 Secure UPI payment powered by QR code
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-400 mt-4 border-t border-slate-100 pt-3">
            <a href="/about.html" target="_blank" rel="noreferrer" className="hover:text-blue-600">About Us</a>
            <span>•</span>
            <a href="/contact.html" target="_blank" rel="noreferrer" className="hover:text-blue-600">Contact Us</a>
            <span>•</span>
            <a href="/terms.html" target="_blank" rel="noreferrer" className="hover:text-blue-600">Terms</a>
            <span>•</span>
            <a href="/privacy.html" target="_blank" rel="noreferrer" className="hover:text-blue-600">Privacy</a>
          </div>
        </div>
      </div>

      {/* UPI QR Modal */}
      {showQr && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#ffffff',
            padding: '24px',
            borderRadius: '20px',
            textAlign: 'center',
            maxWidth: '340px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>
              Scan to Pay with UPI
            </h3>
            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '13px' }}>
              Paying <strong style={{ color: '#0f172a' }}>₹{formData.amount}</strong> to <strong>SDN SHAIKHh</strong>
            </p>

            <div style={{ background: '#fff', padding: '12px', display: 'inline-block', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
              <QRCode 
                value={`upi://pay?pa=sdnsheikh375@okhdfcbank&pn=SDN%20SHAIKHh&am=${formData.amount}&cu=INR`} 
                size={190} 
              />
            </div>

            <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b', wordBreak: 'break-all' }}>
              UPI ID: <strong style={{ color: '#0f172a' }}>sdnsheikh375@okhdfcbank</strong>
            </p>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={handlePaymentComplete}
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '10px',
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
                  background: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Acknowledgement / Receipt Modal */}
      {showReceiptModal && receiptData && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div className="bg-white p-6 sm:p-8 rounded-3xl max-w-md w-full mx-4 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm">
              ✓
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800">Thank You, {receiptData.donorName}!</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Your donation of <strong className="text-slate-800">₹{receiptData.amount}</strong> has been acknowledged.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left text-xs space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Receipt Number:</span>
                <span className="font-semibold text-slate-800">{receiptData.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-semibold text-slate-800">{receiptData.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <span className="font-semibold text-slate-800">{receiptData.phone}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-medium text-slate-800">
                <span>Amount:</span>
                <span className="text-emerald-600 font-bold text-sm">₹{receiptData.amount}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={downloadReceiptPDF}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>📥</span> Download Receipt (PDF)
              </button>
              <button
                type="button"
                onClick={() => setShowReceiptModal(false)}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}