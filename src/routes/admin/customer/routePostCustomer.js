const { Router } = require('express');
const { createCustomer } = require('../../../controllers/admin/customer/controllerPostCustomer');
const router = Router();


// POST /admin/customers
router.post(
    '/',
    async (req, res, next) => {
        try {
            console.log('post /customers req.body: ', req.body);

            const createdCustomer = await createCustomer(req.body);

            res.status(200).json(createdCustomer);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
