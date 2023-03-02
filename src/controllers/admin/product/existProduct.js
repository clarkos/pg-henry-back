const { Op } = require('sequelize');
const { Product } = require('../../../db');

const existProduct = async (name, id = 0) => {
    const options = {};
    const nameCondition = { [Op.iLike]: `${name}` };
    const idCondition = { [Op.ne]: id }
    options.where = { [Op.and]: [{ id: idCondition }, { name: nameCondition }] };

    let products = await Product.findAndCountAll(options);

    return (products.count > 0);
}

module.exports = { existProduct };
