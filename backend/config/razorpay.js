const Razorpay = require('razorpay');

let razorpayInstance = null;

const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keyId === 'your_razorpay_key_id_here' || keyId === 'rzp_test_placeholder_key') {
    return {
      isConfigured: false,
      instance: null,
      keyId: keyId || ''
    };
  }

  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });
  }

  return {
    isConfigured: true,
    instance: razorpayInstance,
    keyId
  };
};

module.exports = {
  getRazorpayInstance
};
