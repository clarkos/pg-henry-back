const { Router } = require('express');
const getReviews = require('./routeGetReviews');
const getReview = require('./routeGetReview');
const putReview = require('./routePutReview');
const postReview = require('./routePostReview');

const router = Router();

// Configurar los routers
const path = '/reviews';
router.use(path, getReviews);
router.use(path, getReview);
router.use(path, putReview);
router.use(path, postReview);
module.exports = router;
