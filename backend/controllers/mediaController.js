const Media = require('../models/Media');

// Media collection is kept clean - real drive photos & documentary videos will be uploaded via Admin Portal (/sary-portal)
const defaultMedia = [];

let inMemoryMedia = [...defaultMedia];

// @desc    Get all media items (photos and videos)
// @route   GET /api/media
// @access  Public
const getAllMedia = async (req, res, next) => {
  try {
    const { type, category } = req.query;
    let query = {};
    if (type) query.type = type;
    if (category && category !== 'All') query.category = category;

    let media;
    try {
      media = await Media.find(query).sort({ order: 1, createdAt: -1 });
      if (media.length === 0 && !type && !category) {
        media = inMemoryMedia;
      }
    } catch (err) {
      media = inMemoryMedia;
      if (type) media = media.filter(m => m.type === type);
      if (category && category !== 'All') media = media.filter(m => m.category === category);
    }

    res.status(200).json({
      success: true,
      count: media.length,
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add new photo or video (Admin)
// @route   POST /api/media
// @access  Private (Admin)
const createMedia = async (req, res, next) => {
  try {
    const { title, type, url, thumbnail, category, description, featured } = req.body;

    if (!title || !url) {
      return res.status(400).json({ success: false, message: 'Title and URL are required' });
    }

    let media;
    try {
      media = await Media.create({
        title: title.trim(),
        type: type || 'photo',
        url: url.trim(),
        thumbnail: thumbnail ? thumbnail.trim() : (type === 'video' ? 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80' : url.trim()),
        category: category || 'General',
        description: description ? description.trim() : '',
        featured: Boolean(featured)
      });
    } catch (err) {
      media = {
        _id: 'custom_' + Date.now(),
        title,
        type: type || 'photo',
        url,
        thumbnail: thumbnail || url,
        category: category || 'General',
        description: description || '',
        featured: Boolean(featured),
        createdAt: new Date()
      };
      inMemoryMedia.unshift(media);
    }

    res.status(201).json({
      success: true,
      message: 'Media added successfully',
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update media item
// @route   PUT /api/media/:id
// @access  Private (Admin)
const updateMedia = async (req, res, next) => {
  try {
    let media;
    try {
      media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    } catch (err) {
      const idx = inMemoryMedia.findIndex(m => m._id === req.params.id);
      if (idx !== -1) {
        inMemoryMedia[idx] = { ...inMemoryMedia[idx], ...req.body };
        media = inMemoryMedia[idx];
      }
    }

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    res.status(200).json({ success: true, data: media });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete media item
// @route   DELETE /api/media/:id
// @access  Private (Admin)
const deleteMedia = async (req, res, next) => {
  try {
    try {
      await Media.findByIdAndDelete(req.params.id);
    } catch (err) {
      inMemoryMedia = inMemoryMedia.filter(m => m._id !== req.params.id);
    }
    res.status(200).json({ success: true, message: 'Media item deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMedia,
  createMedia,
  updateMedia,
  deleteMedia
};
