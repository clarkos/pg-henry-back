const { Product } = require('../../../db');

const getProduct = async (id) => {
    const product = await Product.findByPk(id);

    // Categories
    const categories = await product.getCategories();
    product.dataValues.categories = categories.map(category => category.dataValues.id);

    // Photos
    const photos = await product.getPhotos();
    if (photos) {
        product.dataValues.photos = [];

        product.dataValues.photos = photos.map(photo => (
            {
                id: photo.dataValues.id,
                title: getPhotoTitle(photo.dataValues.path),
                src: photo.dataValues.path
            })
        );
    }

    return product.dataValues;
}

function getPhotoTitle(path) {
    const pathArr = path.split('/');
    if (pathArr && pathArr.length > 0) {
        return pathArr[pathArr.length - 1];
    }
    return 'no title';
}

module.exports = { getProduct };
