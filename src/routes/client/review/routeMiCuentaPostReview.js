const { Router } = require('express');
const { createMiCuentaReview } = require('../../../controllers/client/review/controllerMiCuentaPostReview');

const router = Router();

// POST /micuenta/reviews
router.post(
    '/',
    async (req, res, next) => {
        try {
            
            console.log('post /review req.body: ', req.body);

            const createdReview = await createMiCuentaReview(req.body);

            res.status(200).json(createdReview);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
