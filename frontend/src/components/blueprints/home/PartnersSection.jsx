import React from 'react';
import SectionHeading from '../../common/SectionHeading';
import { Building2, School, Landmark, Shield } from 'lucide-react';

const partners = [
  { name: 'Swachh Bharat Mission', role: 'Civic Partner', icon: Landmark },
  { name: 'City Municipal Corporation', role: 'Local Body', icon: Building2 },
  { name: 'Green Youth Eco-Club', role: 'Youth Network', icon: School },
  { name: 'River Cleanliness Alliance', role: 'Waterbody Taskforce', icon: Shield },
  { name: 'Eco-Crafts Women Collective', role: 'Upcycling Partner', icon: Building2 }
];

const PartnersSection = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 inline-block">
          Trusted Collaboration
        </span>
        <h3 className="text-xl font-bold text-brand-dark mb-10">
          Our Community & Institutional Partners
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50/80 border border-gray-100 hover:bg-emerald-50/50 hover:border-emerald-200 transition duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white text-gray-500 group-hover:text-brand-forest shadow-sm flex items-center justify-center mb-3 transition">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-gray-800 text-center leading-tight">
                  {p.name}
                </span>
                <span className="text-[11px] text-gray-500 mt-1">
                  {p.role}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
