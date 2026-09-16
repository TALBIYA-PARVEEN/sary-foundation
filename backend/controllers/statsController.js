const Stats = require('../models/Stats');

const defaultStats = [
  {
    _id: 'stat_1',
    key: 'clean_up_drives',
    label: 'Ghat & City Clean-Up Drives',
    value: 120,
    prefix: '',
    suffix: '+',
    icon: 'Trash2',
    order: 1
  },
  {
    _id: 'stat_2',
    key: 'volunteers',
    label: 'Dedicated Volunteers',
    value: 650,
    prefix: '',
    suffix: '+',
    icon: 'Users',
    order: 2
  },
  {
    _id: 'stat_3',
    key: 'trash_removed',
    label: 'Trash Removed from Waterbodies',
    value: 85,
    prefix: '',
    suffix: ' Mt+',
    icon: 'Waves',
    order: 3
  },
  {
    _id: 'stat_4',
    key: 'saplings_planted',
    label: 'Trees Planted & Nurtured',
    value: 15000,
    prefix: '',
    suffix: '+',
    icon: 'TreePine',
    order: 4
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
