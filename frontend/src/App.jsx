import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import StartFundraiser from './pages/StartFundraiser';
import Causes from './pages/Causes';
import About from './pages/About';
import Faq from './pages/Faq';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start-fundraiser" element={<StartFundraiser />} />
            <Route path="/causes" element={<Causes />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}