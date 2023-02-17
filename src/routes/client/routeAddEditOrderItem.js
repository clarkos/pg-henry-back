const { Router } = require('express');
const { addEditOrderItem } = require('../../controllers/client/controllerAddEditOrderItem');

const router = Router();

router.put("/:id/items", async (req, res) => {
    const {id} = req.params;
    const {productId, quantity} = req.body;
    try {
        const orderId = id;
        const order = await addEditOrderItem({orderId, productId, quantity});
        if (!order || order.hasOwnProperty('error') ) 
            return res.status(404).json({error: order.error});             
        return res.status(200).json(order);
    }catch(e) {
        res.status(400).json({error: e.message});
    }
})

module.exports = router;