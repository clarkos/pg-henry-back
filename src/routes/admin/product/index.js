const { Router } = require('express');
const getProducts = require('./routeGetProducts');
const getProduct = require('./routeGetProduct');
const putProduct = require('./routePutProduct');
const postProduct = require('./routePostProduct');

const router = Router();

// Configurar los routers
const path = '/products';
router.use(path, getProducts);
router.use(path, getProduct);
router.use(path, putProduct);
router.use(path, postProduct);
module.exports = router;
