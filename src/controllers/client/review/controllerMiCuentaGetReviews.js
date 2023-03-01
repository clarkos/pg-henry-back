const { Op } = require('sequelize');
const { Review } = require('../../../db');
const { getPagination } = require('../../../utils/utils');

const getMiCuentaReviews = async (page, size, sort, filter) => {
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
        const productCondition = filterObj.productId ?
            { [Op.eq]: filterObj.productId }
            :
            { [Op.gt]: 0 };
        const userCondition = filterObj.userId ?
            { [Op.eq]: filterObj.userId }
            :
            { [Op.gt]: 0 };
        const starsCondition = filterObj.stars ?
            { [Op.gte]: filterObj.stars }
            :
            { [Op.gt]: 0 };
        options.where = {
            [Op.and]: [
                { id: idsCondition },
                { productId: productCondition },
                { userId: userCondition },
                { stars: starsCondition }
            ]
        };
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

    return response;
}

module.exports = { getMiCuentaReviews };
