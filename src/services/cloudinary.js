import { v2 as cloudinary } from "cloudinary";
import configs from './../config/config.js';

const cloudinaryConfig = cloudinary.config({
  cloud_name: configs.cloudinary.cloud_name,
  api_key:configs.cloudinary.api_key,
  api_secret: configs.cloudinary.api_secret,
});

const uploadFile = async (file) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "pyglo-app",
  });
  return res;
};

export { cloudinaryConfig, uploadFile };
