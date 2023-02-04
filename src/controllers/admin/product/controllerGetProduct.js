const { Product } = require('../../../db');

const getProduct = async (id) => {
    let product = await Product.findByPk(id);
    
    let categories = await product.getCategories();
    product.dataValues.categories = categories.map(category => category.dataValues.id);
    // console.log('product: ', product);

    return product.dataValues;
}

module.exports = { getProduct };
