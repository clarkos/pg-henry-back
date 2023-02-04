const { Product } = require('../../../db');

const createProduct = async (product) => {

    const createdProduct = await Product.create(product);

    console.log('product.categories: ', product.categories);
    if (product.categories && product.categories.length > 0) {
        await createdProduct.addCategories(product.categories);
    }

    return createdProduct;
}

module.exports = { createProduct };
