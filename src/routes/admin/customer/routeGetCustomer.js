const { Router } = require('express');
const { getCustomer } = require('../../../controllers/admin/customer/controllerGetCustomer');

const router = Router();

// GET /admin/customers/{id}
router.get(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            console.log("customer id: ", id)
            const customer = await getCustomer(id);

            res.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
