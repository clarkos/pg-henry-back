const { Router } = require('express');
const { getDetailedUser } = require('../../controllers/client/controllerGetDetailedUser');


const router = Router();

// GET /user?userName
router.get(
    '/',
    async (req, res, next) => {
        try {
            const { userName } = req.query;
            console.log('userName: ', userName);

            const user = await getDetailedUser(userName);

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
