const { Router } = require('express');
const { getOrders } = require('../../controllers/mi-cuenta/controllerGetOrders');
const router = Router();

// GET /micuenta/:customerId/orders
router.get(
    '/:customerId/orders',
    async (req, res, next) => {
        try {
            const userName = req.headers.user
            const { customerId } = req.params;
            const { page, size, sort, filter } = req.query;

            // console.log('filter query: ', filter);

            const orders = await getOrders(customerId, page, size, sort, filter, userName);

            res.status(200).json(orders);
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
);

module.exports = router;
