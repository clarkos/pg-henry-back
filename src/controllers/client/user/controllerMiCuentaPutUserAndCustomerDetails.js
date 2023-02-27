const { Op } = require('sequelize');
const { Customer } = require('../../../db.js');
const httpStatusCodes = require('../../../utils/http-status-codes');
const ValidationError = require('../../../utils/validation-error');


const PutUserAndCustomerDetails = async (  id,
  name,
  address,
  city,
  state,
  zip,
  email,
  telephone,
  document,
  birthDate,
  status) => {

    try {
      const options = {};
      options.where = { userId: { [Op.eq]: id } };
      console.log("PutCustomerDetail: ", id)
      // options.include = { all: true, nested: true };
      
      let customer = await Customer.findOne(options);
      console.log("PutCustomerDetail customer: ", customer)
    
    
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
    } catch (error) {
      console.log("PutCustomer&User error: ", error)
    }

  if (!customer) {
    throw new ValidationError(
      'Validation error',
      `${id} no ha sido encontrado`,
      httpStatusCodes.NOT_FOUND
    );
  }


};

module.exports = { PutUserAndCustomerDetails };