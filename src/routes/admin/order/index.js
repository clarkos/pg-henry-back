const { Router } = require('express');
const getOrders = require('./routeGetOrders');

const router = Router();

// Configurar los routers
const path = '/orders';
router.use(path, getOrders);
module.exports = router;
