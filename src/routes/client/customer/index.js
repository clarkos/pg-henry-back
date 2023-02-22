const { Router } = require("express");
const miCuentaGetCustomer = require("./routeMiCuentaGetCustomer")
const miCuentaPutCustomer = require("./routeMiCuentaPutCustomer")
// const putUser = require("./routeMiCuentaPutUser");

const router = Router();
console.log("entra al micuenta/customer")

const path = "/customers";
router.use(path, miCuentaGetCustomer);
router.use(path, miCuentaPutCustomer);

module.exports = router;
