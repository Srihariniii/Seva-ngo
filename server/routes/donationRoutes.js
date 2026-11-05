import express from 'express';
import {
  createDonation,
  getDonations,
  getDonationById,
  updateDonationStatus
} from '../controllers/donationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createDonation)
  .get(protect, getDonations);

router.route('/:id')
  .get(getDonationById)
  .put(protect, updateDonationStatus);

export default router;
