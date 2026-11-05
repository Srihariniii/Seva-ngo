import Donation from '../models/Donation.js';
import Cause from '../models/Cause.js';

// @desc    Initiate / record a donation
// @route   POST /api/donations
// @access  Public
export const createDonation = async (req, res, next) => {
  try {
    const {
      donorName,
      email,
      phone,
      amount,
      causeId,
      message,
      isAnonymous,
      simulatePaymentSuccess // for testing workflow before live gateway keys
    } = req.body;

    let causeTitle = 'General NGO Fund';
    let cause = null;

    if (causeId) {
      cause = await Cause.findById(causeId);
      if (cause) {
        causeTitle = cause.title;
      }
    }

    // Default status is 'pending' unless workflow testing flag is requested
    const paymentStatus = simulatePaymentSuccess ? 'successful' : 'pending';

    const donation = await Donation.create({
      donorName: donorName || 'Kind Supporter',
      email,
      phone: phone || '',
      amount: Number(amount),
      cause: cause ? cause._id : null,
      causeTitle,
      paymentMethod: 'Test Simulation (Razorpay/Stripe Integration Ready)',
      paymentStatus,
      isAnonymous: Boolean(isAnonymous),
      message: message || ''
    });

    // If payment was marked successful, update the cause amountRaised
    if (paymentStatus === 'successful' && cause) {
      cause.amountRaised = (cause.amountRaised || 0) + Number(amount);
      cause.donorCount = (cause.donorCount || 0) + 1;
      await cause.save();
    }

    res.status(201).json({
      success: true,
      message: paymentStatus === 'successful'
        ? 'Donation recorded successfully! Thank you for supporting Seva NGO.'
        : 'Donation order initiated. Payment gateway integration placeholder active.',
      data: donation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all donations
// @route   GET /api/donations
// @access  Private/Admin
export const getDonations = async (req, res, next) => {
  try {
    const { status, causeId, search } = req.query;
    let query = {};

    if (status) {
      query.paymentStatus = status;
    }

    if (causeId) {
      query.cause = causeId;
    }

    if (search) {
      query.$or = [
        { donorName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { transactionId: { $regex: search, $options: 'i' } }
      ];
    }

    const donations = await Donation.find(query).sort({ createdAt: -1 });

    // Calculate totals
    const totalAmount = donations
      .filter((d) => d.paymentStatus === 'successful')
      .reduce((acc, curr) => acc + curr.amount, 0);

    res.json({
      success: true,
      count: donations.length,
      totalAmount,
      data: donations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single donation by transaction ID or ID
// @route   GET /api/donations/:id
// @access  Public
export const getDonationById = async (req, res, next) => {
  try {
    let donation;
    if (req.params.id.startsWith('SEVA-')) {
      donation = await Donation.findOne({ transactionId: req.params.id });
    } else {
      donation = await Donation.findById(req.params.id);
    }

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation record not found' });
    }

    res.json({
      success: true,
      data: donation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update donation status
// @route   PUT /api/donations/:id
// @access  Private/Admin
export const updateDonationStatus = async (req, res, next) => {
  try {
    const { paymentStatus } = req.body;
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation record not found' });
    }

    const previousStatus = donation.paymentStatus;
    donation.paymentStatus = paymentStatus;
    await donation.save();

    // If changing to successful from pending/failed, increment cause
    if (previousStatus !== 'successful' && paymentStatus === 'successful' && donation.cause) {
      const cause = await Cause.findById(donation.cause);
      if (cause) {
        cause.amountRaised = (cause.amountRaised || 0) + donation.amount;
        cause.donorCount = (cause.donorCount || 0) + 1;
        await cause.save();
      }
    }

    res.json({
      success: true,
      message: 'Donation status updated',
      data: donation
    });
  } catch (error) {
    next(error);
  }
};
