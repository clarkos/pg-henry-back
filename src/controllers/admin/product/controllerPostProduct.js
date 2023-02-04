const path = require('path');
const { Product, Photo } = require('../../../db');
const { uploadPhotoToCloudinary } = require('./uploadPhotoToCloudinary');

const createProduct = async (product) => {

    const createdProduct = await Product.create(product);

    // Categories
    // console.log('product.categories: ', product.categories);
    if (product.categories && product.categories.length > 0) {
        await createdProduct.addCategories(product.categories);
    }

    // Photos
    if (product.photos && product.photos.length > 0) {

        for (const photo of product.photos) {

            const url = await uploadPhotoToCloudinary(photo.base64String, path.parse(photo.title).name);
            photo.secure_url = url;

            const newPhoto = await Photo.create({
                productId: createdProduct.id,
                path: photo.secure_url
            })

        }
    }

    return createdProduct;
}

module.exports = { createProduct };
