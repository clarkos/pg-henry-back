const { Router } = require('express');
const { getReviews } = require('../../controllers/mi-cuenta/controllerGetReviews');
const router = Router();

// GET /micuenta/:userId/reviews
router.get(
    '/:userId/reviews',
    async (req, res, next) => {
        // console.log('En /micuenta/:userId/reviews');
        try {
            const userName = req.headers.user
            const { userId } = req.params;
            const { page, size, sort, filter } = req.query;

            // console.log('filter query: ', filter);

            const reviews = await getReviews(userId, page, size, sort, filter, userName);

            res.status(200).json(reviews);
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
);

module.exports = router;
