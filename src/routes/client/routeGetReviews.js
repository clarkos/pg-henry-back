const { Router } = require('express');
const { getReviews } = require('../../controllers/client/controllerGetReviews');

const router = Router();

router.get('/:id/reviews', async (req, res) => {
    console.log('En /products/:id/reviews');
    const { id } = req.params;
    const { page, size, userName } = req.query;

    try {
        let reviews = await getReviews(id, page, size, userName);

        if (reviews.items.length) return res.status(200).json(reviews);

        res.status(404).json({ error: 'No hay reviews del producto' });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;
