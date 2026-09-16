import React, { useState, useEffect } from 'react';
import { contactService } from '../../../services';
import { useToast } from '../../../context/ToastContext';
import { Mail, Phone, Clock, Trash2, CheckCircle2, MessageSquare, Reply } from 'lucide-react';

const InquiriesManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const { toast } = useToast();

  const fetchContacts = async () => {
    try {
      const res = await contactService.getContacts(statusFilter);
      if (res.success && res.data) {
        setContacts(res.data);
      }
    } catch (err) {
      toast('Failed to load contact inquiries: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await contactService.updateStatus(id, newStatus);
      toast(`Inquiry marked as ${newStatus}`, 'success');
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      toast('Error updating status: ' + err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await contactService.deleteContact(id);
      toast('Inquiry deleted', 'success');
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      toast('Error deleting: ' + err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-brand-dark">
            Citizen & Partner Inquiries
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Messages received through the public Contact Us form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white outline-none"
          >
            <option value="">All Inquiries</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading inquiries...</div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-gray-600">No inquiries found</p>
          <p className="text-xs text-gray-400 mt-1">When citizens message SARY Foundation, their inquiries will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div
              key={c._id}
              className={`bg-white rounded-2xl p-6 border transition shadow-sm hover:shadow flex flex-col justify-between space-y-4 ${
                c.status === 'unread' ? 'border-emerald-300 bg-emerald-50/10' : 'border-gray-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-brand-dark">{c.name}</h4>
                    {c.status === 'unread' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </div>
                  <div className="text-xs font-semibold text-brand-forest mt-0.5">
                    Subject: {c.subject || 'General Inquiry'}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                      c.status === 'replied'
                        ? 'bg-emerald-100 text-emerald-800'
                        : c.status === 'read'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {c.status || 'unread'}
                  </span>
                  <span className="text-gray-400">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="bg-gray-50 rounded-xl p-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
                {c.message}
              </div>

              {/* Footer Details & Actions */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <a
                    href={`mailto:${c.email}`}
                    className="flex items-center gap-1.5 hover:text-brand-forest font-semibold"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{c.email}</span>
                  </a>
                  {c.phone && (
                    <a
                      href={`tel:${c.phone}`}
                      className="flex items-center gap-1.5 hover:text-brand-forest font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{c.phone}</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject || 'SARY Foundation Inquiry')}`}
                    onClick={() => handleStatusChange(c._id, 'replied')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold flex items-center gap-1 transition"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>

                  {c.status !== 'read' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(c._id, 'read')}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold"
                    >
                      Mark Read
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(c._id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                    title="Delete inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InquiriesManager;
