const { Op } = require('sequelize');
const { Location } = require('../../../db');
const { getPagination } = require('../../../utils/utils');

const getLocations = async (page, size, sort, filter) => {
    const { limit, offset } = getPagination(page, size);

    const options = { limit, offset };

    if (sort) {
        options.order = [JSON.parse(sort)];
    }

    // Filter by name and status
    if (filter && Object.keys(JSON.parse(filter)).length > 0) {
        // console.log('JSON.parse(filter): ', JSON.parse(filter));
        const filterObj = JSON.parse(filter);
        const nameCondition = filterObj.name ? { [Op.iLike]: `${JSON.parse(filter).name}%` } : { [Op.iLike]: '%' };
        const statusCondition = filterObj.status ? { [Op.eq]: filterObj.status } : { [Op.in]: ['Active', 'Disabled'] };
        // console.log('nameCondition, statusCondition: ', nameCondition, statusCondition);
        options.where = { [Op.and]: [{ name: nameCondition }, { status: statusCondition }] };
    }

    // console.log('options: ', options);
    let locations = await Location.findAndCountAll(options);

    const response = {
        count: locations.count,
        rows: locations.rows.map(location => ({
            id: location.id,
            name: location.name,
            address: location.address,
            coordinates: location.coordinates,
            status: location.status
        }))
    }

    return locations;
}

module.exports = { getLocations };
