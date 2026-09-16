import React from 'react';
import { Play, Video, PlusCircle } from 'lucide-react';

const VideoGrid = ({ videos, onSelect }) => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((item) => (
          <div
            key={item._id}
            onClick={() => onSelect(item)}
            className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 cursor-pointer flex flex-col"
          >
            {/* Thumbnail Box with Play Badge */}
            <div className="relative aspect-video overflow-hidden bg-black">
              <img
                src={item.thumbnail || 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80'}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-brand-forest/90 group-hover:bg-brand-emerald text-white flex items-center justify-center shadow-2xl transition transform group-hover:scale-110">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-[11px] font-bold text-white shadow-sm flex items-center gap-1">
                  <Video className="w-3 h-3 text-emerald-400" />
                  {item.category || 'Video'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-between">
              <h4 className="font-bold text-brand-dark text-base group-hover:text-brand-forest transition line-clamp-1">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Future Video Placeholder Spaces */}
        <div className="rounded-3xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 p-8 flex flex-col items-center justify-center text-center space-y-3 aspect-video hover:border-brand-forest transition">
          <div className="w-12 h-12 rounded-2xl bg-white text-brand-forest shadow-sm flex items-center justify-center">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-brand-dark">Docu-Series Video Space</h4>
            <p className="text-xs text-gray-500 max-w-xs mt-1">
              Documentary coverage and river revival stories will be published here.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Space Reserved
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoGrid;
