const { Review, User } = require('../../db.js');
const { Op } = require('sequelize');
const { getPagination } = require('../../utils/utils');
const calculateAverageRating = require('./calculateAverageRating.js');

const getReviews = async (productId, page, size, userName) => {
    const { limit, offset } = getPagination(page, size);

    const options = { limit, offset };
   
    const productIdCondition = { [Op.eq]: productId };
    const statusCondition = { [Op.eq]: 'Active' };
    options.where = {
        [Op.and]:
        [
            { status: statusCondition },
            { ProductId: productIdCondition },
        ]
    };
    
    // Agrego modelos relacionados
    options.include = [
        {
            model: User,
        },
    ];
    // filtro por join - tabla relacionada
    if (userName) {
        const userCondition = { [Op.eq]: userName };
        
        options.include[options.include.length - 1].where = { userName: userCondition }
    }
    
    // order by startDate, name
    options.order = [
        ['createdAt', 'DESC'],
    ];
    
    const reviews = await Review.findAll(options);

    return {
        averageRating: userName ? 0 : await calculateAverageRating(productId),
        items: reviews};
};

module.exports = { getReviews };
