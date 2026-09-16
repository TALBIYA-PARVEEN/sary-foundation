import React, { useState, useEffect } from 'react';
import { statsService } from '../../../services';
import { useToast } from '../../../context/ToastContext';
import { Award, Save, RefreshCw, CheckCircle2 } from 'lucide-react';

const StatsManager = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const { toast } = useToast();

  const fetchStats = async () => {
    try {
      const res = await statsService.getStats();
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      toast('Failed to load live statistics: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleUpdate = async (stat) => {
    setSavingId(stat._id);
    try {
      await statsService.updateStat(stat._id, {
        value: Number(stat.value),
        label: stat.label,
        suffix: stat.suffix
      });
      toast(`Updated "${stat.label}" successfully!`, 'success');
    } catch (err) {
      toast('Failed to update: ' + err.message, 'error');
    } finally {
      setSavingId(null);
    }
  };

  const handleChange = (id, field, val) => {
    setStats((prev) =>
      prev.map((s) => (s._id === id ? { ...s, [field]: val } : s))
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-brand-dark">
            Homepage Impact Statistics
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Update the live counters displayed on the public homepage.
          </p>
        </div>
        <button
          onClick={fetchStats}
          className="p-2.5 rounded-full hover:bg-gray-100 text-gray-500 transition"
          title="Refresh stats"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase">
                  {item.key}
                </span>
                <span className="text-xs text-gray-400">ID: {item._id}</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Metric Label
                </label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleChange(item._id, 'label', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-brand-dark focus:border-brand-forest outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Current Number
                  </label>
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => handleChange(item._id, 'value', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-base font-black text-brand-dark focus:border-brand-forest outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Suffix (e.g. +, Mt+)
                  </label>
                  <input
                    type="text"
                    value={item.suffix || ''}
                    onChange={(e) => handleChange(item._id, 'suffix', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-brand-dark focus:border-brand-forest outline-none"
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={savingId === item._id}
                onClick={() => handleUpdate(item)}
                className="w-full eco-gradient-btn text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {savingId === item._id ? (
                  <span>Saving Changes...</span>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Metric</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatsManager;
