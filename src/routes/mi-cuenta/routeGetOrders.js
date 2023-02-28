const { Router } = require('express');
const { getOrders } = require('../../controllers/mi-cuenta/controllerGetOrders');
const router = Router();

// GET /micuenta/orders/:id
router.get(
    '/:customerId/orders',
    async (req, res, next) => {
        try {
            const { customerId } = req.params;
            const { page, size, sort, filter } = req.query;

            // console.log('filter query: ', filter);

            const orders = await getOrders(customerId, page, size, sort, filter);

            res.status(200).json(orders);
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
);

module.exports = router;
