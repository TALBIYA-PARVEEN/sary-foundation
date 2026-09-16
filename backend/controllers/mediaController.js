const Media = require('../models/Media');

const defaultMedia = [
  {
    _id: 'def_1',
    title: 'Ghat Clean-up Drive & Waste Segregation #1',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=400&q=80',
    category: 'Drives',
    description: 'Volunteers collecting plastic bottles and debris during Sunday morning plog drive.',
    eventDate: new Date('2024-08-15'),
    featured: true
  },
  {
    _id: 'def_2',
    title: 'Mega Tree Plantation with Youth Volunteers',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=400&q=80',
    category: 'Plantation',
    description: 'Planting over 500 neem, banyan, and peepal saplings in community school campus.',
    eventDate: new Date('2024-09-02'),
    featured: true
  },
  {
    _id: 'def_3',
    title: 'Zero Waste & Plastic-Free Lifestyle Workshop',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=80',
    category: 'Youth',
    description: 'Interactive session educating students on sustainable waste segregation.',
    eventDate: new Date('2024-10-10'),
    featured: true
  },
  {
    _id: 'def_4',
    title: 'Community Cleanliness Movement Documentary',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=RMOHU9tUnco',
    thumbnail: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    category: 'Drives',
    description: 'A glimpse into the impact of weekly plogging and community participation.',
    eventDate: new Date('2024-10-20'),
    featured: true
  },
  {
    _id: 'def_5',
    title: 'Riverbank Cleanliness Spotlight',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=95g0Ni2arwU',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    category: 'Press',
    description: 'News coverage highlighting youth engagement in environmental sustainability.',
    eventDate: new Date('2024-11-05'),
    featured: true
  },
  {
    _id: 'def_6',
    title: 'Eco-Friendly Festival Waste Composting',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=400&q=80',
    category: 'Events',
    description: 'Transforming floral offerings into organic fertilizer.',
    eventDate: new Date('2024-11-12'),
    featured: false
  }
];

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
