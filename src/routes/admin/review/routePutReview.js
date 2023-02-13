const { Router } = require('express');
const { editReview } = require('../../../controllers/admin/review/controllerPutReview');

const router = Router();

// PUT /admin/products/{id}
router.put(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { userId, productId, message, stars, status } = req.body;
         
            const editedProduct = await editReview(id, userId, productId, message, stars, status);

            res.status(200).json(editedProduct);
        } catch (error) {
            // console.log('PUT /products/{id} error: ', error);
            next(error);
        }
    }
);

module.exports = router;
