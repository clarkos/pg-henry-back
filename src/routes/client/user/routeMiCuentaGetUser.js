const { Router } = require('express');
const { getUser } = require('../../../controllers/admin/user/controllerGetUser');
const { GetUserAndCustomerDetails } = require('../../../controllers/client/user/controllerMiCuentaGetUserAndCustomerDetails');


const router = Router();

// GET /micuenta/user/{id}
router.get(
    '/:id',
    
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await GetUserAndCustomerDetails(id);

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
