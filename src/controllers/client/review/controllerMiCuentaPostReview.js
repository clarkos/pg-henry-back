const { Review } = require('../../../db');

const createMiCuentaReview = async (review) => {

    const createdReview = await Review.create(review);

    return createdReview;
}

module.exports = { createMiCuentaReview };
