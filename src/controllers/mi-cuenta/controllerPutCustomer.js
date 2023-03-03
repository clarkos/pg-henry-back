const { Customer, User } = require("../../db");
const httpStatusCodes = require('../../utils/http-status-codes');
const ValidationError = require('../../utils/validation-error');
const { validateCustomer } = require('../admin/customer/validateCustomer');

const editCustomer = async (
  id,
  name,
  address,
  city,
  state,
  zip,
  email,
  telephone,
  document,
  birthDate,
  status,
  userName
) => {
  // Validate data
  const errors = await validateCustomer({ id, name, telephone, document });
  if (errors) {
    // console.log('Edit customer errors', errors);
    throw new ValidationError('Validation error', errors, httpStatusCodes.BAD_REQUEST);
  }

  let customer = await Customer.findByPk(id, { include: { model: User } });

  if (customer && customer.User.userName !== userName) {
    throw new ValidationError('Auth error', 'auth error', httpStatusCodes.FORBIDDEN);
  }

  await customer.update({
    name,
    address,
    city,
    state,
    zip,
    email,
    telephone,
    document,
    birthDate,
    status,
  });

  return customer;
};

module.exports = { editCustomer };
