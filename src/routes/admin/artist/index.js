const { Router } = require('express');
const getArtists = require('./routeGetArtists');
const getArtist = require('./routeGetArtist');
const putArtist = require('./routePutArtist');
const postArtist = require('./routePostArtist');

const router = Router();

// Configurar los routers
const path = '/artists';
router.use(path, getArtists);
router.use(path, getArtist);
router.use(path, putArtist);
router.use(path, postArtist);
module.exports = router;
