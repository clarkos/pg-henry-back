const { Router } = require('express');
const { getCustomer } = require('../../controllers/admin/customer/controllerGetCustomer');

const router = Router();
// GET /micuenta/{id}
router.get(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await getCustomer(id);

            res.status(200).json({
                count: customer ? 1 : 0,
                rows: [ customer ]
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
