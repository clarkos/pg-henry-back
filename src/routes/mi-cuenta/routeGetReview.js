const { Router } = require('express');
const { getReview } = require('../../controllers/admin/review/controllerGetReview');
const router = Router();

// GET /micuenta/reviews/:id
router.get(
    '/reviews/:id',
    async (req, res, next) => {
        // console.log('En /micuenta/reviews/:id');
        try {
            const { id } = req.params;

            // console.log('filter query: ', filter);

            const review = await getReview(id);

            res.status(200).json(review);
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
);

module.exports = router;
