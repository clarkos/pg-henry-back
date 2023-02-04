const cloudinary = require("cloudinary");

require('dotenv').config();
const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
} = process.env;

async function uploadPhotoToCloudinary(base64Photo, publicId) {
    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET
    });

    const result = await cloudinary.v2.uploader
        .upload(base64Photo, { folder: 'HenryMusic', public_id: publicId });

    console.log('cloudinary result: ', result);
    return result.secure_url;
}

module.exports = { uploadPhotoToCloudinary }