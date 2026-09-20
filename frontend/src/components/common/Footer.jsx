import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Heart,
  ArrowRight
} from 'lucide-react';

const Footer = ({ onOpenDonate }) => {
  return (
    <footer className="bg-[#0B2722] text-white/80 pt-16 pb-8 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Callout Banner */}
        <div className="bg-gradient-to-r from-emerald-900/60 to-brand-forest/60 border border-emerald-500/20 rounded-3xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to create a cleaner, greener tomorrow?
            </h3>
            <p className="text-emerald-100/80 text-sm max-w-xl">
              Join hands with SARY Foundation. Whether by volunteering on weekly drives or contributing funds, your support transforms local ecosystems.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/volunteer"
              className="bg-white text-brand-dark hover:bg-emerald-50 font-bold px-6 py-3 rounded-full text-sm transition shadow-md flex items-center gap-2"
            >
              <span>Join as Volunteer</span>
              <ArrowRight className="w-4 h-4 text-brand-forest" />
            </Link>
            <button
              onClick={onOpenDonate}
              className="eco-gradient-btn text-white font-bold px-6 py-3 rounded-full text-sm transition shadow-md flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>DONATE NOW</span>
            </button>
          </div>
        </div>

        {/* 4-Column Footer Grid (Kanpur Ploggers Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Col 1: About Foundation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400/40 bg-[#FAF7F2] p-0.5 shrink-0 shadow-lg">
                <img 
                  src="/sary-logo.png" 
                  alt="SARY Foundation Logo" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg text-white tracking-wide leading-tight">
                  SARY <span className="text-emerald-400">FOUNDATION</span>
                </span>
                <span className="text-[10px] text-emerald-300/80 font-bold uppercase tracking-wider">
                  Serving Community & Nature
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-300/80 leading-relaxed">
              A youth-led non-profit movement dedicated to environmental conservation, ghat clean-up drives, plastic waste recovery, urban afforestation, and zero-waste sustainable community living.
            </p>
            <div className="flex items-center gap-3 pt-2 text-emerald-400">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-l-2 border-emerald-500 pl-3">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <span className="text-emerald-500">•</span> Mission & Vision
                </Link>
              </li>
              <li>
                <Link to="/about#documents" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <span className="text-emerald-500">•</span> Official Documents
                </Link>
              </li>
              <li>
                <Link to="/initiatives" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <span className="text-emerald-500">•</span> Our Initiatives
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <span className="text-emerald-500">•</span> Media Gallery
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <span className="text-emerald-500">•</span> Become a Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Impact & Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-l-2 border-emerald-500 pl-3">
              Impact & Policies
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/initiatives" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <span className="text-emerald-500">•</span> Impact Metrics
                </Link>
              </li>
              <li>
                <button onClick={onOpenDonate} className="hover:text-emerald-400 transition flex items-center gap-1.5 text-left">
                  <span className="text-emerald-500">•</span> 80G Tax Exemption Info
                </button>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <span className="text-emerald-500">•</span> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <span className="text-emerald-500">•</span> Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <span className="text-emerald-500">•</span> Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info (Explicit User Details) */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-l-2 border-emerald-500 pl-3">
              Get in Touch
            </h4>
            <p className="text-xs text-gray-400">
              If you’re looking to make a positive impact on the environment and community, contact us today.
            </p>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  Ratanlal Nagar, Kanpur Nagar, Uttar Pradesh (India) - 208022
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+919517330895" className="hover:text-emerald-400 transition text-xs font-semibold">
                  +91 9517330895
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:saryfoundation@gmail.com" className="hover:text-emerald-400 transition text-xs font-semibold">
                  saryfoundation@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2025 SARY Foundation. All rights reserved.</p>
          <p className="text-gray-500">Dedicated to Earth Conservation & Clean Communities.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
