import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Image title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    category: {
      type: String,
      default: 'Community Service',
      trim: true
    },
    caption: {
      type: String,
      trim: true,
      maxlength: [500, 'Caption cannot exceed 500 characters']
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required']
    },
    imagePublicId: {
      type: String,
      default: ''
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Virtual property for image compatibility
galleryImageSchema.virtual('image').get(function () {
  return this.imageUrl;
});

galleryImageSchema.set('toJSON', { virtuals: true });
galleryImageSchema.set('toObject', { virtuals: true });

const GalleryImage = mongoose.models.GalleryImage || mongoose.model('GalleryImage', galleryImageSchema);

export default GalleryImage;
