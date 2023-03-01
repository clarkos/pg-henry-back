const { Review } = require("../../../db");

const getMiCuentaReview = async (id) => {
  let review = await Review.findByPk(id);
  // console.log('artist: ', artist);

  return review;
};

module.exports = { getMiCuentaReview };
