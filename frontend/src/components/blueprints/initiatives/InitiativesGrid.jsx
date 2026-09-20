import React, { useState, useEffect } from 'react';
import SectionHeading from '../../common/SectionHeading';
import InitiativeCard from './InitiativeCard';
import Modal from '../../common/Modal';
import { initiativeService } from '../../../services';
import { Link } from 'react-router-dom';
import { Users, Heart } from 'lucide-react';

const categories = ['All', 'Cleanliness', 'Reforestation', 'Upcycling', 'Education', 'Water Revival'];

const InitiativesGrid = ({ onOpenDonate }) => {
  const [initiatives, setInitiatives] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const res = await initiativeService.getInitiatives();
        if (res.success && res.data) {
          setInitiatives(res.data);
        }
      } catch (err) {
        console.warn('Error loading initiatives:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitiatives();
  }, []);

  const filtered = activeCategory === 'All'
    ? initiatives
    : initiatives.filter(i => i.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Planned Action Programs"
          title="Upcoming Environmental Drives & Initiatives"
          subtitle="Explore the planned grassroots campaigns designed by SARY Foundation to rehabilitate ecosystems, protect waterbodies, and foster zero-waste community habits."
        />

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                activeCategory === cat
                  ? 'bg-brand-forest text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <InitiativeCard
              key={item._id}
              initiative={item}
              onSelect={(init) => setSelectedInitiative(init)}
            />
          ))}
        </div>

        {/* Initiative Details Modal */}
        <Modal
          isOpen={!!selectedInitiative}
          onClose={() => setSelectedInitiative(null)}
          title={selectedInitiative?.title || 'Initiative Details'}
          maxWidth="max-w-2xl"
        >
          {selectedInitiative && (
            <div className="space-y-5">
              <div className="rounded-2xl overflow-hidden p-6 bg-gradient-to-r from-[#071916] via-[#0D3B2F] to-[#15803D] text-white flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {selectedInitiative.category} • Planned Campaign
                  </span>
                  <h4 className="text-xl font-bold">{selectedInitiative.title}</h4>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 p-1 border border-white/20 shrink-0">
                  <img src="/sary-logo.png" alt="SARY" className="w-full h-full object-contain rounded-xl" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-brand-dark">
                  {selectedInitiative.title}
                </h3>
                {selectedInitiative.tagline && (
                  <p className="text-sm font-semibold text-gray-500 mt-0.5">
                    {selectedInitiative.tagline}
                  </p>
                )}
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {selectedInitiative.description}
              </p>

              <div className="bg-emerald-50 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold">Planned Milestone Target</div>
                  <div className="text-lg font-black text-brand-dark">{selectedInitiative.target} {selectedInitiative.unit}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 uppercase font-bold">Campaign Status</div>
                  <div className="text-sm font-black text-emerald-700">Volunteer Enlistment Active</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  to="/volunteer"
                  onClick={() => setSelectedInitiative(null)}
                  className="flex-1 eco-gradient-btn text-white font-bold py-3 rounded-full text-center text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Volunteer for this Drive</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedInitiative(null);
                    onOpenDonate();
                  }}
                  className="sm:w-44 bg-brand-dark hover:bg-black text-white font-bold py-3 rounded-full text-center text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-current text-brand-gold" />
                  <span>Sponsor Drive</span>
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default InitiativesGrid;
