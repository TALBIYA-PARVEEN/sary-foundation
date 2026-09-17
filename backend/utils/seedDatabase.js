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
        email: 'admin@saryfoundation.org',
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
          key: 'clean_up_drives',
          label: 'Ghat & City Clean-Up Drives',
          value: 120,
          prefix: '',
          suffix: '+',
          icon: 'Trash2',
          order: 1
        },
        {
          key: 'volunteers',
          label: 'Dedicated Volunteers',
          value: 650,
          prefix: '',
          suffix: '+',
          icon: 'Users',
          order: 2
        },
        {
          key: 'trash_removed',
          label: 'Trash Removed from Waterbodies',
          value: 85,
          prefix: '',
          suffix: ' Mt+',
          icon: 'Waves',
          order: 3
        },
        {
          key: 'saplings_planted',
          label: 'Trees Planted & Nurtured',
          value: 15000,
          prefix: '',
          suffix: '+',
          icon: 'TreePine',
          order: 4
        }
      ];
      await Stats.insertMany(initialStats);
      console.log('[Seed] Initial stats seeded');
    }

    // 3. Seed Initiatives (Planned & Proposed)
    const initiativesCount = await Initiative.countDocuments();
    if (initiativesCount === 0) {
      const initialInitiatives = [
        {
          title: 'Project Nirmal Ghats',
          slug: 'project-nirmal-ghats',
          tagline: 'Riverbank Cleanliness & Waterbody Conservation',
          description: 'Weekly community plogging and waste recovery drives at river ghats, removing plastic bottles, religious waste, and polythene before they pollute the aquatic ecosystem.',
          category: 'Cleanliness',
          icon: 'Waves',
          image: '',
          target: 100,
          achieved: 0,
          unit: 'Drives',
          status: 'upcoming',
          order: 1
        },
        {
          title: 'Project Harit Canopy',
          slug: 'project-harit-canopy',
          tagline: 'Urban Greening & Mass Afforestation',
          description: 'Planting indigenous saplings across schools, parks, and public spots. We nurture every sapling through community caretakers to ensure high survival rates.',
          category: 'Reforestation',
          icon: 'TreePine',
          image: '',
          target: 5000,
          achieved: 0,
          unit: 'Saplings',
          status: 'upcoming',
          order: 2
        },
        {
          title: 'Project Punarjanm',
          slug: 'project-punarjanm',
          tagline: 'Upcycling & Zero Waste Circular Economy',
          description: 'Transforming discarded fabric waste and single-use plastic into reusable cloth bags, compost bins, and eco-crafts in partnership with women self-help groups.',
          category: 'Upcycling',
          icon: 'Recycle',
          image: '',
          target: 10,
          achieved: 0,
          unit: 'Tons Upcycled',
          status: 'upcoming',
          order: 3
        },
        {
          title: 'Project Shiksha & Youth',
          slug: 'project-shiksha-youth',
          tagline: 'School & College Eco-Warriors Program',
          description: 'Educating students and youth about climate change, segregation at source, waste audits, and adopting zero-waste lifestyle choices for long-term mindset shifts.',
          category: 'Education',
          icon: 'GraduationCap',
          image: '',
          target: 50,
          achieved: 0,
          unit: 'Workshops',
          status: 'upcoming',
          order: 4
        },
        {
          title: 'Project Jal Dharani',
          slug: 'project-jal-dharani',
          tagline: 'Restoring Local Ponds and Water Reservoirs',
          description: 'Desilting, cleaning banks, and reviving drying urban water reservoirs to recharge the water table and foster local biodiversity.',
          category: 'Water Revival',
          icon: 'Droplet',
          image: '',
          target: 10,
          achieved: 0,
          unit: 'Waterbodies',
          status: 'upcoming',
          order: 5
        }
      ];
      await Initiative.insertMany(initialInitiatives);
      console.log('[Seed] Initial planned initiatives seeded');
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
