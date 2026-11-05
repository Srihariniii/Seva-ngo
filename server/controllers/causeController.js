import Cause from '../models/Cause.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

// @desc    Get all causes with optional filtering
// @route   GET /api/causes
// @access  Public
export const getCauses = async (req, res, next) => {
  try {
    const { category, search, status, sort, featured } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let querySort = { createdAt: -1 };
    if (sort === 'oldest') querySort = { createdAt: 1 };
    if (sort === 'target-high') querySort = { targetAmount: -1 };
    if (sort === 'target-low') querySort = { targetAmount: 1 };
    if (sort === 'raised-high') querySort = { amountRaised: -1 };

    const causes = await Cause.find(query).sort(querySort);
    const totalCount = await Cause.countDocuments(query);

    res.json({
      success: true,
      count: causes.length,
      totalCount,
      data: causes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single cause by ID
// @route   GET /api/causes/:id
// @access  Public
export const getCauseById = async (req, res, next) => {
  try {
    const cause = await Cause.findById(req.params.id);
    if (!cause) {
      return res.status(404).json({
        success: false,
        message: 'Cause not found'
      });
    }

    // Also get related causes in the same category
    const relatedCauses = await Cause.find({
      category: cause.category,
      _id: { $ne: cause._id },
      status: 'active'
    }).limit(3);

    res.json({
      success: true,
      data: cause,
      relatedCauses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new cause
// @route   POST /api/causes
// @access  Private/Admin
export const createCause = async (req, res, next) => {
  try {
    let imageUrl = req.body.image;
    let imagePublicId = '';

    // If an image file was uploaded via multer
    if (req.file) {
      const uploadRes = await uploadToCloudinary(req.file, 'seva-ngo/causes');
      imageUrl = uploadRes.url;
      imagePublicId = uploadRes.publicId;
    }

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'An image URL or image file is required for the cause'
      });
    }

    const {
      title,
      description,
      shortDescription,
      category,
      targetAmount,
      amountRaised,
      featured,
      status
    } = req.body;

    const cause = await Cause.create({
      title,
      description,
      shortDescription: shortDescription || description.substring(0, 160) + '...',
      category,
      image: imageUrl,
      imagePublicId,
      targetAmount: Number(targetAmount),
      amountRaised: Number(amountRaised) || 0,
      featured: featured === 'true' || featured === true,
      status: status || 'active'
    });

    res.status(201).json({
      success: true,
      message: 'Cause created successfully',
      data: cause
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a cause
// @route   PUT /api/causes/:id
// @access  Private/Admin
export const updateCause = async (req, res, next) => {
  try {
    let cause = await Cause.findById(req.params.id);
    if (!cause) {
      return res.status(404).json({
        success: false,
        message: 'Cause not found'
      });
    }

    let imageUrl = cause.image;
    let imagePublicId = cause.imagePublicId;

    if (req.file) {
      // If updating with a new image file, delete old one if available
      if (imagePublicId) {
        await deleteFromCloudinary(imagePublicId);
      }
      const uploadRes = await uploadToCloudinary(req.file, 'seva-ngo/causes');
      imageUrl = uploadRes.url;
      imagePublicId = uploadRes.publicId;
    } else if (req.body.image && req.body.image !== cause.image) {
      imageUrl = req.body.image;
    }

    const updatedData = {
      title: req.body.title || cause.title,
      description: req.body.description || cause.description,
      shortDescription: req.body.shortDescription || cause.shortDescription,
      category: req.body.category || cause.category,
      image: imageUrl,
      imagePublicId,
      targetAmount: req.body.targetAmount !== undefined ? Number(req.body.targetAmount) : cause.targetAmount,
      amountRaised: req.body.amountRaised !== undefined ? Number(req.body.amountRaised) : cause.amountRaised,
      featured: req.body.featured !== undefined ? (req.body.featured === 'true' || req.body.featured === true) : cause.featured,
      status: req.body.status || cause.status
    };

    cause = await Cause.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Cause updated successfully',
      data: cause
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a cause
// @route   DELETE /api/causes/:id
// @access  Private/Admin
export const deleteCause = async (req, res, next) => {
  try {
    const cause = await Cause.findById(req.params.id);
    if (!cause) {
      return res.status(404).json({
        success: false,
        message: 'Cause not found'
      });
    }

    if (cause.imagePublicId) {
      await deleteFromCloudinary(cause.imagePublicId);
    }

    await cause.deleteOne();

    res.json({
      success: true,
      message: 'Cause deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
