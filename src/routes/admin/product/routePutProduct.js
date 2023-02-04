const { Router } = require('express');
const { editProduct } = require('../../../controllers/admin/product/controllerPutProduct');

const router = Router();

// PUT /admin/products/{id}
router.put(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            // const { product } = req.body;
            // console.log('put /products/:id req.body: ', req.body);

            const editedProduct = await editProduct(req.body);

            res.status(200).json(editedProduct);
        } catch (error) {
            // console.log('PUT /products/{id} error: ', error);
            next(error);
        }
    }
);

module.exports = router;
