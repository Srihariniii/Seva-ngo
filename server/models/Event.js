import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Event description is required']
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters']
    },
    date: {
      type: Date,
      required: [true, 'Event date is required']
    },
    time: {
      type: String,
      default: '10:00 AM - 02:00 PM'
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Event image URL is required']
    },
    imagePublicId: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: 'Community Service'
    },
    organizer: {
      type: String,
      default: 'Seva NGO Team'
    },
    registrationInfo: {
      type: String,
      default: 'Open to all community members and registered volunteers.'
    },
    capacity: {
      type: Number,
      default: 100
    },
    registeredCount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming'
    }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
