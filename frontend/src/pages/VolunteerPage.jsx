import React from 'react';
import VolunteerForm from '../components/blueprints/volunteer/VolunteerForm';

const VolunteerPage = () => {
  return (
    <div className="pt-28">
      {/* Subpage Header Banner */}
      <div className="bg-[#0B2722] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-transparent to-emerald-900/40" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
            Get Involved
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold">
            Volunteer With SARY Foundation
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            Step onto the field with hundreds of like-minded eco-warriors. Make weekend plogs and green drives your purpose.
          </p>
        </div>
      </div>

      <VolunteerForm />
    </div>
  );
};

export default VolunteerPage;
