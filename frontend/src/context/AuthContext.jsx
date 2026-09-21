import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('sary_admin_info') : null;
      return saved ? JSON.parse(saved) : null;
    } catch (_) {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return typeof window !== 'undefined' ? (localStorage.getItem('sary_admin_token') || null) : null;
    } catch (_) {
      return null;
    }
  });

  const [loading, setLoading] = useState(() => {
    try {
      return typeof window !== 'undefined' && !!localStorage.getItem('sary_admin_token');
    } catch (_) {
      return false;
    }
  });

  useEffect(() => {
    let isMounted = true;

    const verifyToken = async () => {
      if (token) {
        try {
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Auth check timeout')), 4000)
          );
          const res = await Promise.race([authService.getMe(), timeoutPromise]);
          if (isMounted && res && res.success && res.admin) {
            setAdmin(res.admin);
            localStorage.setItem('sary_admin_info', JSON.stringify(res.admin));
          }
        } catch (err) {
          console.warn('Session verification notice:', err.message);
          if (err.message.includes('expired') || err.message.includes('401')) {
            logout();
          }
        }
      }
      if (isMounted) setLoading(false);
    };

    verifyToken();
    return () => { isMounted = false; };
  }, [token]);

  const login = async (username, password) => {
    const res = await authService.login(username, password);
    if (res.success && res.token) {
      localStorage.setItem('sary_admin_token', res.token);
      localStorage.setItem('sary_admin_info', JSON.stringify(res.admin));
      setToken(res.token);
      setAdmin(res.admin);
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const logout = () => {
    localStorage.removeItem('sary_admin_token');
    localStorage.removeItem('sary_admin_info');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, isAuthenticated: !!token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
