const { Router } = require('express');
const { addOrderItem } = require('../../controllers/client/controllerAddOrderItem');

const router = Router();

router.post("/", async (req, res) => {
    const {orderId, productId, quantity} = req.body;
    try {
        const order = await addOrderItem({orderId, productId, quantity});
        if (!order || order.hasOwnProperty('error') ) 
            return res.status(404).json({error: order.error});             
        return res.status(200).json(order);
    }catch(e) {
        res.status(400).json({error: e.message});
    }
})

module.exports = router;