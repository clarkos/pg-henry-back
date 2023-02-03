const { Category } = require('../../../db');

const editCategory = async (id, name, status) => {
    // console.log('Editing category!');
    let category = await Category.findByPk(id);
    // console.log('category: ', category);

    await category.update({
        name,
        status
    });

    return category;
}

module.exports = { editCategory };
