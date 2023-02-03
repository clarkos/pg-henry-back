const { Router } = require('express');
const getCategories = require('./routeGetCategories');
const getCategory = require('./routeGetCategory');
const putCategory = require('./routePutCategory');
const postCategory = require('./routePostCategory');

const router = Router();

// Configurar los routers
const path = '/categories';
router.use(path, getCategories);
router.use(path, getCategory);
router.use(path, putCategory);
router.use(path, postCategory);
module.exports = router;
