const { Router } = require('express');
const { getUserByUsername } = require('../../../controllers/admin/user/controllerGetUserByUsername');


const router = Router();

// GET /admin/users/{username}
router.get(
    '/user/:username',
    async (req, res, next) => {
        try {
            const { username } = req.params;

            const user = await getUserByUsername(username);
            if(!user) return res.status(204).json(user)
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
