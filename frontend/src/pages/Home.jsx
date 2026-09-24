import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdBanner from "../components/AdBanner";


export default function Home() {
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  // Real UPI String Generator
  const upiId = "sdnsheikh375@okhdfcbank";
  const upiUrl = `upi://pay?pa=${upiId}&pn=SDN%20Donation&am=${finalAmount}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

  const urgentCases = [
    {
      id: 1,
      title: "Urgent Heart Surgery for 4-Year-Old Aarav",
      hospital: "AIIMS New Delhi",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
      raised: "₹3,85,000",
      goal: "₹5,00,000",
      percent: 77,
      tag: "Critical - 4 Days Left"
    },
    {
      id: 2,
      title: "Emergency Chemotherapy Aid for Ramesh Kumar",
      hospital: "Tata Memorial Hospital",
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80",
      raised: "₹1,90,000",
      goal: "₹4,00,000",
      percent: 48,
      tag: "Urgent Support"
    },
    {
      id: 3,
      title: "Severe Road Accident ICU Trauma Recovery",
      hospital: "Fortis Healthcare",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
      raised: "₹1,25,000",
      goal: "₹3,00,000",
      percent: 42,
      tag: "ICU Ventilator"
    }
  ];

  const handleStartDonation = (e) => {
    e.preventDefault();
    if (!finalAmount || finalAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    setShowModal(true);
  };

  const handleVerifyUTR = (e) => {
    e.preventDefault();
    if (utrNumber.trim().length < 6) {
      alert("Please enter a valid 12-digit UPI UTR number.");
      return;
    }
    setPaymentDone(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      
      {/* 1. HERO SECTION WITH EMBEDDED DONATION BOX */}
      <section className="bg-gradient-to-b from-emerald-50/70 to-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
              Verified Medical Relief Program
            </span>
            
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Empowering Lives with <span className="text-emerald-600">SDN Donation</span>
            </h1>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              100% direct hospital disbursement. No middlemen, zero commission, and immediate tax exemption digital receipts for every single contribution.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#direct-pay-form" 
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/25 transition text-sm cursor-pointer"
              >
                Donate Directly via UPI ↓
              </a>
              <Link 
                to="/causes" 
                className="px-6 py-3.5 bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 font-bold rounded-2xl shadow-sm transition text-sm"
              >
                Browse All Patients
              </Link>
            </div>
          </div>

          {/* Right Live Donation Box with Preset Amounts */}
          <div id="direct-pay-form" className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-5">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Fast UPI Contribution</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">0% Fee</span>
            </div>

            <form onSubmit={handleStartDonation} className="space-y-4">
              {/* Preset Buttons */}
              <label className="block text-xs font-bold text-slate-700 uppercase">Select Amount (₹)</label>
              <div className="grid grid-cols-4 gap-2">
                {[200, 500, 1000, 2000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      finalAmount === amt && !customAmount
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-400"
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <input 
                type="number" 
                placeholder="Or Enter Custom Amount (₹)" 
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500"
              />

              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="text" 
                  placeholder="Your Name (Optional)" 
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
                <input 
                  type="tel" 
                  placeholder="Phone / WhatsApp" 
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/20 transition cursor-pointer"
              >
                Proceed to Pay ₹{finalAmount || 0}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">₹25,40,000+</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Medical Funds Raised</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">120+</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Surgeries Completed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">0%</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Platform Commission</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">100%</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Verified Medical Proofs</div>
          </div>
        </div>
      </section>

      {/* 3. URGENT CAMPAIGNS SECTION */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Needs Urgent Help
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Active Medical Emergency Cases
            </h2>
          </div>
          <Link to="/causes" className="text-emerald-700 font-bold text-sm hover:underline flex items-center gap-1">
            See all medical cases →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {urgentCases.map((c) => (
            <div key={c.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="relative h-44 w-full">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                    {c.tag}
                  </span>
                </div>
                <div className="p-5">
                  <div className="text-[11px] font-semibold text-slate-500 mb-1">🏥 {c.hospital}</div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">
                    {c.title}
                  </h3>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-emerald-700 font-bold">{c.raised}</span>
                      <span className="text-slate-400">Target: {c.goal}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${c.percent}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link 
                  to="/causes" 
                  className="block text-center w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition"
                >
                  Donate to this Patient
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW SDN DONATION WORKS */}
      <section className="py-14 bg-white border-t border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Transparent Workflow
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
            How SDN Donation Operates
          </h2>
          <p className="mt-2 text-slate-600 text-sm">Direct, quick, and completely accountable.</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 font-black rounded-2xl flex items-center justify-center mx-auto text-lg">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Select or Scan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pick a verified patient case or scan the direct UPI QR code via your preferred payment app.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 font-black rounded-2xl flex items-center justify-center mx-auto text-lg">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">Submit 12-Digit UTR</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your transaction UTR reference number to automatically tag your contribution to the patient.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 font-black rounded-2xl flex items-center justify-center mx-auto text-lg">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">Download Tax Receipt</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instantly generate your PDF donation invoice and share it directly on WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FUNDRAISER CTA BANNER */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black">
            Do You Know a Patient in Critical Need?
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto">
            Raise emergency funds with 0% platform charges. Our medical committee verifies documents within 2-4 hours.
          </p>
          <div className="pt-2">
            <Link 
              to="/start-fundraiser"
              className="inline-block px-8 py-3.5 bg-white text-emerald-800 hover:bg-slate-100 font-extrabold rounded-2xl shadow-lg transition text-sm"
            >
              Start Free Medical Fundraiser →
            </Link>
          </div>
        </div>
      </section>

      {/* POPUP UPI QR & UTR MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 border border-slate-200 relative">
            <button 
              onClick={() => { setShowModal(false); setPaymentDone(false); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {!paymentDone ? (
              <div className="text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Scan to Donate ₹{finalAmount}
                </span>

                <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 inline-block shadow-inner">
                  <img 
                    src={qrCodeUrl} 
                    alt="SDN UPI QR" 
                    className="w-48 h-48 mx-auto rounded-xl shadow-sm"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-700">UPI ID: <span className="text-emerald-700 font-mono select-all">sdndonation@upi</span></p>
                  <p className="text-[11px] text-slate-500">Scan via Google Pay, PhonePe, Paytm, BHIM</p>
                </div>

                <form onSubmit={handleVerifyUTR} className="space-y-3 pt-2 text-left">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Enter 12-Digit UTR / Ref Number *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 4082XXXXXXXX" 
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <button 
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                  >
                    Confirm Payment & Verify UTR
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-slate-900">Donation Recorded!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you <strong>{donorName || "Supporter"}</strong> for donating <strong>₹{finalAmount}</strong>. Your UTR ref <strong>{utrNumber}</strong> has been tagged to the medical patient.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition"
                >
                  Close & Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}
<AdBanner />

    </div>
  );
  
}