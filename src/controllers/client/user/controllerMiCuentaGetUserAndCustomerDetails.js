const { Op } = require('sequelize');
const { User } = require('../../../db.js');
const httpStatusCodes = require('../../../utils/http-status-codes');
const ValidationError = require('../../../utils/validation-error');


const GetUserAndCustomerDetails = async (id) => {
  const options = {};
  options.where = { id: { [Op.eq]: id } };
  // options.include = { all: true, nested: true };
  options.include = 'Customer';

  let user = await User.findOne(options);

  if (!user) {
    throw new ValidationError(
      'Validation error',
      `${id} no ha sido encontrado`,
      httpStatusCodes.NOT_FOUND
    );
  }

  return user;
};

module.exports = { GetUserAndCustomerDetails };