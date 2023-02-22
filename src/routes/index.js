const { Router } = require('express');
const routeGetAllProducts = require('./client/routeGetAllProducts');
const routeGetProductDetail = require('./client/routeGetProductDetail');
const routeGetAllCategories = require('./client/routeGetAllCategories');
const routeGetDetailedUser = require('./client/routeGetDetailedUser');
const artistRouter = require('./admin/artist');
const categoryRouter = require('./admin/category');
const locationRouter = require('./admin/location');
const productRouter = require('./admin/product');
const userRouter = require('./admin/user');
const customerRouter = require('./admin/customer');
const orderRouter = require('./admin/order');
const reviewRouter = require('./admin/review');
const mailGenRouter = require('./admin/mailgen');

const routeCreateOrder = require('./client/routePostOrder');
const routeGetFilteredOrder = require('./client/routeGetFilteredOrder');
const routeAddEditOrderItems = require('./client/routeAddEditOrderItems');
const routeDeleteOrderItem = require('./client/routeDeleteOrderItem');
const routeMailer = require('./client/routeSendMail')

const router = Router();

router.use('/products', routeGetAllProducts);
router.use('/products', routeGetProductDetail);
router.use('/categories', routeGetAllCategories);

router.use('/order', routeCreateOrder);
router.use('/order/', routeAddEditOrderItems);
router.use('/order/', routeDeleteOrderItem);
router.use('/orders', routeGetFilteredOrder);

router.use('/user', routeGetDetailedUser);
router.use('/mailer', routeMailer);

// Admin routes
router.use('/admin', artistRouter);
router.use('/admin', categoryRouter);
router.use('/admin', locationRouter);
router.use('/admin', productRouter);
router.use('/admin', userRouter);
router.use('/admin', customerRouter);
router.use('/admin', orderRouter);
router.use('/admin', reviewRouter);
router.use('/admin', mailGenRouter);

module.exports = router;
