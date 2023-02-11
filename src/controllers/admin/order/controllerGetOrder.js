const { Order, OrderItem } = require('../../../db');

const getOrder = async (id) => {
    // let order = await Order.findByPk(id, { include: { model: OrderItem}});
    let order = await Order.findByPk(id, { include: { all: true, nested: true }});
    // console.log('order: ', order);

    return order;
}

module.exports = { getOrder };
