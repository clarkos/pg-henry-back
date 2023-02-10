const { Customer, User } = require('../../../db');

const createCustomer = async (customer) => {

    const createdCustomer = await Customer.create(customer);

    return createdCustomer;
}

module.exports = { createCustomer };
