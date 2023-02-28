const { Router } = require('express');
const { getFinishedProducts } = require('../../controllers/client/controllerGetFinishedProducts');

const router = Router();

router.get('/', async (req, res) => {
    // console.log('En /finished-products');
    const {name, category} = req.query;

    try {
        let products = await getFinishedProducts(name, category);

        if (products.length) return res.status(200).json(products);

        res.status(404).json({ error: 'No hay productos finalizados' });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;
