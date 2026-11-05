import mongoose from 'mongoose';
const donationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: [true, 'Donor name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: [1, 'Donation amount must be at least 1']
    },
    currency: {
      type: String,
      default: 'INR'
    },
    cause: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cause',
      default: null
    },
    causeTitle: {
      type: String,
      default: 'General NGO Fund'
    },
    paymentMethod: {
      type: String,
      default: 'Demonstration / Future Razorpay-Stripe Gateway'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'successful', 'failed'],
      default: 'pending'
    },
    transactionId: {
      type: String,
      default: () => `SEVA-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
    },
    isAnonymous: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Donation = mongoose.models.Donation || mongoose.model('Donation', donationSchema);

export default Donation;
