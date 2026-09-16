import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../common/SectionHeading';
import { ArrowRight, Waves, TreePine, Recycle, GraduationCap, Droplet, Sparkles } from 'lucide-react';
import { initiativeService } from '../../../services';

const iconMap = {
  Waves: Waves,
  TreePine: TreePine,
  Recycle: Recycle,
  GraduationCap: GraduationCap,
  Droplet: Droplet,
  Sparkles: Sparkles
};

const InitiativesPreview = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const res = await initiativeService.getInitiatives();
        if (res.success && res.data) {
          setInitiatives(res.data.slice(0, 3));
        }
      } catch (err) {
        console.warn('Error fetching initiatives preview:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitiatives();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-100 text-brand-forest mb-3 inline-block">
              Core Action Areas
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
              Our Active Initiatives
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-xl">
              From riverbank plogging and tree planting to waste recycling, discover how SARY Foundation drives ground-level transformations.
            </p>
          </div>
          <Link
            to="/initiatives"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-brand-forest hover:text-emerald-700 font-bold text-sm group"
          >
            <span>View All Initiatives</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((item) => {
            const Icon = iconMap[item.icon] || Sparkles;
            const percent = Math.min(100, Math.round((item.achieved / (item.target || 100)) * 100));

            return (
              <div
                key={item._id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                {/* Card Banner Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-brand-dark text-xs font-bold shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-brand-forest text-white flex items-center justify-center shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-forest transition">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1.5">
                      <span>Progress: {item.achieved} {item.unit}</span>
                      <span className="text-brand-forest">{percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-forest to-brand-emerald rounded-full transition-all duration-1000"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InitiativesPreview;
