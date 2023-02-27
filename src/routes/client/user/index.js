const { Router } = require("express");
const miCuentaGetUser = require("./routeMiCuentaGetUser");
const miCuentaPutUser = require("./routeMiCuentaPutUser")
// const putUser = require("./routeMiCuentaPutUser");

const router = Router();
console.log("entra al micuenta/index")

const path = "/user";
router.use(path, miCuentaGetUser);
router.use(path, miCuentaPutUser);

module.exports = router;
