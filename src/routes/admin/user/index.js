const { Router } = require("express");
const getUsers = require("./routeGetUsers");
const getUser = require("./routeGetUser");
const putUser = require("./routePutUser");
const postUser = require("./routePostUser");


const router = Router();

// Configurar los routers
const path = "/users";
router.use(path, getUsers);
router.use(path, getUser);
router.use(path, putUser);
router.use(path, postUser);
module.exports = router;
