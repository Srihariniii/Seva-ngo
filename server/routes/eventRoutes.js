import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, upload.single('imageFile'), createEvent);

router.post('/:id/register', registerForEvent);

router.route('/:id')
  .get(getEventById)
  .put(protect, upload.single('imageFile'), updateEvent)
  .delete(protect, deleteEvent);

export default router;
