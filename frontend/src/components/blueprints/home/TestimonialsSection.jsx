import React from 'react';
import SectionHeading from '../../common/SectionHeading';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

const foundingTenets = [
  {
    icon: Sparkles,
    title: "Grassroots Action First",
    desc: "We prioritize real weekend field presence—cleaning riverbanks, planting native saplings, and engaging communities directly."
  },
  {
    icon: ShieldCheck,
    title: "100% Transparency",
    desc: "Every volunteer hour and resource contributed will be accounted for openly. Field photos and metrics are documented honestly."
  },
  {
    icon: Heart,
    title: "Inclusive Civic Ownership",
    desc: "Environmental protection is a collective duty. We welcome every student, educator, citizen, and institution to join hands."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-[#0B2722] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          badge="Founding Commitments"
          title="Our Promise To The Community"
          subtitle="As we prepare for our inaugural field drives across Kanpur, these core tenets guide every initiative we launch."
          light={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {foundingTenets.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-between space-y-6 hover:border-emerald-500/40 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-white">
                    {t.title}
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-emerald-300 font-semibold">
                  SARY Foundation Tenet #{idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
