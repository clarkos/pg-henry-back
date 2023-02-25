const { Router } = require('express');
const getMiCuentaReviews = require('./routeMiCuentaGetReviews');
const getMiCuentaReview = require('./routeMiCuentaGetReview');
const putMiCuentaReview = require('./routeMiCuentaPutReview');
const postMiCuentaReview = require('./routeMiCuentaPostReview');

const router = Router();

// Configurar los routers
const path = '/reviews';
router.use(path, getMiCuentaReviews);
router.use(path, getMiCuentaReview);
router.use(path, putMiCuentaReview);
router.use(path, postMiCuentaReview);
module.exports = router;
