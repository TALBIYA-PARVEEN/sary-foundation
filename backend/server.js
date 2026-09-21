require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Initialize database
connectDB();

const app = express();

// Disable powered-by header for security
app.disable('x-powered-by');

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps, curl) or during dev
    if (!origin || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    if (defaultOrigins.includes(origin) || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Allow Vercel & Render deployed domains
    if (origin.endsWith('.vercel.app') || origin.endsWith('.onrender.com')) {
      return callback(null, true);
    }
    return callback(new Error('CORS not allowed from this origin'), false);
  },
  credentials: true
}));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/initiatives', require('./routes/initiativeRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    app: 'SARY Foundation API',
    time: new Date().toISOString(),
    organization: {
      name: 'SARY Foundation',
      email: process.env.ADMIN_NOTIFICATION_EMAIL || 'saryfoundation@gmail.com',
      phone: '9517330895'
    }
  });
});

// Centralized error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

let server;
if (require.main === module) {
  server = app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🌿 SARY Foundation Backend API running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔒 Hidden Admin Portal Route: /sary-portal`);
    console.log(`=========================================`);
  });
}

process.on('unhandledRejection', (err) => {
  console.error('[Unhandled Rejection]:', err.message);
});

module.exports = app;
