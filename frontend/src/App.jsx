import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import DonationModal from './components/blueprints/donation/DonationModal';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import InitiativesPage from './pages/InitiativesPage';
import GalleryPage from './pages/GalleryPage';
import VolunteerPage from './pages/VolunteerPage';
import ContactPage from './pages/ContactPage';

// Hidden Admin Pages (No link in public UI)
import AdminLogin from './components/blueprints/admin/AdminLogin';
import AdminDashboard from './components/blueprints/admin/AdminDashboard';

// ScrollToTop Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [donateOpen, setDonateOpen] = useState(false);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/sary-portal') || location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FBF8] text-gray-800">
      <ScrollToTop />

      {/* Render Public Header if not on hidden admin portal */}
      {!isAdminRoute && (
        <Navbar onOpenDonate={() => setDonateOpen(true)} />
      )}

      {/* Main Page Routing */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage onOpenDonate={() => setDonateOpen(true)} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/initiatives" element={<InitiativesPage onOpenDonate={() => setDonateOpen(true)} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Hidden Admin Routes (Secret, unlinked from public UI) */}
          <Route path="/sary-portal" element={<AdminLogin />} />
          <Route path="/sary-portal/dashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage onOpenDonate={() => setDonateOpen(true)} />} />
        </Routes>
      </main>

      {/* Render Public Footer if not on hidden admin portal */}
      {!isAdminRoute && (
        <Footer onOpenDonate={() => setDonateOpen(true)} />
      )}

      {/* Universal Donation Modal */}
      <DonationModal
        isOpen={donateOpen}
        onClose={() => setDonateOpen(false)}
      />
    </div>
  );
};

export default App;
