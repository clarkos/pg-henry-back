const { Router } = require('express');
const { createProduct } = require('../../../controllers/admin/product/controllerPostProduct');

const router = Router();

// POST /admin/products
router.post(
    '/',
    async (req, res, next) => {
        try {
            // const { product } = req.body;
            // console.log('post /products req.body: ', req.body);

            const createdProduct = await createProduct(req.body);

            res.status(200).json(createdProduct);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
