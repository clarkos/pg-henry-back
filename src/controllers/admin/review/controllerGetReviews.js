const { Op } = require('sequelize');
const { Review } = require('../../../db');
const { getPagination } = require('../../../utils/utils');

const getReviews = async (page, size, sort, filter) => {
    const { limit, offset } = getPagination(page, size);

    const options = { limit, offset };

    if (sort) {
        options.order = [JSON.parse(sort)];
    }

    // Filter by ids, name and status
    if (filter && Object.keys(JSON.parse(filter)).length > 0) {
        // console.log('JSON.parse(filter): ', JSON.parse(filter));
        const filterObj = JSON.parse(filter);
        if (filterObj.id) {
            // console.log('filterObj.id: ', filterObj.id);
        }
        const idsCondition = filterObj.id ? { [Op.in]: filterObj.id } : { [Op.gt]: 0 };
        const nameCondition = filterObj.name ? { [Op.iLike]: `${JSON.parse(filter).name}%` } : { [Op.iLike]: '%' };
        const statusCondition = filterObj.status ? { [Op.eq]: filterObj.status } : { [Op.in]: ['Active', 'Disabled'] };
        // console.log('idsCondition, nameCondition, statusCondition: ', idsCondition, nameCondition, statusCondition);
        options.where = { [Op.and]: [{ id: idsCondition }, { name: nameCondition }, { status: statusCondition }] };
    }

    console.log('options: ', options);
    let reviews = await Review.findAndCountAll(options);

    console.log('review: ', reviews.rows);

    const response = {
        count: reviews.count,
        rows: reviews.rows.map(review => ({
            id: review.id,
            userId: review.userId,
            productId: review.productId,
            message: review.message,
            stars: review.stars,
            status: review.status
        }))
    }

    return reviews;
}

module.exports = { getReviews };
