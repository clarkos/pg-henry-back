const { Op } = require('sequelize');
const { Artist } = require('../../../db');
const { getPagination } = require('../../../utils/utils');

const getArtists = async (page, size, sort, filter) => {
    const { limit, offset } = getPagination(page, size);

    const options = { limit, offset };

    if (sort) {
        options.order = [JSON.parse(sort)];
    }

    // Filter by ids, name and status
    if (filter && Object.keys(JSON.parse(filter)).length > 0) {
        // console.log('JSON.parse(filter): ', JSON.parse(filter));
        const filterObj = JSON.parse(filter);
        const idsCondition = filterObj.id ? { [Op.in]: filterObj.id } : { [Op.gt]: 0 };
        const nameCondition = filterObj.name ? { [Op.iLike]: `${JSON.parse(filter).name}%` } : { [Op.iLike]: '%' };
        const statusCondition = filterObj.status ? { [Op.eq]: filterObj.status } : { [Op.in]: ['Active', 'Disabled'] };
        // console.log('idsCondition, nameCondition, statusCondition: ', idsCondition, nameCondition, statusCondition);
        options.where = { [Op.and]: [{ id: idsCondition }, { name: nameCondition }, { status: statusCondition }] };
    }

    // console.log('options: ', options);
    let artists = await Artist.findAndCountAll(options);

    // console.log('artists: ', artists.rows);

    const response = {
        count: artists.count,
        rows: artists.rows.map(artist => ({
            id: artist.id,
            groupId: artist.groupId,
            name: artist.name,
            status: artist.status
        }))
    }

    return artists;
}

module.exports = { getArtists };
