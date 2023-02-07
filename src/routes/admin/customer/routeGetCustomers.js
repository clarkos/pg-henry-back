const { Router } = require('express');
const { getCustomers } = require('../../../controllers/admin/customer/controllerGetCustomers');

const router = Router();


// GET /admin/customers
router.get(
    '/',
    async (req, res, next) => {
        console.log("routeGetCustomers => entra")
        try {
            const { page, size, sort, filter } = req.query;

            console.log('filter query: ', filter);

            const customers = await getCustomers(page, size, sort, filter);

            res.status(200).json(customers);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
