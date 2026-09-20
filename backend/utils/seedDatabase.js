require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Stats = require('../models/Stats');
const Initiative = require('../models/Initiative');
const Media = require('../models/Media');

const seedData = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sary_foundation';
    await mongoose.connect(connStr);
    console.log('[Seed] Connected to MongoDB');

    // 1. Seed Admin
    const adminExists = await Admin.findOne({ username: 'saryadmin' });
    if (!adminExists) {
      await Admin.create({
        username: 'saryadmin',
        email: 'saryfoundation@gmail.com',
        password: 'SaryAdmin@2025!', // Password will be hashed by AdminSchema pre-save hook
        role: 'superadmin'
      });
      console.log('[Seed] Initial Admin created: saryadmin / SaryAdmin@2025!');
    } else {
      console.log('[Seed] Admin already exists');
    }

    // 2. Seed Live Stats
    const statsCount = await Stats.countDocuments();
    if (statsCount === 0) {
      const initialStats = [
        {
          key: 'riverbank_cleanliness',
          label: 'Riverbank Cleanliness',
          value: 'Phase 1',
          prefix: '',
          suffix: '',
          icon: 'Waves',
          order: 1,
          sub: 'Inaugural Drive Planned'
        },
        {
          key: 'volunteers',
          label: 'Volunteer Movement',
          value: 'Open',
          prefix: '',
          suffix: '',
          icon: 'Users',
          order: 2,
          sub: 'Registrations Active'
        },
        {
          key: 'urban_afforestation',
          label: 'Urban Afforestation Target',
          value: '5,000+',
          prefix: '',
          suffix: '',
          icon: 'TreePine',
          order: 3,
          sub: 'Native Trees Planned'
        },
        {
          key: 'zero_waste',
          label: 'Zero-Waste Awareness',
          value: '100%',
          prefix: '',
          suffix: '',
          icon: 'Trash2',
          order: 4,
          sub: 'Community Driven'
        }
      ];
      await Stats.insertMany(initialStats);
      console.log('[Seed] Initial stats seeded');
    }

    // 3. Initiatives: Kept clean - real initiatives will be created once drives are initiated
    const initiativesCount = await Initiative.countDocuments();
    if (initiativesCount === 0) {
      console.log('[Seed] Initiatives collection is clean. Ready for real drives via Admin Portal.');
    }

    // 4. Media: Kept 100% clean (Admin can upload real event photos/videos via /sary-portal)
    const mediaCount = await Media.countDocuments();
    if (mediaCount === 0) {
      console.log('[Seed] Media collection is clean. Ready for real event uploads via Admin Portal.');
    }

    console.log('[Seed] Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;
