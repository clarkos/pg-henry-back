const { Router } = require('express');
const { editMailGen } = require('../../../controllers/admin/mailgen/controllerPutMailGen');

const router = Router();

// PUT /admin/mailgen/{id}
router.put(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const mailGen = await editMailGen(req.body);

            res.status(200).json(mailGen);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
