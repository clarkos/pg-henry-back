const { Customer, User } = require('../../../db');

const createCustomer = async (customer) => {

    const createdCustomer = await Customer.create(customer);

    // Categories
    console.log('customer.categories: ', customer.categories);
    if (customer.categories && customer.categories.length > 0) {
        await createdCustomer.addCategories(customer.categories);
    }


    return createdCustomer;
}

module.exports = { createCustomer };
