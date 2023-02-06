const { Router } = require('express');
const { editUser } = require('../../../controllers/admin/user/controllerPutUser');


const router = Router();

// PUT /admin/users/{id}
router.put(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { userName, role, status } = req.body;
            // console.log('put /user/:id req.body: ', req.body);

            const user = await editUser(id, userName, role, status);

            res.status(200).json(user);
        } catch (error) {
            // console.log('PUT /user/{id} error: ', error);
            next(error);
        }
    }
);

module.exports = router;
