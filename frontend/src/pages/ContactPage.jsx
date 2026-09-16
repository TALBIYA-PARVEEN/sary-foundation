import React from 'react';
import ContactForm from '../components/blueprints/contact/ContactForm';
import ContactInfo from '../components/blueprints/contact/ContactInfo';
import MapEmbed from '../components/blueprints/contact/MapEmbed';

const ContactPage = () => {
  return (
    <div className="pt-28">
      {/* Subpage Header Banner */}
      <div className="bg-[#0B2722] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-transparent to-emerald-900/40" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
            Connect With Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold">
            Contact SARY Foundation
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            Reach out for project partnerships, CSR collaborations, media queries, or volunteering questions.
          </p>
        </div>
      </div>

      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest px-3 py-1 bg-emerald-100 rounded-full">
                Head Office Location
              </span>
              <h3 className="text-2xl font-bold text-brand-dark mt-2">
                Visit SARY Foundation in Kanpur
              </h3>
            </div>
            <MapEmbed />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
