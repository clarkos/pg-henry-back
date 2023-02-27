const { Router } = require('express');
const { getRecommendedProducts } = require('../../controllers/client/controllerGetRecommendedProducts');

const router = Router();

router.get('/', async (req, res) => {
    // console.log('En /recommended');
    const { filter } = req.query;

    try {
        let products = await getRecommendedProducts(filter);

        if (products.length) return res.status(200).json(products);

        res.status(404).json({ error: 'No hay productos recomendados' });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;
