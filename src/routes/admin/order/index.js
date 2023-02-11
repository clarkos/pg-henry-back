const { Router } = require('express');
const getOrders = require('./routeGetOrders');
const getOrder = require('./routeGetOrder');
const putOrder = require('./routePutOrder');

const router = Router();

// Configurar los routers
const path = '/orders';
router.use(path, getOrders);
router.use(path, getOrder);
router.use(path, putOrder);
module.exports = router;
