const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: [true, 'Donor name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  donorEmail: {
    type: String,
    required: [true, 'Donor email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/, 'Please provide a valid email']
  },
  donorPhone: {
    type: String,
    trim: true,
    default: ''
  },
  panNumber: {
    type: String,
    trim: true,
    uppercase: true,
    default: ''
  },
  amount: {
    type: Number,
    required: [true, 'Donation amount is required'],
    min: [1, 'Donation amount must be at least ₹1']
  },
  currency: {
    type: String,
    default: 'INR',
    uppercase: true
  },
  razorpayOrderId: {
    type: String,
    required: true,
    index: true
  },
  razorpayPaymentId: {
    type: String,
    default: '',
    index: true
  },
  razorpaySignature: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['created', 'captured', 'failed'],
    default: 'created',
    index: true
  },
  receiptNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  taxExempt80G: {
    type: Boolean,
    default: true
  },
  isMockPayment: {
    type: Boolean,
    default: false
  },
  notes: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { timestamps: true, bufferCommands: false });

module.exports = mongoose.model('Donation', DonationSchema);
