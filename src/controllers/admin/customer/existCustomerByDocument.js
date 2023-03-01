const { Op } = require('sequelize');
const { Customer } = require('../../../db');

const existCustomerByDocument = async (document, id = 0) => {

    const options = {};
    const documentCondition = { [Op.eq]: `${document}` };
    const idCondition = { [Op.ne]: id }
    options.where = { [Op.and]: [{ id: idCondition }, { document: documentCondition }] };

    const customers = await Customer.findAndCountAll(options);

    return (customers.count > 0);
}

module.exports = existCustomerByDocument;
