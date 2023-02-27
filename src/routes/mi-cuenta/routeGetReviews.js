const { Router } = require('express');
const { getReviews } = require('../../controllers/mi-cuenta/controllerGetReviews');
const router = Router();

// GET /micuenta/reviews/:userId
router.get(
    '/reviews/:userId',
    async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { page, size, sort, filter } = req.query;

            // console.log('filter query: ', filter);

            const orders = await getReviews(userId, page, size, sort, filter);

            res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
);

module.exports = router;
