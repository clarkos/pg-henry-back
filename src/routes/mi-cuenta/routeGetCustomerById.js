const { Router } = require('express');
const { getCustomer } = require('../../controllers/admin/customer/controllerGetCustomer');

const router = Router();
// GET /micuenta/customers/{id}
router.get(
    '/customers/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            console.log('routeGetCustomerById: ', id);
            const customer = await getCustomer(id);

            res.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
