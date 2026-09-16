const rateLimit = require('express-rate-limit');

// Strict rate limiter for admin login to prevent brute force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// General limiter for public form submissions (Contact & Volunteer)
const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20, // Max 20 submissions per IP in 10 mins
  message: {
    success: false,
    message: 'Too many submissions from this network. Please try again shortly.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { authLimiter, formLimiter };
