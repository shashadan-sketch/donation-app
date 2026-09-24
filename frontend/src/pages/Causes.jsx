import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const causesData = [
  {
    id: 1,
    title: "Urgent Heart Surgery for 4-Year-Old Aarav",
    category: "Child Health",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    raised: 385000,
    goal: 500000,
    donorsCount: 142,
    urgency: "Critical - 4 Days Left",
    hospital: "AIIMS New Delhi",
    description: "Aarav requires an urgent open-heart procedure. His family has exhausted their lifetime savings."
  },
  {
    id: 2,
    title: "Emergency Chemotherapy Aid for Ramesh Kumar",
    category: "Cancer Care",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
    raised: 190000,
    goal: 400000,
    donorsCount: 88,
    urgency: "Urgent Support Needed",
    hospital: "Tata Memorial Hospital",
    description: "Stage 3 cancer diagnosis. He needs continuous cycles of chemotherapy and supportive care."
  },
  {
    id: 3,
    title: "Severe Road Accident ICU Trauma Recovery",
    category: "Accident Relief",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    raised: 125000,
    goal: 300000,
    donorsCount: 65,
    urgency: "ICU Ventilator Support",
    hospital: "Fortis Healthcare",
    description: "Multiple fractures and trauma. Fighting for life on ventilator support, needs daily medication."
  },
  {
    id: 4,
    title: "Dialysis & Kidney Treatment Support Fund",
    category: "Critical Care",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    raised: 82000,
    goal: 200000,
    donorsCount: 41,
    urgency: "Bi-Weekly Dialysis",
    hospital: "Max Super Speciality Hospital",
    description: "Ongoing dialysis needed twice a week until a donor match is finalized for kidney transplant."
  }
];

export default function Causes() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Child Health", "Cancer Care", "Accident Relief", "Critical Care"];

  const filteredCauses = selectedCategory === "All" 
    ? causesData 
    : causesData.filter(c => c.category === selectedCategory);

  return (
    <div className="min- dissatisfaction bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Verified Medical Campaigns
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            SDN Donation Causes
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Every donation is 100% verified and directed toward hospital treatment. Pick a life to save today.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Causes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCauses.map((item) => {
            const percentage = Math.min(Math.round((item.raised / item.goal) * 100), 100);

            return (
              <div key={item.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="relative h-56 w-full overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                      {item.category}
                    </span>
                    <span className="absolute top-4 right-4 bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow animate-pulse">
                      {item.urgency}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="text-xs font-semibold text-slate-500 mb-1">
                      🏥 {item.hospital}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-5">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-emerald-700">₹{item.raised.toLocaleString()} raised</span>
                        <span className="text-slate-500">Goal: ₹{item.goal.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                        <span>{percentage}% Completed</span>
                        <span>{item.donorsCount} Donors</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0">
                  <Link 
                    to="/" 
                    className="w-full inline-flex justify-center items-center py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-500/10 transition"
                  >
                    Donate to this Cause →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}