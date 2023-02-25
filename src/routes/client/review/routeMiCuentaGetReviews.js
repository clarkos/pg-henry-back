const { Router } = require('express');
const { getMiCuentaReviews } = require('../../../controllers/client/review/controllerMiCuentaGetReviews');
const router = Router();

// GET /micuenta/reviews
router.get(
    '/',
    async (req, res, next) => {
        try {
            const { page, size, sort, filter } = req.query;

            // console.log('filter query: ', filter);

            const review = await getMiCuentaReviews(page, size, sort, filter);

            res.status(200).json(review);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
