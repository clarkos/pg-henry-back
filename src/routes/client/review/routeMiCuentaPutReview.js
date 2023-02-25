const { Router } = require('express');
const { editMiCuentaReview } = require('../../../controllers/client/review/controllerMiCuentaPutReview');

const router = Router();

// PUT /micuenta/reviews/{id}
router.put(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { userId, productId, message, stars, status } = req.body;
         
            const editedReview = await editMiCuentaReview(id, userId, productId, message, stars, status);

            res.status(200).json(editedReview);
        } catch (error) {
            // console.log('PUT /products/{id} error: ', error);
            next(error);
        }
    }
);

module.exports = router;
