import Cause from '../models/Cause.js';
import Event from '../models/Event.js';
import Volunteer from '../models/Volunteer.js';
import Donation from '../models/Donation.js';
import ContactMessage from '../models/ContactMessage.js';
import GalleryImage from '../models/GalleryImage.js';

// @desc    Get dashboard statistics for admin
// @route   GET /api/stats/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalCauses,
      activeCauses,
      totalEvents,
      upcomingEvents,
      totalVolunteers,
      pendingVolunteers,
      totalDonationsCount,
      allDonations,
      unreadMessages,
      totalGalleryImages,
      recentDonations,
      recentVolunteers,
      recentMessages
    ] = await Promise.all([
      Cause.countDocuments(),
      Cause.countDocuments({ status: 'active' }),
      Event.countDocuments(),
      Event.countDocuments({ status: 'upcoming' }),
      Volunteer.countDocuments(),
      Volunteer.countDocuments({ status: 'pending' }),
      Donation.countDocuments(),
      Donation.find({ paymentStatus: 'successful' }).select('amount'),
      ContactMessage.countDocuments({ isRead: false }),
      GalleryImage.countDocuments(),
      Donation.find().sort({ createdAt: -1 }).limit(5),
      Volunteer.find().sort({ createdAt: -1 }).limit(5),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5)
    ]);

    const totalDonationAmount = allDonations.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    res.json({
      success: true,
      data: {
        summary: {
          totalCauses,
          activeCauses,
          totalEvents,
          upcomingEvents,
          totalVolunteers,
          pendingVolunteers,
          totalDonationsCount,
          totalDonationAmount,
          unreadMessages,
          totalGalleryImages
        },
        recent: {
          donations: recentDonations,
          volunteers: recentVolunteers,
          messages: recentMessages
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
