const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City/Location is required'],
    trim: true
  },
  interest: {
    type: String,
    enum: ['Clean-up Drives', 'Tree Plantation', 'Awareness & Education', 'Social Media & Media', 'Logistics & Events', 'Other'],
    default: 'Clean-up Drives'
  },
  availability: {
    type: String,
    enum: ['Weekends', 'Weekdays', 'Flexible', 'Special Events'],
    default: 'Weekends'
  },
  message: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'contacted', 'archived'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', VolunteerSchema);
