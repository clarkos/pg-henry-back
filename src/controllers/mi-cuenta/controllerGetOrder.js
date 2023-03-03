const { Order } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const ValidationError = require('../../utils/validation-error');

const getOrder = async (id, userName) => {
    let order = await Order.findByPk(id, { include: { all: true, nested: true }});
    // console.log('userName: ', order.Customer.User.userName);

    // Chech logged user
    if (order && userName !== order.Customer.User.userName) {
        throw new ValidationError('Auth error', 'auth error', httpStatusCodes.FORBIDDEN);
    }

    return order;
}

module.exports = { getOrder };
