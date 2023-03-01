const { Op } = require('sequelize');
const { Customer } = require('../../../db');

const existCustomerByName = async (name, id = 0) => {
    console.log('existsCustomerByName', name, id);
    const options = {};
    const nameCondition = { [Op.iLike]: `${name}` };
    const idCondition = { [Op.ne]: id }
    options.where = { [Op.and]: [{ id: idCondition }, { name: nameCondition }] };

    const customers = await Customer.findAndCountAll(options);

    return (customers.count > 0);
}

module.exports = existCustomerByName;
