const { Router } = require('express');
const { getAllProducts } = require('../controllers/controllerGetAllProducts');
const { getProductsFiltered } = require('../controllers/controllerGetProductsFiltered');

const router = Router();

router.get('/', async(req, res) => {
    const {name, date, category} = req.query;

    try {
        let products= [];
        if (name || date || category) {
            products = await getProductsFiltered(name, date, category);
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