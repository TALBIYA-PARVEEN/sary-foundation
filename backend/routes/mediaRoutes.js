const express = require('express');
const router = express.Router();
const {
  getAllMedia,
  createMedia,
  updateMedia,
  deleteMedia
} = require('../controllers/mediaController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllMedia)
  .post(protect, createMedia);

router.route('/:id')
  .put(protect, updateMedia)
  .delete(protect, deleteMedia);

module.exports = router;
