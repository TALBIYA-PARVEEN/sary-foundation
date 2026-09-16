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
    { _id: '1', label: 'Ghat & City Clean-Up Drives', value: 120, suffix: '+', icon: 'Trash2' },
    { _id: '2', label: 'Dedicated Volunteers', value: 650, suffix: '+', icon: 'Users' },
    { _id: '3', label: 'Trash Removed from Waterbodies', value: 85, suffix: ' Mt+', icon: 'Waves' },
    { _id: '4', label: 'Trees Planted & Nurtured', value: 15000, suffix: '+', icon: 'TreePine' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await statsService.getStats();
        if (res.success && res.data && res.data.length > 0) {
          setStats(res.data);
        }
      } catch (err) {
        console.warn('Using default fallback stats:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="relative -mt-16 z-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          {stats.map((item, idx) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <div 
                key={item._id || idx} 
                className={`flex flex-col items-center text-center ${idx > 1 ? 'pt-6 lg:pt-0' : ''} ${idx % 2 !== 0 && idx < 2 ? 'pl-0' : ''}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-forest flex items-center justify-center mb-3 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
                  {item.prefix || ''}{typeof item.value === 'number' ? item.value.toLocaleString() : item.value}{item.suffix || '+'}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider max-w-[180px]">
                  {item.label}
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
