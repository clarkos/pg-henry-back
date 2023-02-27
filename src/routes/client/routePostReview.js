const { Router } = require('express');
const { createReview } = require('../../controllers/client/controllerPostReview');

const router = Router();

router.post("/", async (req, res) => {
    try {
        const review = await createReview(req.body);
        return res.status(200).json(review);
    }catch(e) {
        res.status(e.status).json({message: e.message, error: e.errors});
    }
})

module.exports = router;