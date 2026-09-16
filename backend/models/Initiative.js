const mongoose = require('mongoose');

const InitiativeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Initiative title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  tagline: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    enum: ['Cleanliness', 'Reforestation', 'Upcycling', 'Education', 'Water Revival'],
    default: 'Cleanliness'
  },
  icon: {
    type: String,
    default: 'Sparkles'
  },
  image: {
    type: String,
    default: ''
  },
  target: {
    type: Number,
    default: 100
  },
  achieved: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    default: 'Drives'
  },
  status: {
    type: String,
    enum: ['active', 'upcoming', 'completed'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Initiative', InitiativeSchema);
