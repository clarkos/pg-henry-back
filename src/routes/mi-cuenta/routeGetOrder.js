const { Router } = require('express');
const { getOrder } = require('../../controllers/admin/order/controllerGetOrder');

const router = Router();

// GET /micuenta/orders/{id}
router.get(
    '/orders/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await getOrder(id);

            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
