const { Op } = require('sequelize');
const { User } = require('../../db.js');

const getDetailedUser = async (userName) => {
  const options = {};
  options.where = { userName: { [Op.eq]: userName } };
  options.include = { all: true, nested: true };

  let customer = null;
  let user = await User.findOne(options);
  if (user) {
    customer = await user.getCustomer({ include: { all: true, nested: true } });
  }

  return customer;
};

module.exports = { getDetailedUser };
