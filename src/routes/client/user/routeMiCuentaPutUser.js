const { Router } = require('express');
const { editCustomer } = require('../../../controllers/admin/customer/controllerPutCustomer');

const router = Router();

// PUT /micuenta/user/{id}
router.put(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, address, city, state, zip, email, telephone, document, birthDate, status} = req.body;
            console.log('put /user/:id req.body: ', req.body);

            const customer = await editCustomer(id, name, address, city, state, zip, email, telephone, document, birthDate, status);

            res.status(200).json(customer);
        } catch (error) {
            // console.log('PUT /user/{id} error: ', error);
            next(error);
        }
    }
);

module.exports = router;
