const { Op } = require('sequelize');
const { User } = require('../../../db');
const { getPagination } = require('../../../utils/utils');

const getUsers = async (page, size, sort, filter) => {
    const { limit, offset } = getPagination(page, size);
 
    const options = { limit, offset };

    if (sort) {
        options.order = [JSON.parse(sort)];
    }

    // Filter by ids, name and status
    if (filter && Object.keys(JSON.parse(filter)).length > 0) {
        // console.log('JSON.parse(filter): ', JSON.parse(filter));
        const filterObj = JSON.parse(filter);
        // console.log("filterObj: ", filterObj)
        const idsCondition = filterObj.id ? { [Op.in]: filterObj.id } : { [Op.gt]: 0 };
        const nameCondition = filterObj.userName ? { [Op.iLike]: `${JSON.parse(filter).userName}%` } : { [Op.iLike]: '%' };
        const statusCondition = filterObj.status ? { [Op.eq]: filterObj.status } : { [Op.in]: ['Active', 'Disabled'] };
        // console.log('idsCondition, nameCondition, statusCondition: ', idsCondition, nameCondition, statusCondition);
        options.where = { [Op.and]: [{ id: idsCondition }, { userName: nameCondition }, { status: statusCondition }] };
    }

    // console.log('options: ', options);
    let users = await User.findAndCountAll(options);

    // console.log('users: ', users.rows);

    const response = {
        count: users.count,
        rows: users.rows.map(user => ({
            id: user.id,
            userName: user.userName,
            password: user.password,
            role: user.role,
            status: user.status
        }))
    }

    return users;
}

module.exports = { getUsers };
