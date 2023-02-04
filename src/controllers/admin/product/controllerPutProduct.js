const { Product } = require('../../../db');

const editProduct = async (product) => {
    // console.log('product to edit: ', product);
    let editedProduct = await Product.findByPk(product.id);
    const categories = await editedProduct.getCategories();
    console.log('categories before remove: ', categories)

    await editedProduct.update(product);


    // console.log('product.categories: ', product.categories);
    await editedProduct.removeCategories(categories);
    if (product.categories && product.categories.length > 0) {
        await editedProduct.addCategories(product.categories);
    }

    return editedProduct;
}

module.exports = { editProduct };
