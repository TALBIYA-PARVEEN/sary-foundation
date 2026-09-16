const Volunteer = require('../models/Volunteer');
const { sendVolunteerNotification } = require('../utils/emailService');

let inMemoryVolunteers = [];

// @desc    Register as a volunteer
// @route   POST /api/volunteers
// @access  Public
const registerVolunteer = async (req, res, next) => {
  try {
    const { name, email, phone, city, interest, availability, message } = req.body;

    if (!name || !email || !phone || !city) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and city are required'
      });
    }

    let volunteer;
    try {
      volunteer = await Volunteer.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        city: city.trim(),
        interest: interest || 'Clean-up Drives',
        availability: availability || 'Weekends',
        message: message ? message.trim() : ''
      });
    } catch (dbErr) {
      console.warn('[Volunteer] MongoDB save error, using in-memory store:', dbErr.message);
      volunteer = {
        _id: 'temp_vol_' + Date.now(),
        name,
        email,
        phone,
        city,
        interest: interest || 'Clean-up Drives',
        availability: availability || 'Weekends',
        message: message || '',
        status: 'pending',
        createdAt: new Date()
      };
      inMemoryVolunteers.unshift(volunteer);
    }

    // Trigger Brevo notifications
    sendVolunteerNotification(volunteer).catch(err => console.error('[Volunteer Email Error]:', err));

    res.status(201).json({
      success: true,
      message: 'Thank you for volunteering with SARY Foundation! We will contact you soon.',
      data: volunteer
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all volunteers
// @route   GET /api/volunteers
// @access  Private (Admin)
const getVolunteers = async (req, res, next) => {
  try {
    let volunteers;
    try {
      const { status, interest } = req.query;
      const query = {};
      if (status) query.status = status;
      if (interest) query.interest = interest;
      volunteers = await Volunteer.find(query).sort({ createdAt: -1 });
    } catch (err) {
      volunteers = inMemoryVolunteers;
    }

    res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update volunteer status
// @route   PUT /api/volunteers/:id/status
// @access  Private (Admin)
const updateVolunteerStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    let volunteer;
    try {
      volunteer = await Volunteer.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );
    } catch (err) {
      const idx = inMemoryVolunteers.findIndex(v => v._id === req.params.id);
      if (idx !== -1) {
        inMemoryVolunteers[idx].status = status;
        volunteer = inMemoryVolunteers[idx];
      }
    }

    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }

    res.status(200).json({ success: true, data: volunteer });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete volunteer record
// @route   DELETE /api/volunteers/:id
// @access  Private (Admin)
const deleteVolunteer = async (req, res, next) => {
  try {
    try {
      await Volunteer.findByIdAndDelete(req.params.id);
    } catch (err) {
      inMemoryVolunteers = inMemoryVolunteers.filter(v => v._id !== req.params.id);
    }
    res.status(200).json({ success: true, message: 'Volunteer removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerVolunteer,
  getVolunteers,
  updateVolunteerStatus,
  deleteVolunteer
};
