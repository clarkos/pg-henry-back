const { Router } = require('express');
const { getReviews } = require('../../../controllers/admin/review/controllerGetReviews');
const router = Router();

// GET /admin/review
router.get(
    '/',
    async (req, res, next) => {
        try {
            const { page, size, sort, filter } = req.query;

            // console.log('filter query: ', filter);

            const review = await getReviews(page, size, sort, filter);

            res.status(200).json(review);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
