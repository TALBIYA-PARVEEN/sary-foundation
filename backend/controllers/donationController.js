const crypto = require('crypto');
const mongoose = require('mongoose');
const Donation = require('../models/Donation');
const { getRazorpayInstance } = require('../config/razorpay');
const { sendDonationReceiptEmail } = require('../utils/emailService');

// In-memory fallback if MongoDB connection is pending or offline
let inMemoryDonations = [];
const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get Razorpay public key ID
// @route   GET /api/donations/key
// @access  Public
const getKey = async (req, res, next) => {
  try {
    const { isConfigured, keyId } = getRazorpayInstance();
    res.status(200).json({
      success: true,
      keyId: keyId || '',
      isConfigured
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Razorpay Order for donation
// @route   POST /api/donations/create-order
// @access  Public
const createOrder = async (req, res, next) => {
  try {
    const { amount, donorName, donorEmail, donorPhone, panNumber } = req.body;

    if (!amount || Number(amount) < 1) {
      return res.status(400).json({
        success: false,
        message: 'Donation amount must be at least ₹1'
      });
    }

    if (!donorName || !donorEmail) {
      return res.status(400).json({
        success: false,
        message: 'Donor name and email are required for official 80G tax receipt'
      });
    }

    const numericAmount = Math.round(Number(amount));
    const amountInPaise = numericAmount * 100;
    const { isConfigured, instance, keyId } = getRazorpayInstance();

    let orderData = null;
    let isMockPayment = false;

    if (isConfigured && instance) {
      try {
        const options = {
          amount: amountInPaise,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
          notes: {
            donorName,
            donorEmail,
            donorPhone: donorPhone || '',
            panNumber: panNumber || ''
          }
        };

        const razorpayOrder = await instance.orders.create(options);
        orderData = {
          id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency
        };
      } catch (rzpErr) {
        console.error('[Razorpay Order Creation Error]:', rzpErr);
        return res.status(502).json({
          success: false,
          message: 'Unable to initiate order with Razorpay: ' + (rzpErr.error?.description || rzpErr.message)
        });
      }
    } else {
      // Development fallback when Razorpay keys are not yet configured
      isMockPayment = true;
      orderData = {
        id: `order_dev_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        amount: amountInPaise,
        currency: 'INR'
      };
      console.log(`[Razorpay Dev Mode] Created simulated order: ${orderData.id} for ₹${numericAmount}`);
    }

    // Persist donation record
    let donation;
    if (isDbConnected()) {
      try {
        donation = await Donation.create({
          donorName,
          donorEmail,
          donorPhone: donorPhone || '',
          panNumber: panNumber ? panNumber.toUpperCase() : '',
          amount: numericAmount,
          currency: 'INR',
          razorpayOrderId: orderData.id,
          status: 'created',
          isMockPayment,
          notes: {
            initiatedAt: new Date().toISOString()
          }
        });
      } catch (dbErr) {
        console.warn('[Donation] MongoDB write error, using in-memory store:', dbErr.message);
      }
    }

    if (!donation) {
      donation = {
        _id: 'don_' + Date.now(),
        donorName,
        donorEmail,
        donorPhone: donorPhone || '',
        panNumber: panNumber ? panNumber.toUpperCase() : '',
        amount: numericAmount,
        currency: 'INR',
        razorpayOrderId: orderData.id,
        status: 'created',
        isMockPayment,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      inMemoryDonations.unshift(donation);
    }

    res.status(201).json({
      success: true,
      order: orderData,
      keyId: keyId || 'rzp_test_placeholder',
      isConfigured,
      isMockPayment,
      donationId: donation._id
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Razorpay payment signature & capture donation
// @route   POST /api/donations/verify-payment
// @access  Public
const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donorName,
      donorEmail,
      donorPhone,
      panNumber,
      amount
    } = req.body;

    if (!razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    const { isConfigured } = getRazorpayInstance();
    const secret = process.env.RAZORPAY_KEY_SECRET;

    // Check cryptographic signature if in live/configured mode
    if (isConfigured && secret) {
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        if (isDbConnected()) {
          try {
            await Donation.findOneAndUpdate(
              { razorpayOrderId: razorpay_order_id },
              { status: 'failed', razorpayPaymentId: razorpay_payment_id }
            );
          } catch (_) {}
        }

        return res.status(400).json({
          success: false,
          message: 'Payment verification failed: Invalid transaction signature'
        });
      }
    }

    // Generate unique 80G tax receipt number
    const currentYear = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const receiptNumber = `SARY-80G-${currentYear}-${randomSuffix}`;

    let donation = null;

    if (isDbConnected()) {
      try {
        donation = await Donation.findOne({ razorpayOrderId: razorpay_order_id });

        if (donation) {
          donation.status = 'captured';
          donation.razorpayPaymentId = razorpay_payment_id || `pay_dev_${Date.now()}`;
          donation.razorpaySignature = razorpay_signature || 'dev_mock_signature';
          donation.receiptNumber = receiptNumber;
          if (donorName) donation.donorName = donorName;
          if (donorEmail) donation.donorEmail = donorEmail;
          if (donorPhone) donation.donorPhone = donorPhone;
          if (panNumber) donation.panNumber = panNumber.toUpperCase();
          await donation.save();
        } else {
          donation = await Donation.create({
            donorName: donorName || 'Kind Donor',
            donorEmail: donorEmail || 'donor@example.com',
            donorPhone: donorPhone || '',
            panNumber: panNumber ? panNumber.toUpperCase() : '',
            amount: Number(amount) || 500,
            currency: 'INR',
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id || `pay_dev_${Date.now()}`,
            razorpaySignature: razorpay_signature || 'dev_mock_signature',
            status: 'captured',
            receiptNumber
          });
        }
      } catch (dbErr) {
        console.warn('[Donation] MongoDB error during verification, using in-memory store:', dbErr.message);
      }
    }

    if (!donation) {
      const existingIdx = inMemoryDonations.findIndex((d) => d.razorpayOrderId === razorpay_order_id);
      if (existingIdx !== -1) {
        inMemoryDonations[existingIdx].status = 'captured';
        inMemoryDonations[existingIdx].razorpayPaymentId = razorpay_payment_id || `pay_dev_${Date.now()}`;
        inMemoryDonations[existingIdx].receiptNumber = receiptNumber;
        donation = inMemoryDonations[existingIdx];
      } else {
        donation = {
          _id: 'don_' + Date.now(),
          donorName: donorName || 'Kind Donor',
          donorEmail: donorEmail || 'donor@example.com',
          donorPhone: donorPhone || '',
          panNumber: panNumber ? panNumber.toUpperCase() : '',
          amount: Number(amount) || 500,
          currency: 'INR',
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id || `pay_dev_${Date.now()}`,
          status: 'captured',
          receiptNumber,
          createdAt: new Date()
        };
        inMemoryDonations.unshift(donation);
      }
    }

    // Automatically send 80G receipt to donor & notification to foundation email
    sendDonationReceiptEmail(donation).catch((err) => {
      console.warn('[Donation Email Background Warning]:', err.message);
    });

    res.status(200).json({
      success: true,
      message: 'Donation successfully captured and verified. 80G receipt dispatched.',
      receiptNumber: donation.receiptNumber,
      donation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all donations for Admin Portal
// @route   GET /api/donations
// @access  Private (Admin)
const getDonations = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;

    let donations = [];
    let totalCount = 0;
    let totalRaised = 0;
    let totalDonations = 0;
    let uniqueDonors = 0;

    if (isDbConnected()) {
      try {
        const query = {};
        if (status && status !== 'all') {
          query.status = status;
        }

        if (search) {
          query.$or = [
            { donorName: { $regex: search, $options: 'i' } },
            { donorEmail: { $regex: search, $options: 'i' } },
            { razorpayPaymentId: { $regex: search, $options: 'i' } },
            { receiptNumber: { $regex: search, $options: 'i' } }
          ];
        }

        const skip = (Number(page) - 1) * Number(limit);

        const [dbDonations, dbTotal] = await Promise.all([
          Donation.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
          Donation.countDocuments(query)
        ]);

        donations = dbDonations;
        totalCount = dbTotal;

        const capturedDonations = await Donation.find({ status: 'captured' });
        totalRaised = capturedDonations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
        totalDonations = capturedDonations.length;
        uniqueDonors = new Set(capturedDonations.map((d) => d.donorEmail)).size;
      } catch (dbErr) {
        console.warn('[Donations] Fallback to in-memory store:', dbErr.message);
      }
    }

    if (donations.length === 0 && inMemoryDonations.length > 0) {
      donations = inMemoryDonations.filter((d) => {
        if (status && status !== 'all' && d.status !== status) return false;
        if (search) {
          const s = search.toLowerCase();
          return (
            d.donorName?.toLowerCase().includes(s) ||
            d.donorEmail?.toLowerCase().includes(s) ||
            d.receiptNumber?.toLowerCase().includes(s) ||
            d.razorpayPaymentId?.toLowerCase().includes(s)
          );
        }
        return true;
      });
      totalCount = donations.length;
      const captured = inMemoryDonations.filter((d) => d.status === 'captured');
      totalRaised = captured.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
      totalDonations = captured.length;
      uniqueDonors = new Set(captured.map((d) => d.donorEmail)).size;
    }

    res.status(200).json({
      success: true,
      count: donations.length,
      totalCount,
      summary: {
        totalRaised,
        totalDonations,
        uniqueDonors,
        averageDonation: totalDonations > 0 ? Math.round(totalRaised / totalDonations) : 0
      },
      data: donations
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getKey,
  createOrder,
  verifyPayment,
  getDonations
};
