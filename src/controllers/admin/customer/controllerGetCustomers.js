const { Op } = require('sequelize');
const { Customer } = require('../../../db');
const { getPagination } = require('../../../utils/utils');

const getCustomers = async (page, size, sort, filter) => {
    const { limit, offset } = getPagination(page, size);
 
    const options = { limit, offset };

    if (sort) {
        options.order = [JSON.parse(sort)];
    }

    // Filter by ids, name and status
    if (filter && Object.keys(JSON.parse(filter)).length > 0) {
        // console.log('JSON.parse(filter): ', JSON.parse(filter));
        const filterObj = JSON.parse(filter);
        console.log("filterObj: ", filterObj)
        const idsCondition = filterObj.id ? { [Op.in]: filterObj.id } : { [Op.gt]: 0 };
        const nameCondition = filterObj.name ? { [Op.iLike]: `${JSON.parse(filter).name}%` } : { [Op.iLike]: '%' };
        const statusCondition = filterObj.status ? { [Op.eq]: filterObj.status } : { [Op.in]: ['Active', 'Disabled'] };
        // console.log('idsCondition, nameCondition, statusCondition: ', idsCondition, nameCondition, statusCondition);
        options.where = { [Op.and]: [{ id: idsCondition }, { name: nameCondition }, { status: statusCondition }] };
    }

    console.log('options: ', options);
    let customers = await Customer.findAndCountAll(options);

    console.log('users: ', customers.rows);

    const response = {
        count: customers.count,
        rows: customers.rows.map(customer => ({
            id: customer.id,
            userId: customer.userId,
            name: customer.name,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            zip: customer.zip,
            email: customer.email,
            telephone: customer.telephone,
            document: customer.document,
            birthDate: customer.birthDate,
            status: customer.status,
        }))
    }

    return customers;
}

module.exports = { getCustomers };
