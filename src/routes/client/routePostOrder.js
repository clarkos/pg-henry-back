const { Router } = require('express');
const { createOrder } = require('../../controllers/client/controllerPostOrder');

const router = Router();

router.post("/", async (req, res) => {
    const {customerId, shippingDate, totalAmount, items} = req.body;

    try {
        const order = await createOrder({customerId, shippingDate, totalAmount, items});
        if (!order || order.hasOwnProperty('error') ) 
            return res.status(404).json({error: order.error});             
        return res.status(200).json(order);
    }catch(e) {
        res.status(400).json({error: e.message});
    }
})

module.exports = router;