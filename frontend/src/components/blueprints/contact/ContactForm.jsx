import React, { useState } from 'react';
import { contactService } from '../../../services';
import { useToast } from '../../../context/ToastContext';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
    if (!formData.name || !formData.email || !formData.message) {
      toast('Please provide your name, email, and message.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await contactService.submitContact(formData);
      if (res.success) {
        setSubmitted(true);
        toast('Message sent successfully! Our team will get back to you shortly.', 'success');
      }
    } catch (err) {
      toast(err.message || 'Error delivering message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-card text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-forest flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-brand-dark">
          Message Sent!
        </h3>
        <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          Thank you, <strong>{formData.name}</strong>. An email notification has been sent to our foundation desk at <strong>arshahmad441@gmail.com</strong>, and a confirmation has been sent to you.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
          }}
          className="mt-4 px-6 py-2.5 rounded-full border border-gray-200 text-xs font-bold uppercase text-gray-700 hover:bg-gray-100 transition"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-card space-y-6">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-emerald-200 bg-[#FAF7F2] p-1 shrink-0 shadow-sm">
          <img src="/sary-logo.png" alt="SARY Foundation" className="w-full h-full object-contain rounded-xl" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-brand-dark mb-0.5">
            Send Us a Message
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Have an inquiry, partnership proposal, or want to collaborate with SARY Foundation? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Your Name *
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
            placeholder="e.g. arshahmad441@gmail.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 9517330895"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Clean-up Drive Partnership"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Message *
        </label>
        <textarea
          name="message"
          required
          rows="5"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message here..."
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
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
