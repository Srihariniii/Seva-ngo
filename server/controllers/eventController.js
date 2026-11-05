import Event from '../models/Event.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res, next) => {
  try {
    const { status, search, upcoming } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (upcoming === 'true') {
      // Find events with date greater than or equal to start of today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      query.date = { $gte: today };
      query.status = { $ne: 'cancelled' };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(query).sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const upcomingEvents = await Event.find({
      _id: { $ne: event._id },
      date: { $gte: new Date() },
      status: 'upcoming'
    }).limit(3);

    res.json({
      success: true,
      data: event,
      upcomingEvents
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register / RSVP for an event
// @route   POST /api/events/:id/register
// @access  Public
export const registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: 'This event has reached full capacity'
      });
    }

    event.registeredCount += 1;
    await event.save();

    res.json({
      success: true,
      message: 'Registration confirmed for event!',
      data: event
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = async (req, res, next) => {
  try {
    let imageUrl = req.body.image;
    let imagePublicId = '';

    if (req.file) {
      const uploadRes = await uploadToCloudinary(req.file, 'seva-ngo/events');
      imageUrl = uploadRes.url;
      imagePublicId = uploadRes.publicId;
    }

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'An event image is required'
      });
    }

    const {
      title,
      description,
      shortDescription,
      date,
      time,
      location,
      category,
      organizer,
      registrationInfo,
      capacity,
      status
    } = req.body;

    const event = await Event.create({
      title,
      description,
      shortDescription: shortDescription || description.substring(0, 150) + '...',
      date: new Date(date),
      time: time || '10:00 AM - 02:00 PM',
      location,
      category: category || 'Community Drive',
      organizer: organizer || 'Seva NGO Volunteers',
      registrationInfo: registrationInfo || 'Open to all community members and registered volunteers.',
      capacity: Number(capacity) || 100,
      image: imageUrl,
      imagePublicId,
      status: status || 'upcoming'
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
export const updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    let imageUrl = event.image;
    let imagePublicId = event.imagePublicId;

    if (req.file) {
      if (imagePublicId) {
        await deleteFromCloudinary(imagePublicId);
      }
      const uploadRes = await uploadToCloudinary(req.file, 'seva-ngo/events');
      imageUrl = uploadRes.url;
      imagePublicId = uploadRes.publicId;
    } else if (req.body.image && req.body.image !== event.image) {
      imageUrl = req.body.image;
    }

    const updatedData = {
      title: req.body.title || event.title,
      description: req.body.description || event.description,
      shortDescription: req.body.shortDescription || event.shortDescription,
      date: req.body.date ? new Date(req.body.date) : event.date,
      time: req.body.time || event.time,
      location: req.body.location || event.location,
      category: req.body.category || event.category,
      organizer: req.body.organizer || event.organizer,
      registrationInfo: req.body.registrationInfo || event.registrationInfo,
      capacity: req.body.capacity !== undefined ? Number(req.body.capacity) : event.capacity,
      image: imageUrl,
      imagePublicId,
      status: req.body.status || event.status
    };

    event = await Event.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.imagePublicId) {
      await deleteFromCloudinary(event.imagePublicId);
    }

    await event.deleteOne();

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
