import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ChevronDown, 
  Menu, 
  X, 
  Heart,
  Leaf
} from 'lucide-react';

const Navbar = ({ onOpenDonate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdown(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Contact & Social Bar (Kanpur Ploggers Style) */}
      <div className={`bg-[#0B2722] text-white/90 text-xs py-2 px-4 transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Contact Details */}
          <div className="flex items-center gap-6">
            <a 
              href="tel:+919517330895" 
              className="flex items-center gap-1.5 hover:text-emerald-400 transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 9517330895</span>
            </a>
            <a 
              href="mailto:arshahmad441@gmail.com" 
              className="flex items-center gap-1.5 hover:text-emerald-400 transition"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>arshahmad441@gmail.com</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-white/70">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition" aria-label="Twitter">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition" aria-label="LinkedIn">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Floating Pill Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className={`navbar-pill rounded-full px-5 py-2.5 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'shadow-xl bg-white/95' : 'bg-white/90 shadow-pill'
        }`}>
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-emerald-500/40 shadow-md group-hover:scale-105 transition transform bg-[#FAF7F2] flex items-center justify-center shrink-0 p-0.5">
              <img 
                src="/sary-logo.png" 
                alt="SARY Foundation Logo" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg text-brand-dark tracking-wide leading-none group-hover:text-brand-forest transition">
                SARY <span className="text-brand-forest">FOUNDATION</span>
              </span>
              <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase mt-0.5">
                Clean • Green • Social Impact
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link 
              to="/" 
              className={`text-sm font-semibold transition hover:text-brand-forest ${
                location.pathname === '/' ? 'text-brand-forest font-bold' : 'text-brand-dark'
              }`}
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAboutDropdown(true)}
              onMouseLeave={() => setAboutDropdown(false)}
            >
              <button 
                className={`text-sm font-semibold flex items-center gap-1 transition hover:text-brand-forest ${
                  location.pathname.startsWith('/about') ? 'text-brand-forest font-bold' : 'text-brand-dark'
                }`}
              >
                About Us
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>

              {aboutDropdown && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2.5 text-sm z-50 animate-fadeIn">
                  <Link 
                    to="/about" 
                    className="block px-4 py-2 hover:bg-emerald-50 hover:text-brand-forest text-gray-700 font-medium transition"
                  >
                    Mission & Vision
                  </Link>
                  <Link 
                    to="/about#story" 
                    className="block px-4 py-2 hover:bg-emerald-50 hover:text-brand-forest text-gray-700 font-medium transition"
                  >
                    Our Story
                  </Link>
                  <Link 
                    to="/about#documents" 
                    className="block px-4 py-2 hover:bg-emerald-50 hover:text-brand-forest text-gray-700 font-medium transition"
                  >
                    Documents & Certifications
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/initiatives" 
              className={`text-sm font-semibold transition hover:text-brand-forest ${
                location.pathname === '/initiatives' ? 'text-brand-forest font-bold' : 'text-brand-dark'
              }`}
            >
              Our Initiatives
            </Link>

            <Link 
              to="/gallery" 
              className={`text-sm font-semibold transition hover:text-brand-forest ${
                location.pathname === '/gallery' ? 'text-brand-forest font-bold' : 'text-brand-dark'
              }`}
            >
              Media Gallery
            </Link>

            <Link 
              to="/volunteer" 
              className={`text-sm font-semibold transition hover:text-brand-forest ${
                location.pathname === '/volunteer' ? 'text-brand-forest font-bold' : 'text-brand-dark'
              }`}
            >
              Get Involved
            </Link>

            <Link 
              to="/contact" 
              className={`text-sm font-semibold transition hover:text-brand-forest ${
                location.pathname === '/contact' ? 'text-brand-forest font-bold' : 'text-brand-dark'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action Button: Donate Now */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={onOpenDonate}
              className="eco-gradient-btn text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-white" />
              <span>DONATE NOW</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 text-brand-dark transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200 px-6 py-5 shadow-2xl mx-4 rounded-3xl mt-1 space-y-4">
          {/* Mobile Branded Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-500/30 bg-[#FAF7F2] p-0.5 shrink-0 shadow-sm">
              <img src="/sary-logo.png" alt="SARY Foundation" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="font-extrabold text-base text-brand-dark leading-tight">SARY FOUNDATION</div>
              <div className="text-[10px] text-brand-forest font-bold uppercase">Empowering People & Nature</div>
            </div>
          </div>

          <div className="flex flex-col space-y-3 font-semibold text-brand-dark">
            <Link to="/" className="py-2 hover:text-brand-forest border-b border-gray-100">
              Home
            </Link>
            <Link to="/about" className="py-2 hover:text-brand-forest border-b border-gray-100">
              About Us (Mission & Vision)
            </Link>
            <Link to="/initiatives" className="py-2 hover:text-brand-forest border-b border-gray-100">
              Our Initiatives
            </Link>
            <Link to="/gallery" className="py-2 hover:text-brand-forest border-b border-gray-100">
              Media Gallery (Photos & Videos)
            </Link>
            <Link to="/volunteer" className="py-2 hover:text-brand-forest border-b border-gray-100">
              Become a Volunteer
            </Link>
            <Link to="/contact" className="py-2 hover:text-brand-forest">
              Contact Us
            </Link>
          </div>

          <div className="pt-2">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              className="w-full eco-gradient-btn text-white text-sm font-bold uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 shadow-md"
            >
              <Heart className="w-4 h-4 fill-current text-white" />
              <span>DONATE NOW</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
