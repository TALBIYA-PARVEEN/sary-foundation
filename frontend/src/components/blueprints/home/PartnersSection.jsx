import React from 'react';
import { Building2, School, Landmark, Shield, Mail, Phone, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const collaborationAreas = [
  { name: 'Schools & Colleges', role: 'Student Eco-Clubs & Youth Plogging', icon: School },
  { name: 'Civic & Urban Bodies', role: 'Ward Waste Management Support', icon: Landmark },
  { name: 'Resident Welfare Assoc.', role: 'Neighborhood Cleanliness Drives', icon: Users },
  { name: 'River Conservation Wings', role: 'Ghat & Waterbody Restoration', icon: Shield },
  { name: 'Self-Help Groups & Artisans', role: 'Cloth Bag Upcycling & Circular Economy', icon: Building2 }
];

const PartnersSection = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100 text-brand-forest mb-2 inline-block">
          Collaborative Impact
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mt-2 mb-3">
          Open Invitation For Institutional & Community Partnerships
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          As SARY Foundation prepares for its inaugural grassroots drives across Kanpur, we actively invite schools, civic groups, and environmental advocates to collaborate with us.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          {collaborationAreas.map((p, idx) => {
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

        {/* Partnership Contact Callout */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-left">
          <div>
            <h4 className="font-extrabold text-brand-dark text-base sm:text-lg">
              Want to partner or co-organize a drive?
            </h4>
            <p className="text-xs text-gray-600 mt-1">
              Connect with our team to plan joint riverbank plogging or school tree plantations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="mailto:saryfoundation@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-forest hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Email Proposal</span>
            </a>
            <a
              href="tel:+919517330895"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 font-bold text-xs uppercase tracking-wider transition"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>9517330895</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
