import React from 'react';
import SectionHeading from '../../common/SectionHeading';
import { Target, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

const MissionVision = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Our Purpose"
          title="Mission & Vision of SARY Foundation"
          subtitle="Guided by selfless community service and sustainable green stewardship for our planet."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Mission Box */}
          <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-card flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-forest text-white flex items-center justify-center shadow-lg">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-brand-dark">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                To mobilize citizens, students, and professionals through continuous ground-level clean-up drives, urban afforestation, and educational workshops, transforming consumer habits and conserving natural waterbodies for current and future generations.
              </p>
              <ul className="space-y-2.5 pt-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Execute weekly plogging and ghat waste recovery drives</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Plant and nurture indigenous biodiversity across public spaces</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Promote decentralized waste segregation and plastic elimination</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Vision Box */}
          <div className="bg-gradient-to-br from-[#0B2722] to-[#143d35] text-white rounded-3xl p-8 sm:p-10 border border-emerald-900 shadow-card flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold text-brand-dark flex items-center justify-center shadow-lg">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                A thriving planet where every community lives in harmonious balance with nature, cities are free of open waste dumps, rivers flow unpolluted, and every citizen acts as an empowered guardian of the ecosystem.
              </p>
              <ul className="space-y-2.5 pt-2 text-sm text-gray-200">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Zero-waste neighborhoods through local circular economies</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Restored urban water ecosystems and healthy aquatic life</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Youth leadership driving environmental policies and grassroots action</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
