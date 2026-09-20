import React from 'react';
import { Leaf, Award, HeartHandshake } from 'lucide-react';

const AboutStory = () => {
  return (
    <section id="story" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Column: Official Emblem Showcase */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-gradient-to-br from-[#0B2722] via-[#0E3D31] to-[#15803D] p-8 flex flex-col items-center justify-center text-center text-white relative">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-[#FAF7F2] p-3 shadow-2xl border-2 border-emerald-400/40 mb-4 hover:scale-105 transition transform duration-300">
                <img
                  src="/sary-logo.png"
                  alt="SARY Foundation Official Emblem"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
              <h4 className="font-extrabold text-lg tracking-wide text-white">
                SARY FOUNDATION
              </h4>
              <p className="text-xs text-emerald-200 mt-1 max-w-xs">
                Empowering People & Preserving Nature Through Civic Action
              </p>
            </div>
            
            {/* Authentic Info Tag */}
            <div className="absolute -bottom-6 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 max-w-xs">
              <div className="w-11 h-11 rounded-xl bg-brand-forest text-white flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-bold uppercase">Chapter Location</div>
                <div className="text-sm font-extrabold text-brand-dark">Ratanlal Nagar, Kanpur</div>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-100 text-brand-forest mb-3 inline-block">
                Our Foundation Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
                Turning Environmental Concern Into Concrete Ground Action
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              <strong>SARY Foundation</strong> was initiated with a single conviction: environmental decay is not inevitable. When citizens observe plastic choking riverbanks and barren city corners, passive concern is not enough—we must step forward and clean our shared home.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Based in Kanpur Nagar, Uttar Pradesh, SARY Foundation is gearing up for its inaugural community drives—mobilizing youth and passionate citizens for riverbank plogging, indigenous urban afforestation, and zero-waste community education.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-gray-200">
                <Leaf className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-brand-dark text-sm">Action First</h4>
                <p className="text-xs text-gray-500 mt-1">Direct field presence every single weekend.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-gray-200">
                <Award className="w-5 h-5 text-brand-gold mb-2" />
                <h4 className="font-bold text-brand-dark text-sm">Inclusive Movement</h4>
                <p className="text-xs text-gray-500 mt-1">Open to every student, citizen, and elder.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
