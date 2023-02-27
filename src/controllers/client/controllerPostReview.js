const getReview = require('./getReview');
const canReviewProduct = require('./canReviewProduct');
const httpStatusCodes = require('../../utils/http-status-codes');
const ValidationError = require('../../utils/validation-error');

const createReview = async (data) => {

    // check if customer can review product
    if (!canReviewProduct(data.productId, data.CustomerId)) {
        throw new ValidationError(
            'Validation error',
            'El cliente no puede hacer una review del producto',
            httpStatusCodes.BAD_REQUEST
        );
    }

    // exist review ?
    if (getReview(data.productId, data.UserId)) {
        throw new ValidationError(
            'Validation error',
            'Ya existe una review del producto',
            httpStatusCodes.BAD_REQUEST
        );
    }



    return null;
}

module.exports = { createReview }
