import React, { useState, useEffect } from 'react';
import { volunteerService } from '../../../services';
import { useToast } from '../../../context/ToastContext';
import { Users, Phone, Mail, MapPin, Calendar, Trash2, CheckCircle2, Clock } from 'lucide-react';

const VolunteersManager = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const { toast } = useToast();

  const fetchVolunteers = async () => {
    try {
      const res = await volunteerService.getVolunteers(statusFilter);
      if (res.success && res.data) {
        setVolunteers(res.data);
      }
    } catch (err) {
      toast('Failed to load volunteers: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await volunteerService.updateStatus(id, newStatus);
      toast(`Volunteer status updated to ${newStatus}`, 'success');
      setVolunteers((prev) =>
        prev.map((v) => (v._id === id ? { ...v, status: newStatus } : v))
      );
    } catch (err) {
      toast('Error updating status: ' + err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this volunteer record?')) return;
    try {
      await volunteerService.deleteVolunteer(id);
      toast('Volunteer record deleted', 'success');
      setVolunteers((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      toast('Error deleting: ' + err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-brand-dark">
            Volunteer Registrations
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Review citizen sign-ups, filter by status, and coordinate upcoming cleanliness drives.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white outline-none"
          >
            <option value="">All Volunteers</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="approved">Approved</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading volunteers...</div>
      ) : volunteers.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-gray-600">No volunteer registrations found</p>
          <p className="text-xs text-gray-400 mt-1">When visitors register on the website, their details appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {volunteers.map((v) => (
            <div
              key={v._id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-brand-dark">{v.name}</h4>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mt-1">
                      {v.interest}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      v.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : v.status === 'contacted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {v.status || 'pending'}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    <a href={`mailto:${v.email}`} className="hover:underline font-medium text-gray-900">
                      {v.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <a href={`tel:${v.phone}`} className="hover:underline font-medium text-gray-900">
                      {v.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>City: <strong>{v.city}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Availability: <strong>{v.availability}</strong></span>
                  </div>
                </div>

                {v.message && (
                  <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 italic">
                    "{v.message}"
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(v._id, 'contacted')}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    Mark Contacted
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(v._id, 'approved')}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  >
                    Approve
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(v._id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteersManager;
