import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log('[Cloudinary] Configured successfully with cloud:', process.env.CLOUDINARY_CLOUD_NAME);
} else {
  console.log('[Cloudinary] Credentials not provided or incomplete. Local file storage fallback enabled.');
}

/**
 * Upload an image buffer or file path to Cloudinary (or local storage fallback)
 */
export const uploadToCloudinary = async (file, folder = 'seva-ngo') => {
  if (isCloudinaryConfigured && file) {
    try {
      // If multer file object with buffer
      if (file.buffer) {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: folder,
              resource_type: 'image'
            },
            (error, result) => {
              if (error) return reject(error);
              resolve({
                url: result.secure_url,
                publicId: result.public_id
              });
            }
          );
          uploadStream.end(file.buffer);
        });
      }

      // If file path
      if (file.path) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: folder,
          resource_type: 'image'
        });
        return {
          url: result.secure_url,
          publicId: result.public_id
        };
      }
    } catch (error) {
      console.error('[Cloudinary] Upload failed, falling back to local storage:', error.message);
    }
  }

  // Local storage fallback
  const uploadsDir = path.resolve('public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filename = `${Date.now()}-${file.originalname || 'image.jpg'}`.replace(/\s+/g, '-');
  const filePath = path.join(uploadsDir, filename);

  if (file.buffer) {
    fs.writeFileSync(filePath, file.buffer);
  } else if (file.path) {
    fs.copyFileSync(file.path, filePath);
  }

  return {
    url: `/uploads/${filename}`,
    publicId: `local-${filename}`
  };
};

/**
 * Delete an image from Cloudinary (or local storage fallback)
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return true;

  if (isCloudinaryConfigured && !publicId.startsWith('local-')) {
    try {
      const res = await cloudinary.uploader.destroy(publicId);
      return res.result === 'ok';
    } catch (err) {
      console.warn('[Cloudinary] Deletion error:', err.message);
      return false;
    }
  }

  if (publicId.startsWith('local-')) {
    try {
      const filename = publicId.replace('local-', '');
      const filePath = path.resolve('public', 'uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return true;
    } catch (err) {
      console.warn('[LocalStorage] Deletion error:', err.message);
      return false;
    }
  }

  return true;
};

export default cloudinary;
