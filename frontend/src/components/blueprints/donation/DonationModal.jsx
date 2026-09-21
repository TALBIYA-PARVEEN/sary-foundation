import React, { useState } from 'react';
import Modal from '../../common/Modal';
import { 
  Heart, 
  CreditCard, 
  Building, 
  Check, 
  Copy, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Loader2,
  Lock,
  Download
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { donationService } from '../../../services';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const DonationModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [activeTab, setActiveTab] = useState('razorpay'); // 'razorpay' | 'bank'
  const [copiedField, setCopiedField] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [completedDonation, setCompletedDonation] = useState(null);

  // Donor Details for 80G Tax Receipt
  const [donorDetails, setDonorDetails] = useState({
    name: '',
    email: '',
    phone: '',
    panNumber: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonorDetails((prev) => ({
      ...prev,
      [name]: name === 'panNumber' ? value.toUpperCase() : value
    }));
  };

  const handleModalClose = () => {
    setCompletedDonation(null);
    setProcessing(false);
    onClose();
  };

  // Trigger Razorpay Checkout
  const handleRazorpayPayment = async (e) => {
    e.preventDefault();

    if (!donorDetails.name.trim()) {
      toast('Please enter your full name for the 80G receipt', 'error');
      return;
    }
    if (!donorDetails.email.trim() || !donorDetails.email.includes('@')) {
      toast('Please enter a valid email address to receive your receipt', 'error');
      return;
    }

    const finalAmount = Number(currentAmount);
    if (!finalAmount || finalAmount < 1) {
      toast('Donation amount must be at least ₹1', 'error');
      return;
    }

    setProcessing(true);

    try {
      // 1. Create order on backend
      const orderRes = await donationService.createOrder({
        amount: finalAmount,
        donorName: donorDetails.name,
        donorEmail: donorDetails.email,
        donorPhone: donorDetails.phone,
        panNumber: donorDetails.panNumber
      });

      if (!orderRes.success || !orderRes.order) {
        throw new Error(orderRes.message || 'Unable to initiate donation order');
      }

      // If development fallback simulated mode
      if (orderRes.isMockPayment) {
        // Complete verification directly in dev mode
        const verifyRes = await donationService.verifyPayment({
          razorpay_order_id: orderRes.order.id,
          razorpay_payment_id: `pay_sim_${Date.now()}`,
          razorpay_signature: 'dev_signature',
          donorName: donorDetails.name,
          donorEmail: donorDetails.email,
          donorPhone: donorDetails.phone,
          panNumber: donorDetails.panNumber,
          amount: finalAmount
        });

        if (verifyRes.success) {
          setCompletedDonation(verifyRes.donation);
          toast('Donation captured successfully! 80G receipt generated.', 'success');
        } else {
          toast(verifyRes.message || 'Verification failed', 'error');
        }
        setProcessing(false);
        return;
      }

      // 2. Load Razorpay Checkout Script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Could not load Razorpay payment gateway. Please check your internet connection.');
      }

      // 3. Launch Razorpay Checkout Modal
      const options = {
        key: orderRes.keyId,
        amount: orderRes.order.amount,
        currency: orderRes.order.currency,
        name: 'SARY Foundation',
        description: 'Contribution for Environmental Preservation & Clean-Up Drives',
        image: '/sary-logo.png',
        order_id: orderRes.order.id,
        prefill: {
          name: donorDetails.name,
          email: donorDetails.email,
          contact: donorDetails.phone || ''
        },
        notes: {
          panNumber: donorDetails.panNumber || 'Not provided',
          cause: 'Environmental Conservation'
        },
        theme: {
          color: '#15803D' // SARY Brand Forest Green
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            toast('Payment cancelled or closed.', 'info');
          }
        },
        handler: async function (response) {
          try {
            setProcessing(true);
            const verifyRes = await donationService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donorName: donorDetails.name,
              donorEmail: donorDetails.email,
              donorPhone: donorDetails.phone,
              panNumber: donorDetails.panNumber,
              amount: finalAmount
            });

            if (verifyRes.success) {
              setCompletedDonation(verifyRes.donation);
              toast('Thank you for your generous contribution!', 'success');
            } else {
              toast(verifyRes.message || 'Payment verification failed', 'error');
            }
          } catch (verifyErr) {
            console.error('[Payment Verification Error]:', verifyErr);
            toast('Payment verification error: ' + verifyErr.message, 'error');
          } finally {
            setProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (failRes) {
        setProcessing(false);
        toast('Payment failed: ' + (failRes.error?.description || 'Transaction declined'), 'error');
      });

      rzp.open();
    } catch (err) {
      console.error('[Donation Error]:', err);
      toast(err.message || 'Failed to initiate payment', 'error');
      setProcessing(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} title="Support SARY Foundation" maxWidth="max-w-xl">
      {completedDonation ? (
        /* ================= SUCCESS CELEBRATION RECEIPT SCREEN ================= */
        <div className="text-center py-4 space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
              Donation Verified & Captured
            </span>
            <h3 className="text-2xl font-black text-brand-dark pt-2">
              Thank You, {completedDonation.donorName}!
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
              Your contribution of <strong className="text-brand-forest font-black">₹{Number(completedDonation.amount).toLocaleString('en-IN')}</strong> directly empowers our community clean-up operations and sapling planting.
            </p>
          </div>

          {/* Receipt Info Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-left text-xs space-y-2.5 max-w-md mx-auto">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-gray-500 font-semibold">Official 80G Receipt #:</span>
              <span className="font-mono font-bold text-gray-900">{completedDonation.receiptNumber}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-gray-500 font-semibold">Payment / Transaction ID:</span>
              <span className="font-mono font-bold text-gray-900">{completedDonation.razorpayPaymentId}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-gray-500 font-semibold">Amount Paid:</span>
              <span className="font-bold text-emerald-700 text-sm">₹{Number(completedDonation.amount).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-semibold">Tax Deduction:</span>
              <span className="font-bold text-emerald-700">Eligible under Section 80G</span>
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 max-w-md mx-auto leading-relaxed">
            ✉️ An official tax receipt has been emailed to <strong>{completedDonation.donorEmail}</strong>. Please retain it for your income tax deduction filings.
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-8 py-3 rounded-full bg-brand-forest hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
            >
              Done / Close
            </button>
          </div>
        </div>
      ) : (
        /* ================= DONATION FORM ================= */
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

          {/* Payment Methods Switch */}
          <div className="flex border-b border-gray-200 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('razorpay')}
              className={`pb-2.5 px-4 flex items-center gap-2 border-b-2 transition ${
                activeTab === 'razorpay'
                  ? 'border-brand-forest text-brand-forest font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Razorpay (UPI, Cards, NetBanking)</span>
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
              <span>Direct Bank Wire (NEFT)</span>
            </button>
          </div>

          {activeTab === 'razorpay' && (
            <form onSubmit={handleRazorpayPayment} className="space-y-5">
              {/* Amount Tiers */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Select Contribution Amount (INR) *
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
                    min="1"
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
                <span className="text-right">
                  {tiers.find((t) => t.value === currentAmount)?.impact || 'Supports continuous environmental preservation initiatives'}
                </span>
              </div>

              {/* Donor Contact Details */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Donor Information (For 80G Tax Exemption Receipt)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter donor's full name"
                      value={donorDetails.name}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Email Address (for receipt) *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter email for receipt"
                      value={donorDetails.email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter 10-digit mobile number"
                      value={donorDetails.phone}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      PAN Number (optional, for 80G)
                    </label>
                    <input
                      type="text"
                      name="panNumber"
                      maxLength={10}
                      placeholder="Enter 10-digit PAN (e.g. ABCDE1234F)"
                      value={donorDetails.panNumber}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm uppercase font-mono focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Razorpay Payment Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 rounded-full bg-brand-forest hover:bg-emerald-700 text-white font-extrabold text-sm uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Initiating Secure Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-emerald-300" />
                      <span>Proceed To Pay ₹{Number(currentAmount).toLocaleString('en-IN')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-3 mt-3 text-[11px] text-gray-500 font-medium">
                  <span>🔒 Secured by Razorpay</span>
                  <span>•</span>
                  <span>UPI, GPay, PhonePe, Cards, NetBanking</span>
                </div>
              </div>
            </form>
          )}

          {/* Bank Transfer Details Tab */}
          {activeTab === 'bank' && (
            <div className="space-y-4">
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
                      type="button"
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
                      type="button"
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

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-xs text-gray-600 leading-relaxed">
                After completing an NEFT/RTGS wire transfer, please email your transaction reference UTR and donor PAN details to <strong>saryfoundation@gmail.com</strong> to receive your 80G tax receipt.
              </div>
            </div>
          )}

          {/* 80G Tax Exemption Note */}
          <div className="flex items-center gap-2.5 text-[11px] text-gray-500 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-brand-forest shrink-0" />
            <span>
              All donations are eligible for tax deduction benefits under Section 80G. An official receipt is automatically generated and emailed upon payment confirmation.
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DonationModal;
