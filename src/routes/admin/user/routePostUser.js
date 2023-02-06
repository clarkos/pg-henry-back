const { Router } = require('express');
const { createUser } = require('../../../controllers/admin/user/controllerPostUser');
const router = Router();


// POST /admin/users
router.post(
    '/',
    async (req, res, next) => {
        try {
            const { userName, password, role, status } = req.body;
            console.log('post /users req.body: ', req.body);

            const user = await createUser(userName, password, role, status);

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
