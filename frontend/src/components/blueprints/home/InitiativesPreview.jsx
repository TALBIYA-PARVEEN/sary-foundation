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
              Core Planned Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
              Our Planned Initiatives
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-xl">
              From riverbank plogging and tree planting to zero-waste segregation, explore our proposed community drives. Register to join as a founding volunteer.
            </p>
          </div>
          <Link
            to="/initiatives"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-brand-forest hover:text-emerald-700 font-bold text-sm group"
          >
            <span>View All Planned Drives</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((item) => {
            const Icon = iconMap[item.icon] || Sparkles;

            return (
              <div
                key={item._id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                {/* Branded Card Header (No Fake Event Photos) */}
                <div className="relative h-44 bg-gradient-to-br from-[#071916] via-[#0D3B2F] to-[#15803D] p-6 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between relative z-10">
                    <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 text-xs font-bold border border-white/10">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-white/10 p-0.5">
                      <img src="/sary-logo.png" alt="SARY" className="w-full h-full object-contain rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/20">
                      <Icon className="w-5 h-5 text-emerald-300" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Upcoming Drive
                    </span>
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

                  {/* Target Goal info */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-400 font-semibold block uppercase text-[10px]">Planned Goal</span>
                      <span className="font-bold text-brand-dark">{item.target} {item.unit}</span>
                    </div>
                    <Link
                      to="/volunteer"
                      className="text-brand-forest font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Join Drive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
