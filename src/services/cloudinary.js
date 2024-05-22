import { v2 as cloudinary } from "cloudinary";
import configs from './../config/config.js';

const cloudinaryConfig = cloudinary.config({
  cloud_name: configs.cloudinary.cloud_name,
  api_key:configs.cloudinary.api_key,
  api_secret: configs.cloudinary.api_secret,
});

const uploadFile = async (file) => {
  const base64EncodedImage = Buffer.from(file.buffer).toString("base64")
  const dataUri = `data:${file.mimetype};base64,${base64EncodedImage}`
  const res = await cloudinary.uploader.upload(dataUri,{
    folder:"pyglo-app"
  })

  return res;
};

export { cloudinaryConfig, uploadFile };
