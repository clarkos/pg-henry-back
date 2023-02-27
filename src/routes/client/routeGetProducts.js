const { Router } = require('express');
const { getProducts } = require('../../controllers/client/controllerGetProducts');

const router = Router();

router.get('/', async(req, res) => {
    const {name, days, category} = req.query;

    try {
        let products= [];
        products = await getProducts(name, days, category);

        if (products.length) return res.status(200).json(products);
        res.status(404).json({error: `No existen productos registrados`}); 
    }catch(e) {
        res.status(400).json({error: e.message});
    }
});

module.exports = router;
