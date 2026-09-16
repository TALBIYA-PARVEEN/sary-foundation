const Contact = require('../models/Contact');
const { sendContactNotification } = require('../utils/emailService');

// In-memory fallback if MongoDB is not connected in local dev
let inMemoryContacts = [];

// @desc    Submit public contact message
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    let contact;
    try {
      contact = await Contact.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : '',
        subject: subject ? subject.trim() : 'General Inquiry',
        message: message.trim()
      });
    } catch (dbErr) {
      console.warn('[Contact] MongoDB save error, using in-memory store:', dbErr.message);
      contact = {
        _id: 'temp_' + Date.now(),
        name,
        email,
        phone,
        subject: subject || 'General Inquiry',
        message,
        status: 'unread',
        createdAt: new Date()
      };
      inMemoryContacts.unshift(contact);
    }

    // Trigger Brevo email notification asynchronously
    sendContactNotification(contact).catch(err => console.error('[Email Notification Error]:', err));

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. We will get back to you shortly.',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact inquiries
// @route   GET /api/contact
// @access  Private (Admin)
const getContacts = async (req, res, next) => {
  try {
    let contacts;
    try {
      const { status } = req.query;
      const query = status ? { status } : {};
      contacts = await Contact.find(query).sort({ createdAt: -1 });
    } catch (err) {
      contacts = inMemoryContacts;
    }

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id/status
// @access  Private (Admin)
const updateContactStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    let contact;
    try {
      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { status, ...(notes !== undefined && { notes }) },
        { new: true, runValidators: true }
      );
    } catch (err) {
      const idx = inMemoryContacts.findIndex(c => c._id === req.params.id);
      if (idx !== -1) {
        inMemoryContacts[idx].status = status;
        contact = inMemoryContacts[idx];
      }
    }

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact inquiry
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContact = async (req, res, next) => {
  try {
    try {
      await Contact.findByIdAndDelete(req.params.id);
    } catch (err) {
      inMemoryContacts = inMemoryContacts.filter(c => c._id !== req.params.id);
    }
    res.status(200).json({ success: true, message: 'Contact message removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact
};
