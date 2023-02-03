const { Category } = require('../../../db');

const createCategory = async (name, status) => {
    // let category = await Category.findByPk(id);
    // console.log('category: ', category);

    const category = await Category.create({
        name,
        status
    });

    return category;
}

module.exports = { createCategory };
