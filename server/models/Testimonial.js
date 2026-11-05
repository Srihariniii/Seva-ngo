import mongoose from 'mongoose';
const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    role: {
      type: String,
      default: 'Community Supporter',
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Testimonial message is required'],
      trim: true
    },
    avatar: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: 'India'
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    },
    featured: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
