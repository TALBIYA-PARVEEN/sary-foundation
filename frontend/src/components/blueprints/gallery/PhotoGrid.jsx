import React from 'react';
import { ZoomIn, Tag, PlusCircle } from 'lucide-react';

const PhotoGrid = ({ photos, onSelect }) => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((item) => (
          <div
            key={item._id}
            onClick={() => onSelect(item)}
            className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 cursor-pointer flex flex-col"
          >
            {/* Image Box */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={item.thumbnail || item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-brand-dark flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition">
                  <ZoomIn className="w-5 h-5 text-brand-forest" />
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-brand-dark shadow-sm">
                  {item.category || 'General'}
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

        {/* Future Photo Placeholder Spaces for Upcoming Drives */}
        <div className="rounded-3xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-8 flex flex-col items-center justify-center text-center space-y-3 aspect-[4/3] hover:border-brand-forest transition shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-white p-1 text-brand-forest shadow-md flex items-center justify-center border border-emerald-200">
            <img src="/sary-logo.png" alt="SARY" className="w-full h-full object-contain rounded-xl" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-brand-dark">Ghat Cleanliness Drive #1</h4>
            <p className="text-xs text-gray-500 max-w-xs mt-1">
              Field photos from our upcoming inaugural Sunday morning cleanliness drive will be posted here.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
            Inaugural Drive Reserved
          </span>
        </div>

        <div className="rounded-3xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-8 flex flex-col items-center justify-center text-center space-y-3 aspect-[4/3] hover:border-brand-forest transition shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-white p-1 text-brand-forest shadow-md flex items-center justify-center border border-emerald-200">
            <img src="/sary-logo.png" alt="SARY" className="w-full h-full object-contain rounded-xl" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-brand-dark">Urban Tree Plantation Drive</h4>
            <p className="text-xs text-gray-500 max-w-xs mt-1">
              Field moments of native sapling planting across Kanpur will be documented here.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
            Drive Space Reserved
          </span>
        </div>

        <div className="rounded-3xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-8 flex flex-col items-center justify-center text-center space-y-3 aspect-[4/3] hover:border-brand-forest transition shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-white p-1 text-brand-forest shadow-md flex items-center justify-center border border-emerald-200">
            <img src="/sary-logo.png" alt="SARY" className="w-full h-full object-contain rounded-xl" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-brand-dark">Zero-Waste Community Workshop</h4>
            <p className="text-xs text-gray-500 max-w-xs mt-1">
              Photos from our school and neighborhood source segregation drives will appear here.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
            Workshop Space Reserved
          </span>
        </div>
      </div>
    </div>
  );
};

export default PhotoGrid;
