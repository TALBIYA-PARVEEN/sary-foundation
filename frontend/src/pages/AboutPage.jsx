import React from 'react';
import MissionVision from '../components/blueprints/about/MissionVision';
import AboutStory from '../components/blueprints/about/AboutStory';
import DocumentsList from '../components/blueprints/about/DocumentsList';
import { Sparkles, Leaf } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-28">
      {/* Subpage Header Banner */}
      <div className="bg-[#0B2722] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-transparent to-emerald-900/40" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
            About SARY Foundation
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold">
            Dedicated To Earth & Community
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            Discover our founding journey, mission tenets, core governance team, and statutory compliance certifications.
          </p>
        </div>
      </div>

      <MissionVision />
      <AboutStory />
      <DocumentsList />
    </div>
  );
};

export default AboutPage;
