import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/common/SectionHeading';
import GalleryFilter from '../components/blueprints/gallery/GalleryFilter';
import PhotoGrid from '../components/blueprints/gallery/PhotoGrid';
import VideoGrid from '../components/blueprints/gallery/VideoGrid';
import Lightbox from '../components/common/Lightbox';
import { mediaService } from '../services';

const GalleryPage = () => {
  const [media, setMedia] = useState([]);
  const [activeType, setActiveType] = useState(''); // '' | 'photo' | 'video'
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await mediaService.getMedia(activeType, activeCategory);
      if (res.success && res.data) {
        setMedia(res.data);
      }
    } catch (err) {
      console.warn('Error fetching media:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [activeType, activeCategory]);

  const photos = media.filter((m) => m.type === 'photo');
  const videos = media.filter((m) => m.type === 'video');

  return (
    <div className="pt-28">
      {/* Subpage Header Banner */}
      <div className="bg-[#0B2722] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-transparent to-emerald-900/40" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
            Upcoming Action & Media Hub
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold">
            Media & Field Gallery
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Our inaugural cleanliness and afforestation campaigns in Kanpur are in active preparation. Field photos and documentary coverage will be published here after our inaugural drives commence.
          </p>
        </div>
      </div>

      {/* Gallery Content Area */}
      <section className="py-20 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <GalleryFilter
            activeType={activeType}
            setActiveType={setActiveType}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {loading ? (
            <div className="py-20 text-center text-gray-400 font-semibold">
              Loading gallery media...
            </div>
          ) : (
            <div className="space-y-16">
              {/* Show Photos */}
              {(activeType === '' || activeType === 'photo') && (
                <div>
                  {activeType === '' && (
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-forest" />
                      <h3 className="text-xl font-bold text-brand-dark">Photographs</h3>
                    </div>
                  )}
                  <PhotoGrid photos={photos} onSelect={(item) => setSelectedItem(item)} />
                </div>
              )}

              {/* Show Videos */}
              {(activeType === '' || activeType === 'video') && (
                <div>
                  {activeType === '' && (
                    <div className="flex items-center gap-3 mb-6 pt-8 border-t border-gray-100">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-forest" />
                      <h3 className="text-xl font-bold text-brand-dark">Documentary Videos</h3>
                    </div>
                  )}
                  <VideoGrid videos={videos} onSelect={(item) => setSelectedItem(item)} />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox / Video Player Modal */}
      <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default GalleryPage;
