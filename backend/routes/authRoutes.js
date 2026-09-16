const express = require('express');
const router = express.Router();
const { loginAdmin, getAdminProfile, updatePassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/login', authLimiter, loginAdmin);
router.get('/me', protect, getAdminProfile);
router.put('/update-password', protect, updatePassword);

module.exports = router;
