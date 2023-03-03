const { Router } = require("express");
const miCuentaGetCustomer = require("./routeGetCustomer")
const miCuentaGetCustomerById = require("./routeGetCustomerById");
const miCuentaPutCustomer = require("./routePutCustomer")
const miCuentaOrdersRouter = require('./routeGetOrders');
const miCuentaOrderRouter = require('./routeGetOrder');
const miCuentaReviewsRouter = require('./routeGetReviews');
const miCuentaReviewRouter = require('./routeGetReview');
const userMiddleware = require('../../middleware/userMiddleware');

const router = Router();

router.use('/', userMiddleware.decodeToken, miCuentaGetCustomer);       // :id
router.use('/', userMiddleware.decodeToken, miCuentaGetCustomerById);   // /customers/:id
router.use('/', userMiddleware.decodeToken, miCuentaPutCustomer);       // /customers/:id

router.use('/', userMiddleware.decodeToken, miCuentaOrdersRouter);      // /:customerId/orders
router.use('/', userMiddleware.decodeToken, miCuentaOrderRouter);       // /orders/:id
router.use('/', userMiddleware.decodeToken, miCuentaReviewsRouter);     // /:userId/reviews
router.use('/', userMiddleware.decodeToken, miCuentaReviewRouter);      // /reviews/:id

module.exports = router;
