const Stats = require('../models/Stats');

const defaultStats = [
  {
    _id: 'stat_1',
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
    _id: 'stat_2',
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
    _id: 'stat_3',
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
    _id: 'stat_4',
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

let inMemoryStats = [...defaultStats];

// @desc    Get live impact statistics
// @route   GET /api/stats
// @access  Public
const getStats = async (req, res, next) => {
  try {
    let stats;
    try {
      stats = await Stats.find().sort({ order: 1 });
      if (stats.length === 0) stats = inMemoryStats;
    } catch (err) {
      stats = inMemoryStats;
    }

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

// @desc    Update stats item (Admin)
// @route   PUT /api/stats/:id
// @access  Private (Admin)
const updateStat = async (req, res, next) => {
  try {
    const { value, label, suffix, prefix } = req.body;
    let stat;
    try {
      stat = await Stats.findByIdAndUpdate(
        req.params.id,
        { ...(value !== undefined && { value }), ...(label && { label }), ...(suffix !== undefined && { suffix }), ...(prefix !== undefined && { prefix }) },
        { new: true, runValidators: true }
      );
    } catch (err) {
      const idx = inMemoryStats.findIndex(s => s._id === req.params.id);
      if (idx !== -1) {
        if (value !== undefined) inMemoryStats[idx].value = value;
        if (label) inMemoryStats[idx].label = label;
        if (suffix !== undefined) inMemoryStats[idx].suffix = suffix;
        stat = inMemoryStats[idx];
      }
    }

    if (!stat) {
      return res.status(404).json({ success: false, message: 'Stat metric not found' });
    }

    res.status(200).json({ success: true, data: stat });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  updateStat
};
