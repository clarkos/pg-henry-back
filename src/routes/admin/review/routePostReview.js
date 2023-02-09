const { Router } = require('express');
const { createReview } = require('../../../controllers/admin/review/controllerPostReview');

const router = Router();

// POST /admin/review
router.post(
    '/',
    async (req, res, next) => {
        try {
            // const { review } = req.body;
            // console.log('post /products req.body: ', req.body);

            const createdProduct = await createReview(req.body);

            res.status(200).json(createdProduct);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
