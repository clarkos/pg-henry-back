const { Category } = require('../../../db');

const getCategory = async (id) => {
    let category = await Category.findByPk(id);
    // console.log('category: ', category);

    return category;
}

module.exports = { getCategory };
