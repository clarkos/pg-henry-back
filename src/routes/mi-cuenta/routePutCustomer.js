const { Router } = require('express');
const { editCustomer } = require('../../controllers/admin/customer/controllerPutCustomer');

const router = Router();

// PUT /micuenta/customers/{id}
router.put(
    '/customers/:id',
    async (req, res, next) => {
        try {
            const userName = req.headers.user;
            const { id } = req.params;
            const { name, address, city, state, zip, email, telephone, document, birthDate, status} = req.body;
            // console.log('put /micuenta/customers/:id req.body: ', req.body);

            const customer = await editCustomer(id, name, address, city, state, zip, email, telephone, document, birthDate, status, userName);

            res.status(200).json(customer);
        } catch (error) {
            // console.log('PUT /user/{id} error: ', error);
            next(error);
        }
    }
);

module.exports = router;
