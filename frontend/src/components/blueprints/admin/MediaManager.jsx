import React, { useState, useEffect } from 'react';
import { mediaService } from '../../../services';
import { useToast } from '../../../context/ToastContext';
import { Image, Video, Plus, Trash2, Tag, Calendar, ExternalLink, Loader2, Sparkles } from 'lucide-react';

const MediaManager = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    type: 'photo',
    url: '',
    thumbnail: '',
    category: 'Drives',
    description: '',
    featured: false
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchMedia = async () => {
    try {
      const res = await mediaService.getMedia();
      if (res.success && res.data) {
        setMediaList(res.data);
      }
    } catch (err) {
      toast('Failed to load media items: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.url) {
      toast('Title and URL are required', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await mediaService.createMedia(form);
      if (res.success) {
        toast('Media item posted successfully!', 'success');
        setForm({
          title: '',
          type: 'photo',
          url: '',
          thumbnail: '',
          category: 'Drives',
          description: '',
          featured: false
        });
        setShowAddModal(false);
        fetchMedia();
      }
    } catch (err) {
      toast(err.message || 'Failed to add media', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media item?')) return;
    try {
      await mediaService.deleteMedia(id);
      toast('Media deleted successfully', 'success');
      setMediaList((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      toast('Error deleting media: ' + err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h3 className="text-xl font-bold text-brand-dark">
            Media & Gallery Manager
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Post new photographs from weekend drives, link YouTube documentary videos, and manage the public gallery.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="eco-gradient-btn text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Photo / Video</span>
        </button>
      </div>

      {/* Media Items Table / Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading media items...</div>
      ) : mediaList.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
          <Image className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-gray-600">No media uploaded yet</p>
          <p className="text-xs text-gray-400 mt-1">Click "Post Photo / Video" above to add your first drive photos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaList.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-black/90">
                <img
                  src={item.thumbnail || item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white uppercase flex items-center gap-1">
                    {item.type === 'video' ? <Video className="w-3 h-3 text-emerald-400" /> : <Image className="w-3 h-3 text-emerald-400" />}
                    {item.type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-700/80 backdrop-blur-sm text-[10px] font-bold text-white">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-sm text-brand-dark line-clamp-1">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-brand-forest hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                    title="Delete Media"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Media Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-bold text-brand-dark">
                Post New Photo or Video Link
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Media Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, type: 'photo' })}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      form.type === 'photo'
                        ? 'border-brand-forest bg-emerald-50 text-brand-forest'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    📷 Photograph
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, type: 'video' })}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      form.type === 'video'
                        ? 'border-brand-forest bg-emerald-50 text-brand-forest'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    🎬 Video (YouTube)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunday Morning Ganga Ghat Plog Drive"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-forest outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {form.type === 'video' ? 'YouTube Video URL *' : 'Image URL *'}
                </label>
                <input
                  type="url"
                  required
                  placeholder={
                    form.type === 'video'
                      ? 'https://www.youtube.com/watch?v=...'
                      : 'https://images.unsplash.com/... or image link'
                  }
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-forest outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-forest outline-none bg-white"
                >
                  <option value="Drives">Clean-Up Drives</option>
                  <option value="Plantation">Tree Plantation</option>
                  <option value="Youth">Youth Workshops</option>
                  <option value="Press">Press & Media</option>
                  <option value="Events">Community Events</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Brief Description
                </label>
                <textarea
                  rows="2"
                  placeholder="Brief note about the drive or activity..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-forest outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="eco-gradient-btn text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  {submitting ? 'Posting...' : 'Publish to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;
