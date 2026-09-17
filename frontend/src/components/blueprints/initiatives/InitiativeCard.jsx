import React from 'react';
import { Waves, TreePine, Recycle, GraduationCap, Droplet, Sparkles, ArrowRight } from 'lucide-react';

const iconMap = {
  Waves: Waves,
  TreePine: TreePine,
  Recycle: Recycle,
  GraduationCap: GraduationCap,
  Droplet: Droplet,
  Sparkles: Sparkles
};

const InitiativeCard = ({ initiative, onSelect }) => {
  const Icon = iconMap[initiative.icon] || Sparkles;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col group">
      {/* Branded Graphic Banner (No Fake Event Photos) */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#071916] via-[#0D3B2F] to-[#15803D] p-6 flex flex-col justify-between">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 text-xs font-bold border border-white/10">
            {initiative.category}
          </span>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-white/10 p-0.5">
            <img src="/sary-logo.png" alt="SARY" className="w-full h-full object-contain rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-105 transition transform">
            <Icon className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Planned Campaign
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2">
          {initiative.tagline && (
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
              {initiative.tagline}
            </div>
          )}
          <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-forest transition">
            {initiative.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
            {initiative.description}
          </p>
        </div>

        {/* Milestone Target & Status (No Fake Past Progress) */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-gray-400 font-semibold block uppercase text-[10px]">Target Goal</span>
            <span className="font-bold text-brand-dark">{initiative.target} {initiative.unit}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 font-semibold block uppercase text-[10px]">Current Status</span>
            <span className="font-bold text-emerald-700">Inaugural Phase</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelect(initiative)}
          className="w-full py-3 rounded-xl bg-emerald-50 hover:bg-brand-forest text-brand-forest hover:text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 group/btn cursor-pointer"
        >
          <span>Explore Details & Volunteer</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition" />
        </button>
      </div>
    </div>
  );
};

export default InitiativeCard;
