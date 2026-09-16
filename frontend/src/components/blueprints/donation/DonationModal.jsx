import React, { useState } from 'react';
import Modal from '../../common/Modal';
import { Heart, QrCode, Building, Check, Copy, ShieldCheck } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

const DonationModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [activeTab, setActiveTab] = useState('upi'); // 'upi' | 'bank'
  const [copiedField, setCopiedField] = useState(null);
  const { toast } = useToast();

  const tiers = [
    { value: '500', impact: 'Plants & nurtures 2 indigenous trees' },
    { value: '1000', impact: 'Sponsors 1 community ghat cleanup drive' },
    { value: '2500', impact: 'Upcycles 50 kg plastic & fabric waste' },
    { value: '5000', impact: 'Funds school eco-education kit for 50 kids' }
  ];

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast(`Copied ${field} to clipboard!`, 'success');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const currentAmount = customAmount || amount;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Support SARY Foundation" maxWidth="max-w-xl">
      <div className="space-y-6">
        {/* Cause Headline with Official Logo */}
        <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-emerald-200 bg-[#FAF7F2] p-1 shrink-0 shadow-sm">
            <img src="/sary-logo.png" alt="SARY Foundation" className="w-full h-full object-contain rounded-xl" />
          </div>
          <div className="space-y-0.5">
            <div className="font-bold text-xs uppercase tracking-wider text-brand-forest">Direct Ground Impact</div>
            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
              Every contribution directly funds cleanup gear, sapling nurseries, riverbank trash removal, and local youth sustainability workshops.
            </p>
          </div>
        </div>

        {/* Amount Tiers */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Select Contribution Tier (INR)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {tiers.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => {
                  setAmount(t.value);
                  setCustomAmount('');
                }}
                className={`py-3 px-3 rounded-xl border text-sm font-bold transition flex flex-col items-center justify-center ${
                  amount === t.value && !customAmount
                    ? 'border-brand-forest bg-brand-forest text-white shadow-md'
                    : 'border-gray-200 bg-gray-50/70 text-gray-800 hover:border-emerald-300'
                }`}
              >
                <span>₹{Number(t.value).toLocaleString()}</span>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mt-3">
            <input
              type="number"
              placeholder="Or enter custom amount in ₹"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
            />
          </div>
        </div>

        {/* Selected Tier Impact */}
        <div className="text-xs bg-gray-50 border border-gray-100 rounded-xl p-3 text-gray-600 flex items-center justify-between">
          <span className="font-semibold text-brand-forest">Your Impact:</span>
          <span>
            {tiers.find((t) => t.value === currentAmount)?.impact || 'Supports continuous environmental preservation initiatives'}
          </span>
        </div>

        {/* Payment Methods Switch */}
        <div className="flex border-b border-gray-200 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('upi')}
            className={`pb-2.5 px-4 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'upi'
                ? 'border-brand-forest text-brand-forest font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Instant UPI / QR</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bank')}
            className={`pb-2.5 px-4 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'bank'
                ? 'border-brand-forest text-brand-forest font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Bank NEFT / RTGS</span>
          </button>
        </div>

        {/* UPI Details Tab */}
        {activeTab === 'upi' && (
          <div className="space-y-4 text-center">
            {/* QR Code Frame */}
            <div className="mx-auto w-48 h-48 bg-white border-2 border-dashed border-emerald-300 rounded-2xl flex flex-col items-center justify-center p-3 shadow-inner">
              <QrCode className="w-24 h-24 text-brand-forest mb-2" />
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Scan with any UPI App</span>
              <span className="text-[10px] text-brand-forest font-bold">GPay • PhonePe • Paytm</span>
            </div>

            {/* UPI ID Copy Field */}
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-3 max-w-sm mx-auto text-sm">
              <div className="text-left font-mono font-bold text-gray-800">
                saryfoundation@upi
              </div>
              <button
                type="button"
                onClick={() => handleCopy('saryfoundation@upi', 'UPI ID')}
                className="text-brand-forest hover:text-emerald-700 flex items-center gap-1 font-semibold text-xs px-2 py-1 bg-emerald-50 rounded-lg transition"
              >
                {copiedField === 'UPI ID' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'UPI ID' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Bank Transfer Details Tab */}
        {activeTab === 'bank' && (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-1 border-b border-gray-200">
              <span className="text-gray-500 font-medium">Account Name:</span>
              <span className="font-bold text-gray-900">SARY Foundation</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-200">
              <span className="text-gray-500 font-medium">Account Number:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-gray-900">951733089501</span>
                <button
                  onClick={() => handleCopy('951733089501', 'Account Number')}
                  className="text-brand-forest hover:text-emerald-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-200">
              <span className="text-gray-500 font-medium">IFSC Code:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-gray-900">SBIN0001234</span>
                <button
                  onClick={() => handleCopy('SBIN0001234', 'IFSC Code')}
                  className="text-brand-forest hover:text-emerald-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-200">
              <span className="text-gray-500 font-medium">Bank / Branch:</span>
              <span className="font-bold text-gray-900">State Bank of India, Kanpur Nagar</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500 font-medium">Account Type:</span>
              <span className="font-bold text-gray-900">Trust / NGO Current Account</span>
            </div>
          </div>
        )}

        {/* 80G Tax Exemption Note */}
        <div className="flex items-center gap-2.5 text-[11px] text-gray-500 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
          <ShieldCheck className="w-4 h-4 text-brand-forest shrink-0" />
          <span>
            Donations are eligible for tax deduction benefits under Section 80G. For receipts, please email your transaction reference to <strong>arshahmad441@gmail.com</strong>.
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default DonationModal;
