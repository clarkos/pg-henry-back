const { Router } = require('express');
const routeGetAllProducts = require('./routeGetAllProducts');
const routeGetProductDetail = require('./routeGetProductDetail')

const router = Router();

router.use('/products', routeGetAllProducts);
router.use('/products', routeGetProductDetail);

module.exports = router;
