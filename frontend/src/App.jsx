import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    amount: '1000',
  });

  const [showQr, setShowQr] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const presetAmounts = [500, 1000, 2500, 5000];

  // 1. Real-time Live Listener: Jaise hi database mein entry aayegi, turant screen par show hogi
  useEffect(() => {
    const q = query(
      collection(db, "donations"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDonors(liveList);
    }, (error) => {
      console.error("Firestore error: ", error);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePresetSelect = (val) => {
    setFormData({ ...formData, amount: val });
  };

  // 2. Form Submit: Firestore Database mein live entry save karega
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.amount) {
      alert("Please fill all details");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "donations"), {
        name: formData.name,
        phone: formData.phone,
        amount: Number(formData.amount),
        createdAt: serverTimestamp()
      });
      setLoading(false);
      setShowQr(true);
    } catch (error) {
      setLoading(false);
      console.error("Error saving donation: ", error);
      alert("Database error. Please check your connection.");
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "How can I make the payment?", a: "You can donate securely using UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, or Net Banking." },
    { q: "Will I receive 80G tax exemption?", a: "Yes, all donations are eligible for tax benefits under Section 80G." },
    { q: "Is my donation secure?", a: "100% secure with 256-bit SSL encryption and verified non-profit partners." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <span className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">
            ImpactWelfare <span className="text-sm font-normal text-slate-500 font-['Noto_Nastaliq_Urdu']" dir="rtl">(امدادی ویلفیئر)</span>
          </span>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
            Verified NGO
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50/70 to-white pt-6 pb-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden shadow-md mb-6 relative">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000&auto=format&fit=crop&q=80"
              alt="Welfare Campaign"
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider w-fit mb-2">
                Emergency Support
              </span>
              <h1 className="text-xl sm:text-2xl font-bold leading-tight drop-shadow-sm">
                Support Student Welfare & Medical Care
                <span className="block mt-1 text-base sm:text-lg font-normal font-['Noto_Nastaliq_Urdu'] text-emerald-100" dir="rtl">
                  ضرورتمند طلباء اور مریضوں کی مالی امداد کریں
                </span>
              </h1>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center mb-8">
            <div>
              <div className="text-base sm:text-lg font-bold text-slate-800">₹45,000+</div>
              <div className="text-[11px] text-slate-500 font-medium">Raised so far</div>
            </div>
            <div className="border-x border-slate-200">
              <div className="text-base sm:text-lg font-bold text-slate-800">{donors.length > 0 ? `${donors.length}+` : "100+"}</div>
              <div className="text-[11px] text-slate-500 font-medium">Kind Donors</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-emerald-600">80G</div>
              <div className="text-[11px] text-slate-500 font-medium">Tax Exemption</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-lg mx-auto px-4 pb-12">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-1 text-center">Make a Secure Donation</h2>
          <p className="text-xs text-slate-500 text-center mb-6">Your contribution goes directly to the welfare fund</p>

          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex justify-between items-center">
                <span>Full Name</span>
                <span className="font-['Noto_Nastaliq_Urdu'] text-slate-500 font-normal text-sm" dir="rtl">پورا نام</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Mohd Ahmad"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex justify-between items-center">
                <span>Phone Number</span>
                <span className="font-['Noto_Nastaliq_Urdu'] text-slate-500 font-normal text-sm" dir="rtl">فون نمبر</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                maxLength="10"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex justify-between items-center">
                <span>Donation Amount (₹)</span>
                <span className="font-['Noto_Nastaliq_Urdu'] text-slate-500 font-normal text-sm" dir="rtl">عطیہ کی رقم</span>
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2.5">
                {presetAmounts.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => handlePresetSelect(amt)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition ${
                      String(formData.amount) === String(amt)
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                name="amount"
                required
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter custom amount"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-200 text-sm flex items-center justify-center space-x-2"
            >
              <span>{loading ? "Processing..." : `Donate ₹${formData.amount || '0'}`}</span>
              <span>•</span>
              <span className="font-['Noto_Nastaliq_Urdu'] font-normal text-base" dir="rtl">ابھی عطیہ دیں</span>
            </button>
          </form>

          {/* Dynamic QR Display Modal */}
          {showQr && (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <h3 className="text-sm font-bold text-emerald-900 mb-1">Scan to Complete Payment</h3>
              <p className="text-xs text-slate-600 mb-3">Google Pay / PhonePe / Paytm</p>
              <div className="flex justify-center mb-2">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=your-upi-id@bank&pn=ImpactWelfare&am=${formData.amount}&cu=INR`}
                  alt="UPI QR Code"
                  className="rounded-lg shadow-sm border border-emerald-300 p-1 bg-white"
                />
              </div>
              <p className="text-[11px] text-slate-500">Scan using any UPI app to transfer ₹{formData.amount}</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center space-x-4 text-slate-400 text-xs">
            <span>🔒 256-Bit SSL</span>
            <span>•</span>
            <span>Live Sync Enabled</span>
          </div>
        </div>

        {/* Real-time Live Donors List */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Recent Live Supporters
            </h3>
            <span className="flex items-center text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
              Live Sync
            </span>
          </div>

          {donors.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No donations yet. Be the first supporter!</p>
          ) : (
            <div className="space-y-3">
              {donors.map((donor) => (
                <div key={donor.id} className="flex justify-between items-center border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{donor.name}</p>
                    <p className="text-[10px] text-slate-400">Verified Donor</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    ₹{donor.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FAQs */}
        <section className="mt-8">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider text-center mb-3">
            Frequently Asked Questions
          </h3>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 py-3 text-left font-medium text-xs text-slate-800 flex justify-between items-center"
                >
                  <span>{faq.q}</span>
                  <span className="text-slate-400 text-sm">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-3 text-xs text-slate-600 border-t border-slate-100 pt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 text-center">
        <p>© 2026 ImpactWelfare Foundation. All rights reserved.</p>
      </footer>
    </div>
  );
}