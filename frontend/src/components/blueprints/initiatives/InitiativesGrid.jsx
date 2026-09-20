import React, { useState, useEffect } from 'react';
import SectionHeading from '../../common/SectionHeading';
import InitiativeCard from './InitiativeCard';
import Modal from '../../common/Modal';
import { initiativeService } from '../../../services';
import { Link } from 'react-router-dom';
import { Users, Heart, Waves, TreePine, Recycle, GraduationCap, MapPin, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

const plannedAreas = [
  {
    icon: Waves,
    title: 'Riverbank & Ghat Cleanliness',
    tag: 'Priority Focus #1',
    description: 'Weekly community plogging and waste recovery along the Ganges riverbanks and city water inlets to trap plastic before it reaches aquatic life.'
  },
  {
    icon: TreePine,
    title: 'Native Urban Afforestation',
    tag: 'Priority Focus #2',
    description: 'Planting neem, banyan, peepal, and seasonal fruit saplings in school grounds, roadsides, and community parks with local caretaker networks.'
  },
  {
    icon: Recycle,
    title: 'Source Segregation & Upcycling',
    tag: 'Priority Focus #3',
    description: 'Promoting wet/dry waste separation at source, setting up neighborhood composters, and replacing polythene bags with upcycled cotton alternatives.'
  },
  {
    icon: GraduationCap,
    title: 'Youth & School Eco-Warriors',
    tag: 'Priority Focus #4',
    description: 'Interactive campus workshops teaching students practical zero-waste habits, waste audits, and sustainable lifestyle practices.'
  }
];

const InitiativesGrid = ({ onOpenDonate }) => {
  const [initiatives, setInitiatives] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const res = await initiativeService.getInitiatives();
        if (res.success && res.data && res.data.length > 0) {
          setInitiatives(res.data);
        } else {
          setInitiatives([]);
        }
      } catch (err) {
        console.warn('Error loading initiatives:', err.message);
        setInitiatives([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInitiatives();
  }, []);

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Inaugural Phase"
          title="Environmental Drives & Initiatives"
          subtitle="SARY Foundation is in its foundational setup phase. No public drives have been initiated yet as our team prepares inaugural field operations in Kanpur."
        />

        {loading ? (
          <div className="py-20 text-center text-gray-400 font-semibold">
            Checking drive schedules...
          </div>
        ) : initiatives.length > 0 ? (
          /* Dynamic cards when admin adds real initiatives in the future */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((item) => (
              <InitiativeCard
                key={item._id}
                initiative={item}
                onSelect={(init) => setSelectedInitiative(init)}
              />
            ))}
          </div>
        ) : (
          /* Transparent Inaugural Placeholder */
          <div className="space-y-12">
            {/* Main Central Notice Banner */}
            <div className="bg-white rounded-3xl border border-emerald-200/80 shadow-card p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-[#FAF7F2] p-2 text-brand-forest shadow-md border border-emerald-200 mx-auto flex items-center justify-center">
                <img 
                  src="/sary-logo.png" 
                  alt="SARY Foundation Emblem" 
                  className="w-full h-full object-contain rounded-2xl" 
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Preparatory Stage • Ground Action Launching Soon</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                  No Field Drives Initiated Yet
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  SARY Foundation was registered to spearhead civic cleanliness and environmental restoration. We are actively conducting site reconnaissances and enlisting our founding volunteer squad before scheduling our first public drives in Kanpur Nagar.
                </p>
              </div>

              {/* Status Chips */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  📍 Location: Kanpur Nagar, U.P.
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  👥 Volunteer Squad: Enlistment Open
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  🗓️ Inaugural Drive #1: In Preparation
                </span>
              </div>
            </div>

            {/* Planned Focus Domains (Transparent Blueprint) */}
            <div>
              <div className="text-center mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">
                  Blueprint For Action
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-brand-dark">
                  Upcoming Planned Campaign Domains
                </h4>
                <p className="text-xs text-gray-500 max-w-lg mx-auto mt-1">
                  These core environmental interventions will form the basis of our scheduled field drives.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plannedAreas.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-forest flex items-center justify-center shadow-inner">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                            {p.tag}
                          </span>
                        </div>
                        <h4 className="font-bold text-brand-dark text-base">
                          {p.title}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Planned Drive Framework</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Callout Box */}
            <div className="bg-gradient-to-br from-[#0B2722] via-[#0E3D31] to-[#15803D] rounded-3xl p-8 sm:p-10 text-white text-center max-w-4xl mx-auto space-y-5 shadow-xl">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
                  Get Involved Early
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold">
                  Be Part of Our Inaugural Drive Squad
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto leading-relaxed">
                  Join our founding volunteer roster today. You will receive direct notifications and meeting point coordinates before our very first riverbank cleanup is announced.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  to="/volunteer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-gray-100 text-brand-forest font-extrabold text-xs uppercase tracking-wider transition shadow-lg hover:scale-105"
                >
                  <Users className="w-4 h-4 text-brand-forest" />
                  <span>Register As Founding Volunteer</span>
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-wider transition"
                >
                  <MapPin className="w-4 h-4 text-emerald-300" />
                  <span>Propose A Clean-Up Location</span>
                </Link>
                <button
                  type="button"
                  onClick={onOpenDonate}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-forest/40 hover:bg-brand-forest border border-emerald-400/40 text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  <Heart className="w-4 h-4 text-rose-300 fill-current" />
                  <span>Support Drive Gear</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InitiativesGrid;
