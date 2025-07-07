import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

export const getResizedImage = (publicId, width = 48, height = 48) => {
  return cld.image(publicId).resize(`w_${width},h_${height},c_fill`).toURL();
};