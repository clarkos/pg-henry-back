const { Review } = require('../../db');
const { Op } = require('sequelize');

async function getReview(productId, userId) {
    const review = await Review.findOne({
        where: {
            [Op.and]: [
                { status: { [Op.eq]: 'Active' } },
                { ProductId: { [Op.eq]: productId } },
                { UserId: { [Op.eq]: userId } }
            ]
        }
    });

    return review;
}

module.exports = getReview;
