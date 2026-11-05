import Testimonial from '../models/Testimonial.js';

// @desc    Get all active testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ featured: true }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
export const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    await testimonial.deleteOne();
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};
