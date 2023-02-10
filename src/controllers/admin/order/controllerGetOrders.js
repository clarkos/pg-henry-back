const { Op } = require('sequelize');
const { Order, OrderItem } = require('../../../db');
const { getPagination } = require('../../../utils/utils');

const getOrders = async (page, size, sort, filter) => {
    const { limit, offset } = getPagination(page, size);

    const options = { limit, offset };

    if (sort) {
        options.order = [JSON.parse(sort)];
    }

    // Filter by ids and status
    if (filter && Object.keys(JSON.parse(filter)).length > 0) {
        const filterObj = JSON.parse(filter);

        const idsCondition = filterObj.id ? { [Op.in]: filterObj.id } : { [Op.gt]: 0 };
        const statusCondition = filterObj.status ? { [Op.eq]: filterObj.status } : { [Op.in]: ['Active', 'Disabled'] };
        options.where = { [Op.and]: [{ id: idsCondition }, { status: statusCondition }] };
    }

    // options.include = [{ model: OrderItem }];

    // console.log('options: ', options);
    let orders = await Order.findAndCountAll(options);

    return orders;
}

module.exports = { getOrders };
