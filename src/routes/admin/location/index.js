const { Router } = require('express');
const getLocations = require('./routeGetLocations');
const getLocation = require('./routeGetLocation');
const putLocation = require('./routePutLocation');
const postLocation = require('./routePostLocation');

const router = Router();

// Configurar los routers
const path = '/locations';
router.use(path, getLocations);
router.use(path, getLocation);
router.use(path, putLocation);
router.use(path, postLocation);

module.exports = router;
