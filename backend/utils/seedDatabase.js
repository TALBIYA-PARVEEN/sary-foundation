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

    // 3. Seed Initiatives
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
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
          target: 200,
          achieved: 120,
          unit: 'Drives',
          status: 'active',
          order: 1
        },
        {
          title: 'Project Harit Canopy',
          slug: 'project-harit-canopy',
          tagline: 'Urban Greening & Mass Afforestation',
          description: 'Planting indigenous saplings across schools, parks, and barren public spots. We nurture every sapling through community caretakers to ensure high survival rates.',
          category: 'Reforestation',
          icon: 'TreePine',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
          target: 25000,
          achieved: 15000,
          unit: 'Saplings',
          status: 'active',
          order: 2
        },
        {
          title: 'Project Punarjanm',
          slug: 'project-punarjanm',
          tagline: 'Upcycling & Zero Waste Circular Economy',
          description: 'Transforming discarded fabric waste and single-use plastic into reusable cloth bags, compost bins, and eco-crafts in partnership with women self-help groups.',
          category: 'Upcycling',
          icon: 'Recycle',
          image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
          target: 20,
          achieved: 12.5,
          unit: 'Tons Upcycled',
          status: 'active',
          order: 3
        },
        {
          title: 'Project Shiksha & Youth',
          slug: 'project-shiksha-youth',
          tagline: 'School & College Eco-Warriors Program',
          description: 'Educating students and youth about climate change, segregation at source, waste audits, and adopting zero-waste lifestyle choices for long-term mindset shifts.',
          category: 'Education',
          icon: 'GraduationCap',
          image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
          target: 100,
          achieved: 65,
          unit: 'Workshops',
          status: 'active',
          order: 4
        },
        {
          title: 'Project Jal Dharani',
          slug: 'project-jal-dharani',
          tagline: 'Restoring Local Ponds and Water Reservoirs',
          description: 'Desilting, cleaning banks, and reviving drying urban water reservoirs to recharge the water table and foster local biodiversity.',
          category: 'Water Revival',
          icon: 'Droplet',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          target: 15,
          achieved: 8,
          unit: 'Waterbodies',
          status: 'active',
          order: 5
        }
      ];
      await Initiative.insertMany(initialInitiatives);
      console.log('[Seed] Initial initiatives seeded');
    }

    // 4. Seed Media Placeholders
    const mediaCount = await Media.countDocuments();
    if (mediaCount === 0) {
      const initialMedia = [
        {
          title: 'Ghat Clean-up Drive & Waste Segregation #1',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
          thumbnail: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=400&q=80',
          category: 'Drives',
          description: 'Volunteers collecting plastic bottles and debris during Sunday morning plog drive.',
          featured: true,
          order: 1
        },
        {
          title: 'Mega Tree Plantation with Youth Volunteers',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=800&q=80',
          thumbnail: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=400&q=80',
          category: 'Plantation',
          description: 'Planting over 500 neem, banyan, and peepal saplings in community school campus.',
          featured: true,
          order: 2
        },
        {
          title: 'Zero Waste & Plastic-Free Lifestyle Workshop',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
          thumbnail: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=80',
          category: 'Youth',
          description: 'Interactive session educating students on sustainable waste segregation.',
          featured: true,
          order: 3
        },
        {
          title: 'Community Cleanliness Movement Documentary',
          type: 'video',
          url: 'https://www.youtube.com/watch?v=RMOHU9tUnco', // YouTube video link
          thumbnail: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
          category: 'Drives',
          description: 'A glimpse into the impact of weekly plogging and community participation.',
          featured: true,
          order: 4
        },
        {
          title: 'Riverbank Cleanliness Spotlight',
          type: 'video',
          url: 'https://www.youtube.com/watch?v=95g0Ni2arwU', // YouTube video link
          thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          category: 'Press',
          description: 'News coverage highlighting youth engagement in environmental sustainability.',
          featured: true,
          order: 5
        },
        {
          title: 'Eco-Friendly Festival Cleanup & Sacred Waste Composting',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
          thumbnail: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=400&q=80',
          category: 'Events',
          description: 'Transforming floral offerings into organic fertilizer.',
          featured: true,
          order: 6
        }
      ];
      await Media.insertMany(initialMedia);
      console.log('[Seed] Initial media placeholders seeded');
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
