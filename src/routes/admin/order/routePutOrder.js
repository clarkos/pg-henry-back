const { Router } = require('express');
const { editOrder } = require('../../../controllers/admin/order/controllerPutOrder');

const router = Router();

// PUT /admin/orders/{id}
router.put(
    '/:id',
    async (req, res, next) => {
        try {
            // const { id } = req.params;
            // const { name, address, coordinates, status } = req.body;
            console.log(req.body);
            const order = await editOrder(req.body);

            res.status(200).json(order);
        } catch (error) {
            console.log('PUT /orders/{id} error: ', error);
            next(error);
        }
    }
);

module.exports = router;
