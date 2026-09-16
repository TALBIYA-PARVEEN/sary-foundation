const express = require('express');
const router = express.Router();
const {
  getInitiatives,
  getInitiativeBySlug,
  createInitiative,
  updateInitiative,
  deleteInitiative
} = require('../controllers/initiativeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getInitiatives)
  .post(protect, createInitiative);

router.route('/slug/:slug')
  .get(getInitiativeBySlug);

router.route('/:id')
  .put(protect, updateInitiative)
  .delete(protect, deleteInitiative);

module.exports = router;
