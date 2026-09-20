import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { initiativeService } from '../../../services';

const InitiativesPreview = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const res = await initiativeService.getInitiatives();
        if (res.success && res.data && res.data.length > 0) {
          setInitiatives(res.data.slice(0, 3));
        } else {
          setInitiatives([]);
        }
      } catch (err) {
        console.warn('Error fetching initiatives preview:', err.message);
        setInitiatives([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInitiatives();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-100 text-brand-forest mb-3 inline-block">
            Preparatory Inception Phase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Field Drives & Initiatives
          </h2>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            SARY Foundation is in its foundational setup phase. No public drives have been conducted yet as we actively mobilize our founding volunteer units and plan inaugural grassroots operations across Kanpur.
          </p>
        </div>

        {/* Elegant Inaugural Placeholder Card */}
        <div className="relative rounded-3xl border-2 border-dashed border-emerald-200 bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/30 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-sm">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#FAF7F2] p-2 text-brand-forest shadow-md border border-emerald-200 mx-auto flex items-center justify-center">
            <img 
              src="/sary-logo.png" 
              alt="SARY Foundation Emblem" 
              className="w-full h-full object-contain rounded-2xl" 
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Inaugural Drives In Preparation</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
              No Public Drives Initiated Yet
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our inaugural cleanliness plogging drives, ghat waste interventions, and urban sapling plantations in Kanpur are currently being structured. Drive schedules, meeting spots, and volunteer rosters will be announced here once flagged off.
            </p>
          </div>

          {/* Preparatory Milestone Roadmap */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 max-w-3xl mx-auto text-left">
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Step 1 • Active Now
                </span>
                <h4 className="font-bold text-sm text-brand-dark mt-2">Founding Volunteer Enlistment</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Enrolling youth, students, and citizens to form our first field taskforce.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  Step 2 • In Progress
                </span>
                <h4 className="font-bold text-sm text-brand-dark mt-2">Location & Route Surveys</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Mapping priority riverbanks and community spots requiring urgent cleanup.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                  Step 3 • Upcoming
                </span>
                <h4 className="font-bold text-sm text-brand-dark mt-2">Inaugural Drive Kickoff</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Official date, reporting time, and gear distribution announced publicly.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-emerald-100 max-w-xl mx-auto">
            <Link
              to="/volunteer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-forest hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md hover:scale-105"
            >
              <Users className="w-4 h-4" />
              <span>Register As Founding Volunteer</span>
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 font-bold text-xs uppercase tracking-wider transition"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Suggest A Drive Location</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InitiativesPreview;
