import express from 'express';
import {
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage
} from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getGalleryImages)
  .post(protect, upload.single('imageFile'), uploadGalleryImage);

router.route('/:id')
  .delete(protect, deleteGalleryImage);

export default router;
