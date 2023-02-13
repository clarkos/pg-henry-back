const { Review } = require('../../../db');

const createReview = async (review) => {

    const createdReview = await Review.create(review);

    return createdReview;
}

module.exports = { createReview };
