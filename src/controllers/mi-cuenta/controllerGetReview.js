const { Review, Product, User } = require("../../db");
const httpStatusCodes = require('../../utils/http-status-codes');
const ValidationError = require('../../utils/validation-error');

const getReview = async (id, userName) => {
  let review = await Review.findByPk(id, { include: [{ model: Product }, { model: User }] });
  // console.log('getReview review: ', review);

  if (review && review.User.userName !== userName) {
    throw new ValidationError('Auth error', 'auth error', httpStatusCodes.FORBIDDEN);
  }

  return review;
};

module.exports = { getReview };
