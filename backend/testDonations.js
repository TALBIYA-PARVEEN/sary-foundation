require('dotenv').config();

async function runDonationTest() {
  console.log('--- Starting Donation Integration Tests ---');
  
  // 1. Verify razorpay config
  const { getRazorpayInstance } = require('./config/razorpay');
  const rzp = getRazorpayInstance();
  console.log('Razorpay Config Status:', rzp.isConfigured ? 'Live/Test Configured' : 'Dev Mode Active');
  console.log('Razorpay Key ID:', rzp.keyId || 'N/A');

  // 2. Test Donation Controller logic
  const { createOrder, verifyPayment } = require('./controllers/donationController');

  // Mock req/res for createOrder
  let mockOrderRes = null;
  const mockReqCreate = {
    body: {
      amount: 1000,
      donorName: 'Dr. Test Donor',
      donorEmail: 'testdonor@example.com',
      donorPhone: '9876543210',
      panNumber: 'ABCDE1234F'
    }
  };
  const mockResCreate = {
    status: function (code) {
      this.statusCode = code;
      return this;
    },
    json: function (data) {
      mockOrderRes = data;
      console.log(`[Order Creation] Status: ${this.statusCode}, Order ID: ${data.order?.id}, Success: ${data.success}`);
    }
  };

  await createOrder(mockReqCreate, mockResCreate, (err) => console.error(err));

  if (!mockOrderRes || !mockOrderRes.success) {
    console.error('FAILED: Order creation test');
    process.exit(1);
  }

  // Mock req/res for verifyPayment
  let mockVerifyRes = null;
  const mockReqVerify = {
    body: {
      razorpay_order_id: mockOrderRes.order.id,
      razorpay_payment_id: 'pay_test_' + Date.now(),
      razorpay_signature: 'dev_signature',
      donorName: 'Dr. Test Donor',
      donorEmail: 'testdonor@example.com',
      donorPhone: '9876543210',
      panNumber: 'ABCDE1234F',
      amount: 1000
    }
  };
  const mockResVerify = {
    status: function (code) {
      this.statusCode = code;
      return this;
    },
    json: function (data) {
      mockVerifyRes = data;
      console.log(`[Payment Verification] Status: ${this.statusCode}, Receipt #: ${data.receiptNumber}, Success: ${data.success}`);
    }
  };

  await verifyPayment(mockReqVerify, mockResVerify, (err) => console.error(err));

  if (!mockVerifyRes || !mockVerifyRes.success) {
    console.error('FAILED: Payment verification test');
    process.exit(1);
  }

  console.log('✅ ALL DONATION TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
}

runDonationTest().catch((err) => {
  console.error('Unhandled Test Error:', err);
  process.exit(1);
});
