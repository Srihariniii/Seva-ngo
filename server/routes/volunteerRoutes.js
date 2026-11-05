import express from 'express';
import {
  submitVolunteer,
  getVolunteers,
  updateVolunteerStatus,
  deleteVolunteer
} from '../controllers/volunteerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(submitVolunteer)
  .get(protect, getVolunteers);

router.route('/:id')
  .put(protect, updateVolunteerStatus)
  .delete(protect, deleteVolunteer);

export default router;
