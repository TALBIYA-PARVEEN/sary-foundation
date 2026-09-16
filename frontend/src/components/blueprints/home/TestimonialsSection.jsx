import React from 'react';
import SectionHeading from '../../common/SectionHeading';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Cleansing of self & environment is the most valuable task, because only a clean environment can nurture a clean society. The passion of SARY Foundation volunteers is truly exemplary.",
    name: "Dr. Arvind Pathak",
    role: "Environmental Scientist & Educator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "What began as a modest group has blossomed into an energetic civic movement, mobilizing youth for weekly plogs and sapling plantations. The city is lucky to have such dedicated eco-warriors.",
    name: "Meera Srivastava",
    role: "Community Sustainability Advocate",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Consistently turning up every weekend to clean ghats and educate children on zero waste is remarkable. SARY Foundation proves that determined youth can turn the tide on plastic waste.",
    name: "Rajeshwar Singh",
    role: "Senior River Conservation Volunteer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-[#0B2722] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          badge="Voices of Support"
          title="What Community Leaders Say"
          subtitle="Inspiring feedback from our environmental mentors, community leaders, and dedicated volunteers."
          light={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-between space-y-6 hover:border-emerald-500/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Quote className="w-8 h-8 text-emerald-400 opacity-60" />
                  <div className="flex text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-emerald-400/40"
                />
                <div>
                  <div className="font-bold text-sm text-white">{t.name}</div>
                  <div className="text-xs text-emerald-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
