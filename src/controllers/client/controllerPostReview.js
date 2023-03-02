const getReview = require('./getReview');
const canReviewProduct = require('./canReviewProduct');
const httpStatusCodes = require('../../utils/http-status-codes');
const ValidationError = require('../../utils/validation-error');
const { Review, Product, Customer, User } = require('../../db.js');

const createReview = async (data) => {

    if (!data.productId || data.productId === "") {
        throw new ValidationError(
            'Validation error',
            'Falta especificar el código de producto',
            httpStatusCodes.BAD_REQUEST
        );
    }

    const product = await Product.findByPk(data.productId);
    if (!product) {
    throw new ValidationError(
        'Validation error',
        'El producto no existe',
        httpStatusCodes.BAD_REQUEST
        );
    }

    if (!data.CustomerId || data.CustomerId === 0) {
        throw new ValidationError(
            'Validation error',
            'Falta especificar el código de cliente',
            httpStatusCodes.BAD_REQUEST
        );
    }

    const customer = await Customer.findByPk(data.CustomerId);
    if (!customer) {
    throw new ValidationError(
        'Validation error',
        'El cliente no existe',
        httpStatusCodes.BAD_REQUEST
        );
    }

    // check if customer can review product
    const canReview = await canReviewProduct(data.productId, data.CustomerId);
    if (!canReview) {
        throw new ValidationError(
            'Validation error',
            'El cliente no puede hacer una review del producto',
            httpStatusCodes.BAD_REQUEST
        );
    }

    // exist review ?
    if (!data.UserId || data.UserId === 0) {
        throw new ValidationError(
            'Validation error',
            'Falta especificar el código de usuario',
            httpStatusCodes.BAD_REQUEST
        );
    }

    const user = await User.findByPk(data.CustomerId);
    if (!user) {
        throw new ValidationError(
            'Validation error',
            'El usuario no existe',
            httpStatusCodes.BAD_REQUEST
            );
    }

    if (customer.UserId !== user.id) {
        throw new ValidationError(
            'Validation error',
            'El cliente no está relacionado con el usuario',
            httpStatusCodes.BAD_REQUEST
        );
    }

    const rev = await getReview(data.productId, data.UserId);
    if (rev) {
        throw new ValidationError(
            'Validation error',
            'Ya existe una review del producto',
            httpStatusCodes.BAD_REQUEST
        );
    }

    if (!data.stars || data.stars < 1 || data.stars > 5) {
        throw new ValidationError(
            'Validation error',
            'La cantidad de estrellas deben estar entre 1 y 5',
            httpStatusCodes.BAD_REQUEST
        );        
    }

    if (!Number.isInteger(data.stars)) {
        throw new ValidationError(
            'Validation error',
            'Estrellas debe ser un campo entero entre 1 y 5',
            httpStatusCodes.BAD_REQUEST
        );        
    }

    if (!data.message || data.message === "") {
        throw new ValidationError(
            'Validation error',
            'La descripción de la review no puede estar vacia',
            httpStatusCodes.BAD_REQUEST
        );        
    }

    // creo la review
    const review = await Review.create(
        {
            productId: data.productId,
            userId: data.UserId,
            message: data.message,
            stars: data.stars,
        },
    );

    return review;
}

module.exports = { createReview }
