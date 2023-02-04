const { Op } = require('sequelize');
const { Product } = require('../../../db');
const { getPagination } = require('../../../utils/utils');

const getProducts = async (page, size, sort, filter) => {
    const { limit, offset } = getPagination(page, size);

    const options = { limit, offset };

    if (sort) {
        options.order = [JSON.parse(sort)];
    }

    // Filter by ids, name and status
    if (filter && Object.keys(JSON.parse(filter)).length > 0) {
        // console.log('JSON.parse(filter): ', JSON.parse(filter));
        const filterObj = JSON.parse(filter);
        if (filterObj.id) {
            // console.log('filterObj.id: ', filterObj.id);
        }
        const idsCondition = filterObj.id ? { [Op.in]: filterObj.id } : { [Op.gt]: 0 };
        const nameCondition = filterObj.name ? { [Op.iLike]: `${JSON.parse(filter).name}%` } : { [Op.iLike]: '%' };
        const statusCondition = filterObj.status ? { [Op.eq]: filterObj.status } : { [Op.in]: ['Active', 'Disabled'] };
        // console.log('idsCondition, nameCondition, statusCondition: ', idsCondition, nameCondition, statusCondition);
        options.where = { [Op.and]: [{ id: idsCondition }, { name: nameCondition }, { status: statusCondition }] };
    }

    // console.log('options: ', options);
    let products = await Product.findAndCountAll(options);

    const response = {
        count: products.count,
        rows: []
    }

    for (let product of products.rows) {
        let categories = await product.getCategories()
        // console.log('categories: ', categories);

        response.rows.push({
            id: product.id,
            groupId: product.groupId,
            name: product.name,
            status: product.status,
            categories: categories.map(category => category.dataValues.id).join(',')
        })
    }

    // console.log('response.rows: ', response.rows);

    return products;
}

module.exports = { getProducts };
