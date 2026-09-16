import React from 'react';
import { Image, Video, Sparkles } from 'lucide-react';

const categories = ['All', 'Drives', 'Plantation', 'Youth', 'Press', 'Events'];

const GalleryFilter = ({ activeType, setActiveType, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-gray-200">
      {/* Media Type Tabs: All / Photos / Videos */}
      <div className="inline-flex p-1.5 bg-gray-100 rounded-full">
        <button
          type="button"
          onClick={() => setActiveType('')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
            activeType === ''
              ? 'bg-white text-brand-dark shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-forest" />
          <span>All Media</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveType('photo')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
            activeType === 'photo'
              ? 'bg-white text-brand-dark shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Image className="w-3.5 h-3.5 text-brand-forest" />
          <span>Photos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveType('video')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
            activeType === 'video'
              ? 'bg-white text-brand-dark shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Video className="w-3.5 h-3.5 text-brand-forest" />
          <span>Videos</span>
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              activeCategory === cat
                ? 'bg-brand-forest text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryFilter;
