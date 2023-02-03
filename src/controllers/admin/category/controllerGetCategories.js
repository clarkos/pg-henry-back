const { Op } = require('sequelize');
const { Category } = require('../../../db');
const { getPagination } = require('../../../utils/utils');

const getCategories = async (page, size, sort, filter) => {
    const { limit, offset } = getPagination(page, size);

    const options = { limit, offset };

    if (sort) {
        options.order = [JSON.parse(sort)];
    }

    // Filter by name and status
    if (filter && Object.keys(JSON.parse(filter)).length > 0) {
        // console.log('JSON.parse(filter): ', JSON.parse(filter));
        const filterObj = JSON.parse(filter);
        const nameCondition = filterObj.name ? { [Op.iLike]: `${JSON.parse(filter).name}%` } : { [Op.iLike]: '%' };
        const statusCondition = filterObj.status ? { [Op.eq]: filterObj.status } : { [Op.in]: ['Active', 'Disabled'] };
        // console.log('nameCondition, statusCondition: ', nameCondition, statusCondition);
        options.where = { [Op.and]: [{ name: nameCondition }, { status: statusCondition }] };
    }

    // console.log('options: ', options);
    let categories = await Category.findAndCountAll(options);

    const response = {
        count: categories.count,
        rows: categories.rows.map(category => ({
            id: category.id,
            name: category.name,
            status: category.status
        }))
    }

    return categories;
}

module.exports = { getCategories };
