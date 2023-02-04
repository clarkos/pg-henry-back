const path = require('path');
const { Product, Photo } = require('../../../db');
const { uploadPhotoToCloudinary } = require('./uploadPhotoToCloudinary');

const editProduct = async (product) => {
    // console.log('product to edit: ', product);
    let editedProduct = await Product.findByPk(product.id);
    const categories = await editedProduct.getCategories();
    // console.log('categories before remove: ', categories)
    const photos = await editedProduct.getPhotos();

    await editedProduct.update(product);

    // Categories
    // console.log('product.categories: ', product.categories);
    await editedProduct.removeCategories(categories);
    if (product.categories && product.categories.length > 0) {
        await editedProduct.addCategories(product.categories);
    }

    // Photos
    // Delete old photos
    await editedProduct.removePhotos(photos);
    if (product.photos && product.photos.length > 0) {
        console.log('product.photos: ', product.photos);

        for (const photo of product.photos) {

            photo.secure_url = photo.src;
            if (photo.base64String) {
                const url = await uploadPhotoToCloudinary(photo.base64String, path.parse(photo.title).name);
                photo.secure_url = url;
            }

            const newPhoto = await Photo.create({
                productId: editedProduct.id,
                path: photo.secure_url
            })
        }

    }

    return editedProduct;
}

module.exports = { editProduct };
