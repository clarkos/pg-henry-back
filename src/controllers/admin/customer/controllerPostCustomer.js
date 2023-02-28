const { Customer, User } = require('../../../db');
const { validateCustomer } = require('./validateCustomer');

const createCustomer = async (customer) => {

    // Validate data
    const errors = await validateCustomer(customer);
    if (errors) {
        throw new ValidationError('Validation error', errors, httpStatusCodes.BAD_REQUEST);
    }

    const createdCustomer = await Customer.create(customer);

    return createdCustomer;
}

module.exports = { createCustomer };
