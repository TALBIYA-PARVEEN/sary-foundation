import React from 'react';
import InitiativesGrid from '../components/blueprints/initiatives/InitiativesGrid';

const InitiativesPage = ({ onOpenDonate }) => {
  return (
    <div className="pt-28">
      {/* Subpage Header Banner */}
      <div className="bg-[#0B2722] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-transparent to-emerald-900/40" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
            Our Programs
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold">
            Key Environmental Initiatives
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            Targeted community action programs focused on clean ghats, sacred waste upcycling, urban sapling canopy, and youth education.
          </p>
        </div>
      </div>

      <InitiativesGrid onOpenDonate={onOpenDonate} />
    </div>
  );
};

export default InitiativesPage;
