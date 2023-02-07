const { Router } = require("express");
const getCustomers = require("./routeGetCustomers");
const getCustomer = require("./routeGetCustomer");
const putCustomer = require("./routePutCustomer");
const postCustomer = require("./routePostCustomer");


const router = Router();

// Configurar los routers
const path = "/customers";
router.use(path, getCustomers);
router.use(path, getCustomer);
router.use(path, putCustomer);
router.use(path, postCustomer);
module.exports = router;
