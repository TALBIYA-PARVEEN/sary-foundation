import React from 'react';
import { Leaf, Award, HeartHandshake } from 'lucide-react';

const AboutStory = () => {
  return (
    <section id="story" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Column with badges */}
          <div className="relative">
            {/* Floating Official Emblem Badge */}
            <div className="absolute -top-6 -left-4 bg-[#FAF7F2] p-2 rounded-2xl shadow-xl border-2 border-emerald-400/40 flex items-center gap-2.5 z-10">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <img src="/sary-logo.png" alt="SARY Foundation Official Emblem" className="w-full h-full object-contain" />
              </div>
              <div className="pr-2">
                <div className="text-xs font-black text-brand-dark uppercase tracking-wider">Official Emblem</div>
                <div className="text-[10px] text-brand-forest font-bold">SARY Foundation</div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"
                alt="SARY Foundation Volunteer Drive"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Info Tag */}
            <div className="absolute -bottom-6 -right-4 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-brand-forest text-white flex items-center justify-center shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-brand-dark">650+</div>
                <div className="text-xs text-gray-500 font-semibold uppercase">Active Volunteers</div>
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
                Turning Concern Into Concrete Ground Action
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              <strong>SARY Foundation</strong> was initiated with a single conviction: environmental decay is not inevitable. When citizens observe plastic choking sacred riverbanks and barren city corners, passive concern is not enough—we must step forward and clean our shared home.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Beginning with small weekend clean-up mornings, our volunteers have removed tons of single-use plastic, planted thousands of indigenous trees, and inspired schools, youth groups, and local businesses to embrace sustainable waste segregation.
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
