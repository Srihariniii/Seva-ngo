import ContactMessage from '../models/ContactMessage.js';
import { sendContactNotificationSafe } from '../utils/emailService.js';

// @desc    Submit a contact inquiry
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, subject, message.'
      });
    }

    // 1. MUST save the message to MongoDB Atlas first
    let contact;
    try {
      contact = await ContactMessage.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: (phone || '').trim(),
        subject: subject.trim(),
        message: message.trim()
      });
    } catch (dbError) {
      // If a transient TLS/SSL alert or connection drop occurs, retry save
      if (
        dbError.message?.includes('SSL') ||
        dbError.message?.includes('alert') ||
        dbError.message?.includes('connection') ||
        dbError.name === 'MongoNetworkError'
      ) {
        console.warn('[Contact] Transient network/SSL error during save, retrying once...', dbError.message);
        contact = await ContactMessage.create({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          phone: (phone || '').trim(),
          subject: subject.trim(),
          message: message.trim()
        });
      } else {
        throw dbError;
      }
    }

    // 2. Email notification MUST be non-blocking and fail-safe:
    // A failed email / SSL alert will NEVER prevent saving or cause request failure
    sendContactNotificationSafe({
      id: contact._id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject,
      message: contact.message,
      createdAt: contact.createdAt
    }).catch((emailErr) => {
      console.warn('[Contact] Background email error caught and safely suppressed:', emailErr.message);
    });

    // 3. Return 201 response with saved contact data
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will get back to you shortly.',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
export const getContactMessages = async (req, res, next) => {
  try {
    const { read, search } = req.query;
    let query = {};

    if (read !== undefined) {
      query.isRead = read === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const messages = await ContactMessage.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark contact message as read/unread
// @route   PUT /api/contact/:id/read
// @access  Private/Admin
export const toggleMessageRead = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    message.isRead = req.body.isRead !== undefined ? req.body.isRead : !message.isRead;
    await message.save();

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    await message.deleteOne();

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
