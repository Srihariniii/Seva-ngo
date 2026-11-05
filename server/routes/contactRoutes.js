import express from 'express';
import {
  submitContactMessage,
  getContactMessages,
  toggleMessageRead,
  deleteContactMessage
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(submitContactMessage)
  .get(protect, getContactMessages);

router.route('/:id/read')
  .put(protect, toggleMessageRead);

router.route('/:id')
  .delete(protect, deleteContactMessage);

export default router;
