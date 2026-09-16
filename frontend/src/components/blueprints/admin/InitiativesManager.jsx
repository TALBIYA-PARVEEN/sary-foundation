import React, { useState, useEffect } from 'react';
import { initiativeService } from '../../../services';
import { useToast } from '../../../context/ToastContext';
import { Plus, Trash2, Tag, Compass, Sparkles } from 'lucide-react';

const InitiativesManager = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    tagline: '',
    category: 'Cleanliness',
    description: '',
    target: 100,
    achieved: 0,
    unit: 'Drives',
    image: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchInitiatives = async () => {
    try {
      const res = await initiativeService.getInitiatives();
      if (res.success && res.data) {
        setInitiatives(res.data);
      }
    } catch (err) {
      toast('Failed to load initiatives: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitiatives();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast('Title and description are required', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await initiativeService.createInitiative({
        ...form,
        target: Number(form.target),
        achieved: Number(form.achieved)
      });
      if (res.success) {
        toast('New initiative created successfully!', 'success');
        setForm({
          title: '',
          tagline: '',
          category: 'Cleanliness',
          description: '',
          target: 100,
          achieved: 0,
          unit: 'Drives',
          image: ''
        });
        setShowAddModal(false);
        fetchInitiatives();
      }
    } catch (err) {
      toast(err.message || 'Error creating initiative', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this initiative?')) return;
    try {
      await initiativeService.deleteInitiative(id);
      toast('Initiative deleted', 'success');
      setInitiatives((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      toast('Error deleting: ' + err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-brand-dark">
            Initiatives & Campaigns Manager
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Add or update environmental action programs and track drive milestones.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="eco-gradient-btn text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Initiative</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading initiatives...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initiatives.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase">
                      {item.category}
                    </span>
                    <h4 className="text-lg font-bold text-brand-dark mt-2">{item.title}</h4>
                    {item.tagline && (
                      <p className="text-xs font-semibold text-gray-500">{item.tagline}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="bg-gray-50 rounded-xl p-3 flex justify-between text-xs font-bold text-gray-700">
                  <span>Goal: {item.target} {item.unit}</span>
                  <span className="text-brand-forest">Completed: {item.achieved} {item.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal to add initiative */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-5">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-bold text-brand-dark">
                Add New Initiative
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
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project Nirmal Ghats"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-forest outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Riverbank Cleanliness & Water Conservation"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-forest outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-forest outline-none bg-white"
                  >
                    <option value="Cleanliness">Cleanliness</option>
                    <option value="Reforestation">Reforestation</option>
                    <option value="Upcycling">Upcycling</option>
                    <option value="Education">Education</option>
                    <option value="Water Revival">Water Revival</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Progress Unit
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Drives, Saplings, Tons"
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-forest outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Target Goal Number
                  </label>
                  <input
                    type="number"
                    value={form.target}
                    onChange={(e) => setForm({ ...form, target: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-forest outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Achieved Currently
                  </label>
                  <input
                    type="number"
                    value={form.achieved}
                    onChange={(e) => setForm({ ...form, achieved: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-forest outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-forest outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder="Detailed description of what this initiative accomplishes..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-forest outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
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
                  {submitting ? 'Creating...' : 'Create Initiative'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InitiativesManager;
