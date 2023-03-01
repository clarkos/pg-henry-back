const { Router } = require("express");
const miCuentaGetCustomer = require("./routeGetCustomer")
const miCuentaGetCustomerById = require("./routeGetCustomerById");
const miCuentaPutCustomer = require("./routePutCustomer")
const miCuentaOrdersRouter = require('./routeGetOrders');
const miCuentaOrderRouter = require('./routeGetOrder');
const miCuentaReviewsRouter = require('./routeGetReviews');
const miCuentaReviewRouter = require('./routeGetReview');

const router = Router();

router.use('/', miCuentaGetCustomer);       // :id
router.use('/', miCuentaGetCustomerById);   // /customers/:id
router.use('/', miCuentaPutCustomer);       // /customers/:id

router.use('/', miCuentaOrdersRouter);      // /:customerId/orders
router.use('/', miCuentaOrderRouter);       // /orders/:id
router.use('/', miCuentaReviewsRouter);     // /:userId/reviews
router.use('/', miCuentaReviewRouter);      // /reviews/:id

module.exports = router;
