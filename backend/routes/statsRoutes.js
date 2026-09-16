const express = require('express');
const router = express.Router();
const { getStats, updateStat } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getStats);

router.route('/:id')
  .put(protect, updateStat);

module.exports = router;
