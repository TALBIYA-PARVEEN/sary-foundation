import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { Lock, User, ShieldCheck, ArrowRight, Loader2, Leaf } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, admin, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast('Please enter both username and password.', 'error');
      return;
    }

    setLoading(true);
    try {
      await login(username, password);
      toast('Welcome back! Successfully logged into SARY Admin Portal.', 'success');
      navigate('/sary-portal/dashboard');
    } catch (err) {
      toast(err.message || 'Invalid credentials or connection error.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071916] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0B2722] border border-emerald-900/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="text-center space-y-4 mb-8 relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-[#FAF7F2] p-2 flex items-center justify-center mx-auto shadow-2xl border-2 border-emerald-400/40">
            <img src="/sary-logo.png" alt="SARY Foundation" className="w-full h-full object-contain rounded-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-wide">
              SARY Foundation
            </h2>
            <p className="text-xs text-emerald-400 font-semibold uppercase tracking-widest mt-0.5">
              Secure Administrative Portal
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              Admin Username or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. saryadmin"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-emerald-900/60 text-white text-sm focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-emerald-900/60 text-white text-sm focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full eco-gradient-btn text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Authorize & Login</span>
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-8 pt-6 border-t border-emerald-950 text-center">
          <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-brand-gold" />
            <span>Encrypted Session • Rate-Limited Authentication</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
