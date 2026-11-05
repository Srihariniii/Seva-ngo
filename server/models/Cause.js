import mongoose from 'mongoose';
const causeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Cause title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters']
    },
    description: {
      type: String,
      required: [true, 'Cause description is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Education',
        'Food Distribution',
        'Healthcare',
        'Women Empowerment',
        'Rural Development',
        'Elderly Care',
        'Environment',
        'Disaster Relief',
        'Other'
      ],
      default: 'Education'
    },
    image: {
      type: String,
      required: [true, 'Image URL is required']
    },
    imagePublicId: {
      type: String,
      default: ''
    },
    targetAmount: {
      type: Number,
      required: [true, 'Target amount is required'],
      min: [0, 'Target amount cannot be negative']
    },
    amountRaised: {
      type: Number,
      default: 0,
      min: [0, 'Amount raised cannot be negative']
    },
    donorCount: {
      type: Number,
      default: 0,
      min: [0, 'Donor count cannot be negative']
    },
    featured: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'paused'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

causeSchema.virtual('progressPercentage').get(function () {
  if (!this.targetAmount || this.targetAmount === 0) return 0;
  const pct = (this.amountRaised / this.targetAmount) * 100;
  return Math.min(Math.round(pct), 100);
});

causeSchema.set('toJSON', { virtuals: true });
causeSchema.set('toObject', { virtuals: true });

const Cause = mongoose.models.Cause || mongoose.model('Cause', causeSchema);

export default Cause;
