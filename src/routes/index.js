const { Router } = require('express');
const routeGetProducts = require('./client/routeGetProducts');
const routeGetRecommendedProducts = require('./client/routeGetRecommendedProducts');
const routeGetFinishedProducts = require('./client/routeGetFinishedProducts');
const routeGetReviews = require('./client/routeGetReviews');
const routeGetProductDetail = require('./client/routeGetProductDetail');
const routeGetAllCategories = require('./client/routeGetAllCategories');
const routeGetDetailedUser = require('./client/routeGetDetailedUser');
const routePostCustomer = require("./admin/customer/routePostCustomer");
const routePostUser = require("./admin/user/routePostUser");
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

const miCuentaRouter = require('./mi-cuenta')

const postCustomer = require("./admin/customer/routePostCustomer");

const adminMiddleware = require('../middleware/adminMiddleware');
const routePayment = require('./client/routePayment');

const routePostReview = require('./client/routePostReview');
const routePutReview = require('./client/routePutReview');

const router = Router();

router.use('/products', routeGetProducts);
router.use('/products', routeGetProductDetail);
router.use('/products', routeGetReviews);
router.use('/recommended-products', routeGetRecommendedProducts);
router.use('/finished-products', routeGetFinishedProducts);
router.use('/categories', routeGetAllCategories);

router.use('/order', routeCreateOrder);
router.use('/order/', routeAddEditOrderItems);
router.use('/order/', routeDeleteOrderItem);
router.use('/orders', routeGetFilteredOrder);
router.use('/', orderRouter);
router.use('/', customerRouter);

// incorporo para la compra de MP, hacer require
router.use("/pay", routePayment);

router.use('/user', routeGetDetailedUser);
router.use('/user', routePostUser);
router.use('/customer', routePostCustomer)
router.use('/mailer', routeMailer);

router.use('/customer', postCustomer);

// Reviews
router.use('/reviews', routePostReview);
router.use('/reviews', routePutReview);

// Admin routes
router.use('/admin', adminMiddleware.decodeToken, artistRouter);
router.use('/admin', adminMiddleware.decodeToken, categoryRouter);
router.use('/admin', adminMiddleware.decodeToken, locationRouter);
router.use('/admin', adminMiddleware.decodeToken, productRouter);
router.use('/admin', adminMiddleware.decodeToken, userRouter);
router.use('/admin', adminMiddleware.decodeToken, customerRouter);
router.use('/admin', adminMiddleware.decodeToken, orderRouter);
router.use('/admin', adminMiddleware.decodeToken, reviewRouter);
router.use('/admin', adminMiddleware.decodeToken, mailGenRouter);

// Mi Cuenta routes
router.use('/micuenta', miCuentaRouter);

module.exports = router;
