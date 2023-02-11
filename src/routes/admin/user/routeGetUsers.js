const { Router } = require('express');
const { getUsers } = require('../../../controllers/admin/user/controllerGetUsers');
const router = Router();


// GET /admin/users
router.get(
    '/',
    async (req, res, next) => {
        // console.log("routeGetUsers => entra")
        try {
            const { page, size, sort, filter } = req.query;

            // console.log('filter query: ', filter);

            const users = await getUsers(page, size, sort, filter);

            res.status(200).json(users);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
