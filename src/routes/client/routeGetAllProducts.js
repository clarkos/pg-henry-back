const { Router } = require('express');
const { getAllProducts } = require('../../controllers/client/controllerGetAllProducts');
const { getProductsFiltered } = require('../../controllers/client/controllerGetProductsFiltered');

const router = Router();

router.get('/', async(req, res) => {
    const {name, days, category} = req.query;

    try {
        let products= [];
        if (name || days || category) {
            products = await getProductsFiltered(name, days, category);
        } else {
            products = await getAllProducts();
        }

        if (products.length) return res.status(200).json(products);
        res.status(404).json({error: `No existen productos registrados`}); 
    }catch(e) {
        res.status(400).json({error: e.message});
    }
});

module.exports = router;