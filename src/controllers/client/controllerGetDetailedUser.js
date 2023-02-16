const { Op } = require('sequelize');
const { User } = require('../../db.js');
const httpStatusCodes = require('../../utils/http-status-codes');
const ValidationError = require('../../utils/validation-error');
const constants = require('../../utils/constants');


const getDetailedUser = async (userName) => {
  const options = {};
  options.where = { userName: { [Op.eq]: userName } };
  // options.include = { all: true, nested: true };
  options.include = 'Customer';

  let user = await User.findOne(options);

  if (!user) {
    throw new ValidationError(
      'Validation error',
      `${userName} no ha sido encontrado`,
      httpStatusCodes.NOT_FOUND
    );
  }

  return user;
};

module.exports = { getDetailedUser };