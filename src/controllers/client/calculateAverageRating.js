const { Review } = require('../../db.js');
const { Op } = require('sequelize');

async function calculateAverageRating(productId) {
    const options = {};

    const productIdCondition = { [Op.eq]: productId };
    const statusCondition = { [Op.eq]: 'Active' };
    options.where = {
        [Op.and]:
            [
                { status: statusCondition },
                { ProductId: productIdCondition },
            ]
    };

    const reviews = await Review.findAll(options);
    if (reviews.length === 0) {
        return 0;
    }

    // average rating = (5r5 + 4r4 + 3r3 + 2r2 + r1) / (r5 + r4 + r3 + r2 + r1),
    const responsesByStars = {
        'r1': 0,
        'r2': 0,
        'r3': 0,
        'r4': 0,
        'r5': 0
    }

    const stars = reviews.map(r => r.dataValues.stars)
    stars.forEach(value => {
        responsesByStars['r' + value]++;
    });

    return (
        5 * responsesByStars.r5 +
        4 * responsesByStars.r4 +
        3 * responsesByStars.r3 +
        2 * responsesByStars.r2 +
        responsesByStars.r1) / (reviews.length);

}

module.exports = calculateAverageRating;
