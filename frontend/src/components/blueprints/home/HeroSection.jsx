import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

const HeroSection = ({ onOpenDonate }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
      {/* Background Image / Nature Backdrop with Gradient Overlays */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all scale-105 duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=85')`
        }}
      >
        {/* Multilayered Darkness & Forest Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2722]/85 via-[#0B2722]/70 to-[#0B2722]/90" />
      </div>

      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white space-y-8">
        {/* Foundation Official Emblem & Top Tagline Badge */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#FAF7F2] p-1.5 shadow-2xl border-2 border-emerald-400/50 backdrop-blur-md hover:scale-105 transition transform duration-300">
            <img 
              src="/sary-logo.png" 
              alt="SARY Foundation Official Emblem" 
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-widest backdrop-blur-md animate-fadeIn">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>SARY Foundation Movement</span>
          </div>
        </div>

        {/* Big Impact Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Make An Impact & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-400">
              Give Back To Nature
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Leading community clean-up drives, riverbank restoration, urban tree plantations, and zero-waste sustainable practices for a cleaner, greener, and healthier future.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenDonate}
            className="w-full sm:w-auto eco-gradient-btn text-white font-extrabold text-base px-8 py-4 rounded-full flex items-center justify-center gap-2.5 shadow-xl hover:scale-105 transition transform cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-current text-white" />
            <span>DONATE NOW</span>
          </button>
          
          <Link
            to="/volunteer"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-base px-8 py-4 rounded-full flex items-center justify-center gap-2.5 backdrop-blur-md transition shadow-lg"
          >
            <Users className="w-5 h-5 text-emerald-300" />
            <span>Become a Volunteer</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-xs text-emerald-100/70 border-t border-white/10">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Transparent NGO</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>Community Driven</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>80G Tax Deductible</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
