import React from 'react';
import SectionHeading from '../../common/SectionHeading';
import { Building2, Recycle, CloudRain, Fish, Trees, Users2 } from 'lucide-react';

const sdgItems = [
  {
    number: '11',
    title: 'Sustainable Cities & Communities',
    desc: 'Making urban habitats inclusive, safe, resilient, and free of litter and roadside dumping.',
    icon: Building2,
    color: 'from-amber-500 to-amber-600'
  },
  {
    number: '12',
    title: 'Responsible Consumption & Production',
    desc: 'Promoting zero-waste lifestyles, single-use plastic elimination, and fabric upcycling.',
    icon: Recycle,
    color: 'from-yellow-600 to-yellow-700'
  },
  {
    number: '13',
    title: 'Climate Action',
    desc: 'Combating climate emergencies through mass urban tree plantation and micro-forest creation.',
    icon: CloudRain,
    color: 'from-emerald-600 to-emerald-700'
  },
  {
    number: '14',
    title: 'Life Below Water',
    desc: 'Preventing plastic debris and hazardous micro-waste from entering rivers and urban waterbodies.',
    icon: Fish,
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '15',
    title: 'Life On Land',
    desc: 'Protecting, restoring, and promoting the sustainable use of terrestrial ecosystems.',
    icon: Trees,
    color: 'from-green-600 to-green-700'
  },
  {
    number: '17',
    title: 'Partnerships for the Goals',
    desc: 'Fostering collective collaboration between youth, schools, authorities, and corporations.',
    icon: Users2,
    color: 'from-teal-700 to-teal-800'
  }
];

const SDGSection = () => {
  return (
    <section className="py-20 bg-emerald-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Global Goals"
          title="Committed to UN Sustainable Development Goals"
          subtitle="Our campaigns and drives directly advance key United Nations Sustainable Development Goals for sustainable environmental impact."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sdgItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="group relative bg-white rounded-3xl p-7 border border-gray-100 shadow-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center font-extrabold text-xl shadow-md group-hover:scale-105 transition`}>
                    {item.number}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-forest flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-forest transition">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SDGSection;
