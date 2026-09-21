import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { 
  Image, 
  Compass, 
  BarChart3, 
  Users, 
  MessageSquare, 
  LogOut, 
  Leaf, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import MediaManager from './MediaManager';
import InitiativesManager from './InitiativesManager';
import StatsManager from './StatsManager';
import VolunteersManager from './VolunteersManager';
import InquiriesManager from './InquiriesManager';
import DonationsManager from './DonationsManager';

const AdminDashboard = () => {
  const { admin, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('media');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071916] text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">Verifying Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sary-portal" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex flex-col">
      {/* Admin Top Navbar */}
      <header className="bg-[#0B2722] text-white border-b border-emerald-950 px-6 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-400/40 bg-[#FAF7F2] p-0.5 shadow-md flex items-center justify-center shrink-0">
              <img src="/sary-logo.png" alt="SARY Foundation" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <div className="font-bold text-base tracking-wide flex items-center gap-2">
                <span>SARY Foundation Portal</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase">
                  Admin Active
                </span>
              </div>
              <div className="text-[11px] text-gray-400">
                Logged in as: <strong className="text-gray-200">{admin?.username || 'Admin'}</strong> ({admin?.email})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl transition border border-white/10 font-semibold"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                logout();
                navigate('/sary-portal');
              }}
              className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-900/60 px-3.5 py-2 rounded-xl transition border border-rose-800/40 font-bold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar / Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full flex flex-col md:flex-row gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-3xl p-4 border border-gray-100 shadow-card shrink-0">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 py-2">
            Management Hub
          </div>
          <nav className="space-y-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition text-left ${
                activeTab === 'media'
                  ? 'bg-brand-forest text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Photos & Videos</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('initiatives')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition text-left ${
                activeTab === 'initiatives'
                  ? 'bg-brand-forest text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Initiatives / Drives</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('stats')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition text-left ${
                activeTab === 'stats'
                  ? 'bg-brand-forest text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Impact Live Stats</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('volunteers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition text-left ${
                activeTab === 'volunteers'
                  ? 'bg-brand-forest text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Volunteers</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition text-left ${
                activeTab === 'inquiries'
                  ? 'bg-brand-forest text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Citizen Inquiries</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('donations')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition text-left ${
                activeTab === 'donations'
                  ? 'bg-brand-forest text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-400 fill-current" />
              <span>Donations (Razorpay)</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 w-full overflow-hidden">
          {activeTab === 'media' && <MediaManager />}
          {activeTab === 'initiatives' && <InitiativesManager />}
          {activeTab === 'stats' && <StatsManager />}
          {activeTab === 'volunteers' && <VolunteersManager />}
          {activeTab === 'inquiries' && <InquiriesManager />}
          {activeTab === 'donations' && <DonationsManager />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
