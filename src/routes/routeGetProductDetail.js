const { Router } = require('express');
const {getProductDetail} = require('../controllers/controllerGetProductDetail')

const router = Router();

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const productDetail = await getProductDetail(id);
        if (!productDetail) return res.status(404).json({error: `No existe el producto buscado`}); 
        return res.status(200).json(productDetail);
    }catch(e) {
        res.status(400).json({error: e.message});
    }
})

module.exports = router;