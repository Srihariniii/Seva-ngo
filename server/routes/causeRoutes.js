import express from 'express';
import {
  getCauses,
  getCauseById,
  createCause,
  updateCause,
  deleteCause
} from '../controllers/causeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCauses)
  .post(protect, upload.single('imageFile'), createCause);

router.route('/:id')
  .get(getCauseById)
  .put(protect, upload.single('imageFile'), updateCause)
  .delete(protect, deleteCause);

export default router;
