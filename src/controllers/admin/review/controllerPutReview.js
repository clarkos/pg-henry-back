const { Review } = require("../../../db");

const editReview = async (id, userId, productId, message, stars, status) => {
  
  let review = await Review.findByPk(id);

  await review.update({
    userId,
    productId,
    message,
    stars,
    status,
  });

  return review;
};

module.exports = { editReview };
