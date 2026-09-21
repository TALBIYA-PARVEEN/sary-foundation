const express = require('express');
const router = express.Router();
const {
  getKey,
  createOrder,
  verifyPayment,
  getDonations
} = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');

// Public endpoints
router.get('/key', getKey);
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

// Admin-only endpoints
router.get('/', protect, getDonations);

module.exports = router;
