import React, { useState, useEffect } from 'react';
import { donationService } from '../../../services';
import { useToast } from '../../../context/ToastContext';
import { 
  Heart, 
  Search, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp,
  CreditCard
} from 'lucide-react';

const DonationsManager = () => {
  const [donations, setDonations] = useState([]);
  const [summary, setSummary] = useState({
    totalRaised: 0,
    totalDonations: 0,
    uniqueDonors: 0,
    averageDonation: 0
  });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await donationService.getDonations({
        status: statusFilter,
        search
      });
      if (res.success) {
        setDonations(res.data || []);
        if (res.summary) {
          setSummary(res.summary);
        }
      }
    } catch (err) {
      toast('Failed to load donations: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDonations();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-brand-dark">Donation Transactions</h2>
          <p className="text-xs text-gray-500">
            Track real-time contributions, Razorpay payment verification, and 80G tax receipts.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchDonations}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 shadow-xs transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-brand-forest flex items-center justify-center mb-3">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div className="text-2xl font-black text-brand-dark">
            ₹{summary.totalRaised.toLocaleString('en-IN')}
          </div>
          <div className="text-xs font-semibold text-gray-500 mt-0.5">Total Funds Raised</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
            <CreditCard className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-brand-dark">
            {summary.totalDonations}
          </div>
          <div className="text-xs font-semibold text-gray-500 mt-0.5">Successful Donations</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-brand-dark">
            {summary.uniqueDonors}
          </div>
          <div className="text-xs font-semibold text-gray-500 mt-0.5">Unique Donors</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-brand-dark">
            ₹{summary.averageDonation.toLocaleString('en-IN')}
          </div>
          <div className="text-xs font-semibold text-gray-500 mt-0.5">Average Contribution</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by name, email, receipt #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-white text-gray-700 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="captured">Captured (Successful)</option>
            <option value="created">Created (Incomplete)</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Table of Donations */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-gray-400 font-semibold">Loading donation records...</div>
        ) : donations.length === 0 ? (
          <div className="py-16 text-center text-gray-400 space-y-2">
            <Heart className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="font-semibold text-sm">No donation records found</p>
            <p className="text-xs text-gray-400">Transactions processed via Razorpay will be listed here automatically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Donor Name</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Receipt #</th>
                  <th className="py-3 px-4">Payment ID</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {donations.map((d) => (
                  <tr key={d._id} className="hover:bg-gray-50/60 transition">
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      <div>{d.donorName}</div>
                      {d.panNumber && (
                        <div className="text-[10px] text-gray-400 font-mono">PAN: {d.panNumber}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <a href={`mailto:${d.donorEmail}`} className="text-brand-forest hover:underline font-semibold block">
                        {d.donorEmail}
                      </a>
                      {d.donorPhone && (
                        <div className="text-[10px] text-gray-400">{d.donorPhone}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-black text-gray-900 text-sm">
                      ₹{Number(d.amount).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-800">
                      {d.receiptNumber || '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-600">
                      {d.razorpayPaymentId || d.razorpayOrderId}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        d.status === 'captured'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : d.status === 'failed'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {d.status === 'captured' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        <span>{d.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                      {new Date(d.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationsManager;
