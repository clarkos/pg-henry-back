const { Review } = require("../../../db");

const getReview = async (id) => {
  let review = await Review.findByPk(id);
  // console.log('artist: ', artist);

  return review;
};

module.exports = { getReview };
