const express = require('express');
const router = express.Router();
const {
  registerVolunteer,
  getVolunteers,
  updateVolunteerStatus,
  deleteVolunteer
} = require('../controllers/volunteerController');
const { protect } = require('../middleware/authMiddleware');
const { formLimiter } = require('../middleware/rateLimiter');

router.route('/')
  .post(formLimiter, registerVolunteer)
  .get(protect, getVolunteers);

router.route('/:id/status')
  .put(protect, updateVolunteerStatus);

router.route('/:id')
  .delete(protect, deleteVolunteer);

module.exports = router;
