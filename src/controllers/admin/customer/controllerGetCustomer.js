const { Customer } = require('../../../db');

const getCustomer = async (id) => {
    let customer = await Customer.findByPk(id);
    console.log('customer: ', customer);

    return customer;
}

module.exports = { getCustomer };
