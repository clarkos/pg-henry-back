const { Router } = require('express');
const { getMiCuentaReview } = require('../../../controllers/client/review/controllerMiCuentaGetReview');


const router = Router();

// GET /micuenta/reviews/{id}
router.get(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const review = await getMiCuentaReview(id);

            res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
