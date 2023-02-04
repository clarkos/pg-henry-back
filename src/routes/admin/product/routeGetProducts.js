const { Router } = require('express');
const { getProducts } = require('../../../controllers/admin/product/controllerGetProducts');
const router = Router();

// GET /admin/products
router.get(
    '/',
    async (req, res, next) => {
        try {
            const { page, size, sort, filter } = req.query;

            // console.log('filter query: ', filter);

            const products = await getProducts(page, size, sort, filter);

            res.status(200).json(products);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
