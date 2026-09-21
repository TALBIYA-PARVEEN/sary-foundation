const mongoose = require('mongoose');

// Disable command buffering globally so queries fail fast to fallbacks if disconnected
mongoose.set('bufferCommands', false);

const sanitizeMongoUri = (uri) => {
  if (!uri) return 'mongodb://127.0.0.1:27017/sary_foundation';
  // Remove accidental angle brackets from username/password: <username> -> username
  let sanitized = uri.replace(/<([^>]+)>/g, '$1');

  // If no database name specified before query string, add /sary_foundation
  if (sanitized.includes('.mongodb.net/?')) {
    sanitized = sanitized.replace('.mongodb.net/?', '.mongodb.net/sary_foundation?');
  } else if (sanitized.endsWith('.mongodb.net/')) {
    sanitized = sanitized + 'sary_foundation';
  } else if (sanitized.endsWith('.mongodb.net')) {
    sanitized = sanitized + '/sary_foundation';
  }

  return sanitized;
};

const connectDB = async () => {
  try {
    const rawUri = process.env.MONGODB_URI;
    const connStr = sanitizeMongoUri(rawUri);

    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });

    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    console.log(`[MongoDB] Active Database: ${conn.connection.name}`);

    // Ensure all 7 collections are explicitly created in MongoDB Atlas
    const db = conn.connection.db;
    const existingCols = (await db.listCollections().toArray()).map(c => c.name);
    const requiredCols = ['admins', 'contacts', 'donations', 'initiatives', 'media', 'stats', 'volunteers'];
    for (const col of requiredCols) {
      if (!existingCols.includes(col)) {
        await db.createCollection(col);
      }
    }

    // Auto-seed admin and stats if collection is empty
    const Admin = require('../models/Admin');
    const Stats = require('../models/Stats');

    const adminExists = await Admin.findOne({ username: 'saryadmin' });
    if (!adminExists) {
      await Admin.create({
        username: 'saryadmin',
        email: 'saryfoundation@gmail.com',
        password: 'SaryAdmin@2025!',
        role: 'superadmin'
      });
      console.log('[MongoDB] Auto-seeded default admin: saryadmin');
    }

    const statsCount = await Stats.countDocuments();
    if (statsCount === 0) {
      await Stats.insertMany([
        {
          key: 'riverbank_cleanliness',
          label: 'Riverbank Cleanliness',
          value: 'Phase 1',
          icon: 'Waves',
          order: 1,
          sub: 'Inaugural Drive Planned'
        },
        {
          key: 'volunteers',
          label: 'Volunteer Movement',
          value: 'Open',
          icon: 'Users',
          order: 2,
          sub: 'Registrations Active'
        },
        {
          key: 'urban_afforestation',
          label: 'Urban Afforestation Target',
          value: '5,000+',
          icon: 'TreePine',
          order: 3,
          sub: 'Native Trees Planned'
        },
        {
          key: 'zero_waste',
          label: 'Zero-Waste Awareness',
          value: '100%',
          icon: 'Trash2',
          order: 4,
          sub: 'Community Driven'
        }
      ]);
      console.log('[MongoDB] Auto-seeded inaugural stats metrics');
    }
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    console.warn(`[MongoDB] Running with in-memory resilient fallback mode. (Check MongoDB Atlas IP Whitelist / Network Access).`);
  }
};

module.exports = connectDB;

