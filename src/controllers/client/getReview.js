const { Review } = require('../../db');

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

    console.log('getReview, review:', review);

    return review;
}

module.exports = getReview;
