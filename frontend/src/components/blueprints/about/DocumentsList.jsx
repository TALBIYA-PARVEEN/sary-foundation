import React from 'react';
import SectionHeading from '../../common/SectionHeading';
import { FileText, Download, ShieldCheck } from 'lucide-react';

const docs = [
  {
    title: 'SARY Foundation Registration Certificate',
    desc: 'Official Trust Deed and Non-Profit Incorporation document.',
    date: 'Registered 2024-2025',
    size: '1.2 MB PDF'
  },
  {
    title: '80G & 12A Income Tax Exemption Orders',
    desc: 'Certifying eligible tax deductions for individual & corporate donors.',
    date: 'Issued 2024',
    size: '850 KB PDF'
  },
  {
    title: 'Environmental Impact & Clean-Up Report',
    desc: 'Comprehensive annual summary of waste diverted and trees planted.',
    date: 'Annual 2024-25',
    size: '2.4 MB PDF'
  },
  {
    title: 'PAN & Legal Identification Certificates',
    desc: 'Statutory compliance details for national & regional partnerships.',
    date: 'Verified 2024',
    size: '640 KB PDF'
  }
];

const DocumentsList = () => {
  return (
    <section id="documents" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Transparency & Compliance"
          title="Official Foundation Documents"
          subtitle="We believe in absolute operational transparency. Browse and verify our legal registration and certification credentials below."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docs.map((d, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 rounded-3xl p-6 hover:bg-emerald-50/40 hover:border-emerald-300 transition duration-300 flex items-start justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white text-brand-forest shadow-sm border border-gray-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-base group-hover:text-brand-forest transition">
                    {d.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {d.desc}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 font-semibold mt-2.5">
                    <span>{d.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-700">
                      <ShieldCheck className="w-3 h-3" /> Verified Document
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Downloading ${d.title}... (Document placeholder)`)}
                className="w-10 h-10 rounded-full bg-white hover:bg-brand-forest hover:text-white text-gray-700 shadow-sm border border-gray-200 flex items-center justify-center shrink-0 transition"
                title="Download Document"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentsList;
