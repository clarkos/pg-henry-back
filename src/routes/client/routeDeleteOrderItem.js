const { Router } = require('express');
const { deleteOrderItem } = require('../../controllers/client/controllerDeleteOrderItem');

const router = Router();

router.delete("/:id/items/:productId", async (req, res) => {
    const {id, productId} = req.params;
    try {
        const orderId = id;
        const orderItem = await deleteOrderItem({orderId, productId});
        if (orderItem) 
            return res.status(200).json({message: "success"}); 
        else    
            return res.status(404).json({message: `Producto ${productId} no existe en la orden ${id}`});
    }catch(e) {
        res.status(400).json({error: e.message});
    }
})

module.exports = router;