const { Router } = require('express');
const { getOrders } = require('../../../controllers/admin/order/controllerGetOrders');
const router = Router();

// GET /admin/orders
router.get(
    '/',
    async (req, res, next) => {
        try {
            const { page, size, sort, filter } = req.query;

            // console.log('filter query: ', filter);

            const orders = await getOrders(page, size, sort, filter);

            res.status(200).json(orders);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
