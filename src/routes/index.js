const { Router } = require('express');
const routeGetAllProducts = require('./routeGetAllProducts');
const routeGetProductDetail = require('./routeGetProductDetail')
const artistRouter = require('./admin/artist');
const categoryRouter = require('./admin/category');

const router = Router();

router.use('/products', routeGetAllProducts);
router.use('/products', routeGetProductDetail);

// Admin routes
router.use('/admin', artistRouter);
router.use('/admin', categoryRouter);

module.exports = router;
