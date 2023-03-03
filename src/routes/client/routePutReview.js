const { Router } = require('express');
const { editReview } = require('../../controllers/client/controllerPutReview');

const router = Router();

// PUT /reviews/{id}
router.put('/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { message, stars } = req.body;
            const review = await editReview(id, message, stars);
            res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
