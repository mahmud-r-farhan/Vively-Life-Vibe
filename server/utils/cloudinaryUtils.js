const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = (file, folder = 'devplus_users') => {
  return new Promise((resolve, reject) => {
    const publicId = `user_${Date.now()}`;
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, public_id: publicId },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(file.buffer);
  });
};

const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };