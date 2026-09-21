const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Media title is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['photo', 'video'],
    required: true,
    default: 'photo'
  },
  url: {
    type: String,
    required: [true, 'Media URL or embed is required'],
    trim: true
  },
  thumbnail: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['Drives', 'Plantation', 'Youth', 'Press', 'Events', 'General'],
    default: 'General'
  },
  description: {
    type: String,
    default: ''
  },
  eventDate: {
    type: Date,
    default: Date.now
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true, collection: 'media' });

module.exports = mongoose.model('Media', MediaSchema);
