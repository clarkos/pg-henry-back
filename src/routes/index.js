const { Router } = require('express');
const routeGetAllProducts = require('./client/routeGetAllProducts');
const routeGetProductDetail = require('./client/routeGetProductDetail');
const routeGetAllCategories = require('./client/routeGetAllCategories');
const artistRouter = require('./admin/artist');
const categoryRouter = require('./admin/category');
const locationRouter = require('./admin/location');
const productRouter = require('./admin/product');
const userRouter = require('./admin/user');
const customerRouter = require('./admin/customer');

const router = Router();

router.use('/products', routeGetAllProducts);
router.use('/products', routeGetProductDetail);
router.use('/categories', routeGetAllCategories);

// Admin routes
router.use('/admin', artistRouter);
router.use('/admin', categoryRouter);
router.use('/admin', locationRouter);
router.use('/admin', productRouter);
router.use('/admin', userRouter);
router.use('/admin', customerRouter);

module.exports = router;
