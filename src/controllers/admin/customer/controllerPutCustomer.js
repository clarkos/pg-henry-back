const { Customer } = require("../../../db");
const httpStatusCodes = require('../../../utils/http-status-codes');
const ValidationError = require('../../../utils/validation-error');
const { validateCustomer } = require('./validateCustomer');

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
  status
) => {
  // Validate data
  const errors = await validateCustomer({ id, name, telephone, document });
  if (errors) {
    console.log('Edit customer errors', errors);
    throw new ValidationError('Validation error', errors, httpStatusCodes.BAD_REQUEST);
  }

  let customer = await Customer.findByPk(id);

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
