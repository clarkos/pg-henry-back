const { Router } = require('express');
const getMailGens = require('./routeGetMailGens');
const getMailGen = require('./routeGetMailGen');
const putMailGen = require('./routePutMailGen');

const router = Router();

// Configurar los routers
const path = '/mailgen';
router.use(path, getMailGens);
router.use(path, getMailGen);
router.use(path, putMailGen);

module.exports = router;
