const Initiative = require('../models/Initiative');

const defaultInitiatives = [
  {
    _id: 'init_1',
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
    featured: true
  },
  {
    _id: 'init_2',
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
    featured: true
  },
  {
    _id: 'init_3',
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
    featured: true
  },
  {
    _id: 'init_4',
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
    featured: true
  }
];

let inMemoryInitiatives = [...defaultInitiatives];

// @desc    Get all initiatives
// @route   GET /api/initiatives
// @access  Public
const getInitiatives = async (req, res, next) => {
  try {
    let initiatives;
    try {
      initiatives = await Initiative.find().sort({ order: 1, createdAt: -1 });
      if (initiatives.length === 0) initiatives = inMemoryInitiatives;
    } catch (err) {
      initiatives = inMemoryInitiatives;
    }

    res.status(200).json({ success: true, count: initiatives.length, data: initiatives });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single initiative by slug
// @route   GET /api/initiatives/:slug
// @access  Public
const getInitiativeBySlug = async (req, res, next) => {
  try {
    let initiative;
    try {
      initiative = await Initiative.findOne({ slug: req.params.slug });
    } catch (err) {
      initiative = inMemoryInitiatives.find(i => i.slug === req.params.slug);
    }

    if (!initiative) {
      return res.status(404).json({ success: false, message: 'Initiative not found' });
    }

    res.status(200).json({ success: true, data: initiative });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new initiative (Admin)
// @route   POST /api/initiatives
// @access  Private (Admin)
const createInitiative = async (req, res, next) => {
  try {
    const { title, description, category, target, achieved, unit, image, tagline } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    let initiative;
    try {
      initiative = await Initiative.create({
        title,
        slug,
        tagline: tagline || '',
        description,
        category: category || 'Cleanliness',
        target: target || 100,
        achieved: achieved || 0,
        unit: unit || 'Drives',
        image: image || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
      });
    } catch (err) {
      initiative = {
        _id: 'init_' + Date.now(),
        title,
        slug,
        tagline: tagline || '',
        description,
        category: category || 'Cleanliness',
        target: target || 100,
        achieved: achieved || 0,
        unit: unit || 'Drives',
        image: image || '',
        createdAt: new Date()
      };
      inMemoryInitiatives.unshift(initiative);
    }

    res.status(201).json({ success: true, data: initiative });
  } catch (error) {
    next(error);
  }
};

// @desc    Update initiative (Admin)
// @route   PUT /api/initiatives/:id
// @access  Private (Admin)
const updateInitiative = async (req, res, next) => {
  try {
    let initiative;
    try {
      initiative = await Initiative.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    } catch (err) {
      const idx = inMemoryInitiatives.findIndex(i => i._id === req.params.id);
      if (idx !== -1) {
        inMemoryInitiatives[idx] = { ...inMemoryInitiatives[idx], ...req.body };
        initiative = inMemoryInitiatives[idx];
      }
    }

    if (!initiative) {
      return res.status(404).json({ success: false, message: 'Initiative not found' });
    }

    res.status(200).json({ success: true, data: initiative });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete initiative (Admin)
// @route   DELETE /api/initiatives/:id
// @access  Private (Admin)
const deleteInitiative = async (req, res, next) => {
  try {
    try {
      await Initiative.findByIdAndDelete(req.params.id);
    } catch (err) {
      inMemoryInitiatives = inMemoryInitiatives.filter(i => i._id !== req.params.id);
    }
    res.status(200).json({ success: true, message: 'Initiative removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInitiatives,
  getInitiativeBySlug,
  createInitiative,
  updateInitiative,
  deleteInitiative
};
