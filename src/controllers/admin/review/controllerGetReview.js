const { Review, Product } = require("../../../db");

const getReview = async (id) => {
  let review = await Review.findByPk(id, {include: [{ model: Product }]});
  // console.log('getReview review: ', review);

  return review;
};

module.exports = { getReview };
