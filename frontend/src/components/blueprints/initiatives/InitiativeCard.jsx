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
  const percent = Math.min(100, Math.round((initiative.achieved / (initiative.target || 100)) * 100));

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col group">
      {/* Banner */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={initiative.image || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'}
          alt={initiative.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-brand-dark text-xs font-bold shadow-md">
            {initiative.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 w-11 h-11 rounded-2xl bg-brand-forest text-white flex items-center justify-center shadow-lg group-hover:bg-brand-emerald transition">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Body */}
      <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
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

        {/* Progress */}
        <div className="space-y-2 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-xs font-bold text-gray-700">
            <span>Progress: {initiative.achieved} {initiative.unit}</span>
            <span className="text-brand-forest">{percent}% of {initiative.target}</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-forest to-brand-emerald rounded-full transition-all duration-1000"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelect(initiative)}
          className="w-full py-3 rounded-xl bg-emerald-50 hover:bg-brand-forest text-brand-forest hover:text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 group/btn cursor-pointer"
        >
          <span>Explore Details</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition" />
        </button>
      </div>
    </div>
  );
};

export default InitiativeCard;
