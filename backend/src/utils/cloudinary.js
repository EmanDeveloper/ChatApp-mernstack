import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configuration
cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_API_key,
  api_secret: process.env.cloudinary_API_secret,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Chat App"
    },
});

export {
  cloudinary,
  storage }; 
