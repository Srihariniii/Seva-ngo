import Volunteer from '../models/Volunteer.js';

// @desc    Register a new volunteer
// @route   POST /api/volunteers
// @access  Public
export const submitVolunteer = async (req, res, next) => {
  try {
    const { name, email, phone, age, city, areaOfInterest, availability, message } = req.body;

    // Check if duplicate submission pending
    const existing = await Volunteer.findOne({
      email: email.toLowerCase().trim(),
      status: 'pending'
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A volunteer application with this email is already under review. We will contact you shortly!'
      });
    }

    const volunteer = await Volunteer.create({
      name,
      email: email.toLowerCase().trim(),
      phone,
      age: Number(age),
      city,
      areaOfInterest,
      availability: availability || 'Weekends',
      message: message || ''
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for registering to volunteer! Our team will reach out soon.',
      data: volunteer
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all volunteers with filtering
// @route   GET /api/volunteers
// @access  Private/Admin
export const getVolunteers = async (req, res, next) => {
  try {
    const { status, search, area } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (area) {
      query.areaOfInterest = area;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const volunteers = await Volunteer.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: volunteers.length,
      data: volunteers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update volunteer status or notes
// @route   PUT /api/volunteers/:id
// @access  Private/Admin
export const updateVolunteerStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer application not found' });
    }

    if (status) volunteer.status = status;
    if (notes !== undefined) volunteer.notes = notes;

    await volunteer.save();

    res.json({
      success: true,
      message: 'Volunteer application updated',
      data: volunteer
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete volunteer record
// @route   DELETE /api/volunteers/:id
// @access  Private/Admin
export const deleteVolunteer = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer application not found' });
    }

    await volunteer.deleteOne();

    res.json({
      success: true,
      message: 'Volunteer application deleted'
    });
  } catch (error) {
    next(error);
  }
};
