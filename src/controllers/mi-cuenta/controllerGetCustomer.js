const { Customer, User } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const ValidationError = require('../../utils/validation-error');

const getCustomer = async (id, userName) => {
    let customer = await Customer.findByPk(id, { include: { model: User } });
    // console.log('getCustomer user: ', customer.User.userName);

    if (customer && customer.User.userName !== userName) {
        throw new ValidationError('Auth error', 'auth error', httpStatusCodes.FORBIDDEN);
    }

    return customer;
}

module.exports = { getCustomer };
