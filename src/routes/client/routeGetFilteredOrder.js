const { Router } = require('express');
const { getFilteredOrder } = require('../../controllers/client/controllerGetFilteredOrder');

const router = Router();

router.get('/',  async (req, res, next) => 
    {
        try {
            const { status, userName } = req.query;
            const order = await getFilteredOrder(status, userName);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
