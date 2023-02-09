const { Router } = require('express');
const { getReview } = require('../../../controllers/admin/review/controllerGetReview');

const router = Router();

// GET /admin/review/{id}
router.get(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const review = await getReview(id);

            res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
