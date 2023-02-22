const { Router } = require('express');
const { getMailGen } = require('../../../controllers/admin/mailgen/controllerGetMailGen');

const router = Router();

// GET /admin/mailgen/{id}
router.get(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const mailGen = await getMailGen(id);

            res.status(200).json(mailGen);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
