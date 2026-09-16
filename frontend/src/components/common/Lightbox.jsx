import React, { useEffect } from 'react';
import { X, Calendar, Tag } from 'lucide-react';

const Lightbox = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  // Convert regular YouTube link to embed link if needed
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#0B2722] text-white rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/60 max-w-4xl w-full max-h-[92vh] flex flex-col z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Content */}
        <div className="bg-black/90 flex items-center justify-center min-h-[320px] max-h-[60vh] overflow-hidden">
          {item.type === 'video' ? (
            <iframe
              src={getEmbedUrl(item.url)}
              title={item.title}
              className="w-full aspect-video h-full min-h-[360px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={item.url}
              alt={item.title}
              className="max-w-full max-h-[60vh] object-contain"
            />
          )}
        </div>

        {/* Metadata */}
        <div className="p-6 space-y-3 bg-[#0B2722]">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-600/30 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {item.category || 'General'}
            </span>
            {item.eventDate && (
              <span className="text-gray-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(item.eventDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-white leading-snug">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-sm text-gray-300 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
