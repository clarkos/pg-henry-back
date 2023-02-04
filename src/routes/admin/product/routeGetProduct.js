const { Router } = require('express');
const { getProduct } = require('../../../controllers/admin/product/controllerGetProduct');

const router = Router();

// GET /admin/products/{id}
router.get(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const product = await getProduct(id);

            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
