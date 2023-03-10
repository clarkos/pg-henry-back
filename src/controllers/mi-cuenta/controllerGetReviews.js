const { Op } = require('sequelize');
const { Review, Product, User } = require('../../db');
const { getPagination } = require('../../utils/utils');
const httpStatusCodes = require('../../utils/http-status-codes');
const ValidationError = require('../../utils/validation-error');

const getReviews = async (userId, page, size, sort, filter, userName) => {
    // Check for valid user
    let user = await User.findByPk(userId);
    if (user && user.userName !== userName) {
        throw new ValidationError('Auth error', 'auth error', httpStatusCodes.FORBIDDEN);
    }

    const { limit, offset } = getPagination(page, size);

    const options = { limit, offset };

    if (sort) {
        options.order = [JSON.parse(sort)];
    }

    // Filter by ids, name and status
    const userCondition = { [Op.eq]: userId }

    let filterObj = JSON.parse(filter);

    if (filter && Object.keys(JSON.parse(filter)).length > 0) {
        // console.log('JSON.parse(filter): ', JSON.parse(filter));
        filterObj = JSON.parse(filter);
    }

    const idsCondition = filterObj.id ? { [Op.in]: filterObj.id } : { [Op.gt]: 0 };
    const productCondition = filterObj.productId ?
        { [Op.eq]: filterObj.productId }
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

    options.include = [
        {
            model: Product,
            attributes: ['id', 'name'],
        }
    ]
    
    let reviews = await Review.findAndCountAll(options);

    // console.log('review: ', reviews.rows);

    const response = {
        count: reviews.count,
        rows: reviews.rows.map(review => ({
            id: review.id,
            userId: review.userId,
            productId: review.productId,
            message: review.message,
            stars: review.stars,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            status: review.status,
            product: Product
        }))
    }

    return reviews;
}

module.exports = { getReviews };
