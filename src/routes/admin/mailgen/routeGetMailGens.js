const { Router } = require('express');
const { getMailGens } = require('../../../controllers/admin/mailgen/controllerGetMailgens');
const router = Router();

// GET /admin/mailgen
router.get(
    '/',
    async (req, res, next) => {
        try {
            const { page, size, sort } = req.query;

            const mailGens = await getMailGens(page, size, sort);

            res.status(200).json(mailGens);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
