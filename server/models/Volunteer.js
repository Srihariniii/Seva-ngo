import mongoose from 'mongoose';
const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
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
      required: [true, 'Phone number is required'],
      trim: true
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [14, 'Must be at least 14 years old'],
      max: [100, 'Invalid age']
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    areaOfInterest: {
      type: String,
      required: [true, 'Area of interest is required'],
      enum: [
        'Education & Tutoring',
        'Food & Ration Distribution',
        'Healthcare & Medical Camps',
        'Women Empowerment Programs',
        'Elderly Care & Support',
        'Event Management & Logistics',
        'Fundraising & Outreach',
        'Digital & Social Media',
        'Other'
      ],
      default: 'Education & Tutoring'
    },
    availability: {
      type: String,
      default: 'Weekends'
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'contacted', 'rejected'],
      default: 'pending'
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Volunteer = mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
