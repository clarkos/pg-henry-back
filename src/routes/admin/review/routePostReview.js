const { Router } = require('express');
const { createReview } = require('../../../controllers/admin/review/controllerPostReview');

const router = Router();

// POST /admin/review
router.post(
    '/',
    async (req, res, next) => {
        try {
            
            console.log('post /review req.body: ', req.body);

            const createdReview = await createReview(req.body);

            res.status(200).json(createdReview);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
