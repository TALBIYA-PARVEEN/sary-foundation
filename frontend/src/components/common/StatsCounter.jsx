import React, { useState, useEffect } from 'react';
import { Trash2, Users, Waves, TreePine, Sparkles, Award } from 'lucide-react';
import { statsService } from '../../services';

const iconMap = {
  Trash2: Trash2,
  Users: Users,
  Waves: Waves,
  TreePine: TreePine,
  Sparkles: Sparkles,
  Award: Award
};

const StatsCounter = () => {
  const [stats, setStats] = useState([
    { _id: '1', label: 'Riverbank Cleanliness', badge: 'Kanpur Ghats', value: 'Phase 1', suffix: '', icon: 'Waves', sub: 'Inaugural Drive Planned' },
    { _id: '2', label: 'Volunteer Movement', badge: 'Join Movement', value: 'Open', suffix: '', icon: 'Users', sub: 'Registrations Active' },
    { _id: '3', label: 'Urban Afforestation', badge: 'Target Goal', value: '5,000+', suffix: '', icon: 'TreePine', sub: 'Native Trees Planned' },
    { _id: '4', label: 'Zero-Waste Awareness', badge: 'Civic Action', value: '100%', suffix: '', icon: 'Trash2', sub: 'Community Driven' }
  ]);
  const [loading, setLoading] = useState(false);

  return (
    <section className="relative -mt-16 z-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
        <div className="text-center mb-6">
          <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100 text-brand-forest">
            SARY Foundation — Our Core Focus & Planned Milestones
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {stats.map((item, idx) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <div 
                key={item._id || idx} 
                className={`flex flex-col items-center text-center ${idx > 0 ? 'sm:pl-6 pt-6 sm:pt-0' : ''}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-forest flex items-center justify-center mb-3 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1">
                  {item.badge}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
                  {item.value}
                </div>
                <div className="mt-1 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {item.label}
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5 font-medium">
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
