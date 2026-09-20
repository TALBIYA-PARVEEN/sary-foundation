import React, { useState } from 'react';
import SectionHeading from '../../common/SectionHeading';
import { volunteerService } from '../../../services';
import { useToast } from '../../../context/ToastContext';
import { 
  UserCheck, 
  Send, 
  Sparkles, 
  Calendar, 
  Award, 
  Users2, 
  ShieldCheck,
  CheckCircle2,
  Loader2
} from 'lucide-react';

const perks = [
  {
    title: 'Certificate of Volunteering',
    desc: 'Official certificate for community service and social internship credits.',
    icon: Award
  },
  {
    title: 'Weekend Field Drives',
    desc: 'Participate in hands-on riverbank plogging and tree planting drives.',
    icon: Calendar
  },
  {
    title: 'Skill Development & Leadership',
    desc: 'Gain experience in organizing community events, advocacy, and public speaking.',
    icon: Users2
  },
  {
    title: 'Direct Environmental Impact',
    desc: 'Observe the tangible transformation of local waterbodies and green patches.',
    icon: ShieldCheck
  }
];

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    interest: 'Clean-up Drives',
    availability: 'Weekends',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.city) {
      toast('Please fill in all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await volunteerService.registerVolunteer(formData);
      if (res.success) {
        setSubmitted(true);
        toast('Welcome! You have successfully registered as a volunteer.', 'success');
      }
    } catch (err) {
      toast(err.message || 'Error submitting registration. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Join The Movement"
          title="Become a SARY Foundation Volunteer"
          subtitle="Be the driving force for ecological change. Join our passionate community of environmental champions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-card">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-forest flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark">
                  Registration Received!
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you for joining SARY Foundation, <strong>{formData.name}</strong>! An automated confirmation has been dispatched to <strong>{formData.email}</strong>, and our coordinator will reach out to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      city: '',
                      interest: 'Clean-up Drives',
                      availability: 'Weekends',
                      message: ''
                    });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full border border-gray-200 text-xs font-bold uppercase text-gray-700 hover:bg-gray-100 transition"
                >
                  Register Another Volunteer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-emerald-200 bg-[#FAF7F2] p-1 shrink-0 shadow-sm">
                    <img src="/sary-logo.png" alt="SARY Foundation" className="w-full h-full object-contain rounded-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-0.5">
                      Volunteer Application
                    </h3>
                    <p className="text-xs text-gray-500">
                      Fill out the form below. Our coordination team will get in touch with you.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Arsh Ahmad"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. yourname@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9517330895"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      City / Location *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Kanpur"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Primary Interest Area
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition bg-white"
                    >
                      <option value="Clean-up Drives">Ghat & Clean-up Drives</option>
                      <option value="Tree Plantation">Tree Plantation & Afforestation</option>
                      <option value="Awareness & Education">Awareness & School Workshops</option>
                      <option value="Social Media & Media">Social Media & Photography</option>
                      <option value="Logistics & Events">Logistics & Drive Management</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Availability
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition bg-white"
                    >
                      <option value="Weekends">Weekends (Sunday Mornings)</option>
                      <option value="Weekdays">Weekdays</option>
                      <option value="Flexible">Flexible / On-Call</option>
                      <option value="Special Events">Special Events Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Why do you want to volunteer? (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your background, skills, or what motivates you..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full eco-gradient-btn text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Register as Volunteer</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Perks & FAQ Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B2722] text-white rounded-3xl p-8 border border-emerald-900/60 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-brand-gold" />
                <h3 className="text-xl font-bold">Why Volunteer With Us?</h3>
              </div>

              <div className="space-y-4">
                {perks.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 text-emerald-300 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">{p.title}</div>
                        <div className="text-xs text-gray-300 mt-0.5 leading-relaxed">{p.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact Badge */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-emerald-950">
              <h4 className="font-bold text-sm mb-1">Have Questions First?</h4>
              <p className="text-xs text-emerald-800 leading-relaxed mb-3">
                Contact our volunteer desk anytime via WhatsApp/call or email.
              </p>
              <div className="text-xs font-semibold space-y-1">
                <div>📞 Phone: <strong>+91 9517330895</strong></div>
                <div>✉️ Email: <strong>saryfoundation@gmail.com</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerForm;
