import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const formData = new FormData();
    // Aapki exact Web3Forms Access Key:
    formData.append("access_key", "869dd9a8-c254-43a4-9886-a2719ead57f4");
    formData.append("email", email);
    formData.append("subject", "New SDN Community Subscriber!");
    formData.append("from_name", "SDN Donation Platform");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('Success! Thank you for joining SDN Community.');
        setEmail('');
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('Network error. Please try again.');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter / Community Section */}
        <div className="bg-slate-800/80 border border-slate-700/60 p-6 sm:p-8 rounded-3xl max-w-xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
            Stay Connected
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Join the SDN Community
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Get urgent medical relief updates, campaign reports, and impact stories directly to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <button 
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer"
            >
              Join
            </button>
          </form>

          {/* Status Message */}
          {status && (
            <p className={`text-xs font-medium ${status.includes('Success') ? 'text-emerald-400' : 'text-amber-400'}`}>
              {status}
            </p>
          )}
        </div>

        {/* Bottom Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} SDN Donation. Transparent Medical Crowdfunding.
        </div>

      </div>
    </footer>
  );
}