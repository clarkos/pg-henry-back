const { Router } = require('express');
const routeGetAllProducts = require('./routeGetAllProducts');
const routeGetProductDetail = require('./routeGetProductDetail');
const routeGetAllCategories = require('./routeGetAllCategories');
const artistRouter = require('./admin/artist');
const categoryRouter = require('./admin/category');
const locationRouter = require('./admin/location');
const productRouter = require('./admin/product');

const router = Router();

router.use('/products', routeGetAllProducts);
router.use('/products', routeGetProductDetail);
router.use('/categories', routeGetAllCategories);

// Admin routes
router.use('/admin', artistRouter);
router.use('/admin', categoryRouter);
router.use('/admin', locationRouter);
router.use('/admin', productRouter);

module.exports = router;
