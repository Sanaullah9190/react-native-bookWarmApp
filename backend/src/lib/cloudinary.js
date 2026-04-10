import dotenv from 'dotenv'
import {v2 as cloudinary } from 'cloudinary'

dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_cloud_name, 
  api_key: process.env.CLOUDINARY_api_key,
  api_secret: process.env.CLOUDINARY_api_secret
});

export default cloudinary;