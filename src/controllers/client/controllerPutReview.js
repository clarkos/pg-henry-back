const { Review } = require("../../db");

const editReview = async (id, message, stars) => {
  
    if (!stars || stars < 1 || stars > 5) {
        throw new ValidationError(
            'Validation error',
            'La cantidad de estrellas deben estar entre 1 y 5',
            httpStatusCodes.BAD_REQUEST
        );        
    }

    if (!Number.isInteger(stars)) {
        throw new ValidationError(
            'Validation error',
            'Estrellas debe ser un campo entero entre 1 y 5',
            httpStatusCodes.BAD_REQUEST
        );        
    }

    if (!message || message === "") {
        throw new ValidationError(
            'Validation error',
            'La descripción de la review no puede estar vacia',
            httpStatusCodes.BAD_REQUEST
        );        
    }

    let review = await Review.findByPk(id);
    if (!review) {
        throw new ValidationError(
            'Validation error',
            'La review que quiere modificar no existe',
            httpStatusCodes.BAD_REQUEST
        );        
    } 
    
    await review.update({
            message,
            stars,
        });

  return review;
};

module.exports = { editReview };
