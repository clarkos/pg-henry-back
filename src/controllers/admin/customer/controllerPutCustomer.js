const { Customer } = require("../../../db");

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
