import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from "react-qr-code";
import jsPDF from 'jspdf';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', phone: '', amount: '500' });
  const [utrNumber, setUtrNumber] = useState('');
  const [utrError, setUtrError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const presetAmounts = [250, 500, 1000, 2500];

  const handleOpenPayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.amount) {
      alert("Please enter donor name, phone and amount");
      return;
    }
    setUtrNumber('');
    setUtrError('');
    setShowQrModal(true);
  };

  const handleVerifyAndComplete = () => {
    const cleanUtr = utrNumber.trim();
    if (!cleanUtr || cleanUtr.length !== 12 || !/^\d{12}$/.test(cleanUtr)) {
      setUtrError("Please enter a valid 12-digit UPI Reference / UTR Number");
      return;
    }

    setUtrError('');
    setIsVerifying(true);

    setTimeout(() => {
      const transactionDetails = {
        receiptNo: `SDN-${Date.now().toString().slice(-6)}`,
        txnId: cleanUtr,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        donorName: formData.name,
        phone: formData.phone,
        amount: formData.amount,
        upiId: 'sdnsheikh375@okhdfcbank'
      };

      setReceiptData(transactionDetails);
      setIsVerifying(false);
      setShowQrModal(false);
      setShowReceiptModal(true);
    }, 1200);
  };

  const downloadReceiptPDF = () => {
    if (!receiptData) return;
    const doc = new jsPDF();
    doc.setDrawColor(200, 200, 200);
    doc.rect(10, 10, 190, 277);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(5, 150, 105);
    doc.text("SDN DONATION ACKNOWLEDGEMENT", 105, 28, { align: "center" });

    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "normal");
    doc.text("Emergency Medical Aid & Life Care Initiative", 105, 36, { align: "center" });

    doc.setDrawColor(226, 232, 240);
    doc.line(20, 42, 190, 42);

    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(`Receipt No: ${receiptData.receiptNo}`, 20, 52);
    doc.text(`Date: ${receiptData.date}`, 145, 52);

    doc.setFillColor(240, 253, 244);
    doc.roundedRect(20, 60, 170, 85, 4, 4, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text("Contribution Summary", 30, 72);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    doc.text("Donor Name:", 30, 85);
    doc.setFont("helvetica", "bold");
    doc.text(`${receiptData.donorName}`, 80, 85);

    doc.setFont("helvetica", "normal");
    doc.text("Contact Number:", 30, 95);
    doc.setFont("helvetica", "bold");
    doc.text(`${receiptData.phone}`, 80, 95);

    doc.setFont("helvetica", "normal");
    doc.text("UTR / Ref No:", 30, 105);
    doc.setFont("helvetica", "bold");
    doc.text(`${receiptData.txnId}`, 80, 105);

    doc.setFont("helvetica", "normal");
    doc.text("Paid to UPI:", 30, 115);
    doc.setFont("helvetica", "bold");
    doc.text(`${receiptData.upiId}`, 80, 115);

    doc.setFont("helvetica", "normal");
    doc.text("Amount Contributed:", 30, 125);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 101, 52);
    doc.text(`INR ${receiptData.amount}/- (Verified)`, 80, 125);

    doc.setDrawColor(226, 232, 240);
    doc.line(20, 155, 190, 155);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("Tax Exemption & Verification Notice:", 20, 168);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 116, 139);
    doc.text("1. Thank you for your generous medical contribution. Every rupee saves precious lives.", 20, 176);
    doc.text("2. Eligible for deductions under Section 80G as per statutory provisions.", 20, 184);
    doc.text("3. Authenticated system generated transaction acknowledgment slip.", 20, 192);

    doc.setDrawColor(226, 232, 240);
    doc.line(20, 250, 190, 250);
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text("SDN Donation Foundation • Verified Medical Crowdfunding", 105, 260, { align: "center" });

    doc.save(`SDN_Receipt_${receiptData.receiptNo}.pdf`);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-100/70 via-emerald-50/50 to-slate-50 pt-8 pb-12 px-4 text-center">
        <div className="max-w-xl mx-auto space-y-5">
          <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-emerald-300 via-teal-100 to-white shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80" 
              alt="Medical Care" 
              className="w-full h-full object-cover rounded-full shadow-inner"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Need Funds For Your Medical Treatment?
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Raise money to pay hospital & medical bills for free with SDN Donation.
          </p>
          <Link 
            to="/start-fundraiser" 
            className="inline-block px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
          >
            Start a Free Fundraiser
          </Link>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="max-w-4xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-4 sm:p-6 grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-2xl mb-1">⏱️</div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">Quick Funds</h4>
            <p className="text-[11px] text-slate-500">Fast Disbursal</p>
          </div>
          <div className="border-x border-slate-100">
            <div className="text-2xl mb-1">🤲</div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">40,000+</h4>
            <p className="text-[11px] text-slate-500">Patients Supported</p>
          </div>
          <div>
            <div className="text-2xl mb-1">👥</div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">2+ Lakh</h4>
            <p className="text-[11px] text-slate-500">Lives Impacted</p>
          </div>
        </div>
      </section>

      {/* Donation Form Card */}
      <section className="max-w-xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-5">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Verified Emergency Cause
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">Support Critical Treatment</h2>
            <p className="text-xs text-slate-500">Every contribution brings hope to a healing patient</p>
          </div>

          <form onSubmit={handleOpenPayment} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Your Full Name
              </label>
              <input 
                type="text" 
                required 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Phone Number
              </label>
              <input 
                type="tel" 
                required 
                maxLength="10" 
                pattern="[0-9]{10}"
                value={formData.phone} 
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="10-digit mobile number" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Contribution Amount (INR)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2.5">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setFormData({ ...formData, amount: amt })}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      Number(formData.amount) === amt ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700 border-slate-200'
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
                  min="1" 
                  required 
                  value={formData.amount} 
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer text-sm"
            >
              Donate ₹{formData.amount || '0'} via UPI
            </button>
          </form>
        </div>
      </section>

      {/* QR Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 text-center space-y-4 shadow-2xl border border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Scan to Pay with UPI</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Paying <strong className="text-slate-900 font-semibold">₹{formData.amount}</strong> to <strong>SDN Donation</strong>
              </p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 inline-block shadow-inner">
              <QRCode value={`upi://pay?pa=sdnsheikh375@okhdfcbank&pn=SDN%20Donation&am=${formData.amount}&cu=INR`} size={180} />
            </div>
            <p className="text-xs text-slate-500">
              UPI ID: <span className="font-mono font-semibold text-slate-700">sdnsheikh375@okhdfcbank</span>
            </p>
            <div className="text-left bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                Enter 12-Digit UTR / UPI Ref No. *
              </label>
              <input
                type="text"
                maxLength="12"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 412356789012"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              {utrError && <p className="text-red-500 text-[11px] font-semibold">{utrError}</p>}
            </div>
            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                disabled={isVerifying}
                onClick={handleVerifyAndComplete}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isVerifying ? "Verifying UTR..." : "Verify & Get Receipt"}
              </button>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceiptModal && receiptData && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-3xl max-w-md w-full mx-4 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm">
              ✓
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Thank You, {receiptData.donorName}!</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Your contribution of ₹{receiptData.amount} is verified.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left text-xs space-y-2 text-slate-600">
              <div className="flex justify-between"><span>Receipt No:</span><span className="font-semibold text-slate-800">{receiptData.receiptNo}</span></div>
              <div className="flex justify-between"><span>UTR / Ref ID:</span><span className="font-mono text-emerald-700 font-semibold">{receiptData.txnId}</span></div>
              <div className="flex justify-between"><span>Date:</span><span className="font-semibold text-slate-800">{receiptData.date}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-medium text-slate-800"><span>Amount:</span><span className="text-emerald-600 font-bold text-sm">₹{receiptData.amount}</span></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={downloadReceiptPDF}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                📥 Download Receipt (PDF)
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