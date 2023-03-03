const { Router } = require('express');
const { getCustomer } = require('../../controllers/mi-cuenta/controllerGetCustomer');

const router = Router();
// GET /micuenta/customers/{id}
router.get(
    '/customers/:id',
    async (req, res, next) => {
        try {
            const userName = req.headers.user
            const { id } = req.params;
            const customer = await getCustomer(id, userName);

            res.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
