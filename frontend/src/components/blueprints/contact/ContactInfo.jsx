import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="bg-[#0B2722] text-white rounded-3xl p-8 sm:p-10 border border-emerald-900 shadow-xl space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 inline-block">
          Direct Reach
        </span>
        <h3 className="text-2xl font-bold">
          SARY Foundation Head Office
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
          We welcome inquiries from citizens, students, researchers, journalists, and partner institutions who wish to collaborate on environmental restoration.
        </p>
      </div>

      <div className="space-y-6 text-sm">
        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-emerald-400 font-semibold uppercase">Official Contact Phone</div>
            <a href="tel:+919517330895" className="font-bold text-base hover:text-emerald-300 transition">
              +91 9517330895
            </a>
            <div className="text-xs text-gray-400 mt-0.5">Available Mon - Sat (9:00 AM - 7:00 PM)</div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-emerald-400 font-semibold uppercase">Official Foundation Email</div>
            <a href="mailto:saryfoundation@gmail.com" className="font-bold text-base hover:text-emerald-300 transition break-all">
              saryfoundation@gmail.com
            </a>
            <div className="text-xs text-gray-400 mt-0.5">Responses typically sent within 24 hours</div>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-emerald-400 font-semibold uppercase">Registered Head Office</div>
            <p className="font-medium text-sm text-gray-200 leading-relaxed mt-0.5">
              351, Vikas Nagar, Lakhanpur, Kanpur Nagar, Uttar Pradesh (India) - 208024
            </p>
          </div>
        </div>

        {/* Drive Hours */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-emerald-400 font-semibold uppercase">Community Plog Drives</div>
            <div className="font-bold text-sm text-gray-200">Every Sunday Morning: 6:30 AM – 9:00 AM</div>
            <div className="text-xs text-gray-400 mt-0.5">Designated riverbank & public park locations</div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="pt-4 border-t border-white/10 flex items-center gap-3">
        <span className="text-xs text-gray-400 mr-2">Follow Us:</span>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center transition">
          <Facebook className="w-4 h-4" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center transition">
          <Twitter className="w-4 h-4" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center transition">
          <Instagram className="w-4 h-4" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center transition">
          <Linkedin className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
