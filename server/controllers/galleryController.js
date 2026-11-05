import GalleryImage from '../models/GalleryImage.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGalleryImages = async (req, res, next) => {
  try {
    const { category, search, featured } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { caption: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const images = await GalleryImage.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: images.length,
      data: images
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload / add a new gallery image
// @route   POST /api/gallery
// @access  Private/Admin
export const uploadGalleryImage = async (req, res, next) => {
  try {
    let imageUrl = req.body.imageUrl || req.body.image;
    let imagePublicId = '';

    if (req.file) {
      const uploadRes = await uploadToCloudinary(req.file, 'seva-ngo/gallery');
      imageUrl = uploadRes.url;
      imagePublicId = uploadRes.publicId;
    }

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image file or an image URL'
      });
    }

    const { title, category, caption, featured } = req.body;

    const galleryImage = await GalleryImage.create({
      title: title || 'NGO Activity Photo',
      category: category || 'Community Service',
      caption: caption || '',
      imageUrl,
      imagePublicId,
      featured: featured === 'true' || featured === true
    });

    res.status(201).json({
      success: true,
      message: 'Gallery image uploaded successfully',
      data: galleryImage
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryImage = async (req, res, next) => {
  try {
    const image = await GalleryImage.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Gallery image not found'
      });
    }

    if (image.imagePublicId) {
      await deleteFromCloudinary(image.imagePublicId);
    }

    await image.deleteOne();

    res.json({
      success: true,
      message: 'Gallery image removed successfully'
    });
  } catch (error) {
    next(error);
  }
};
