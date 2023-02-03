const { Router } = require('express');
const { getLocations } = require('../../../controllers/admin/location/controllerGetLocations');
const router = Router();

// GET /admin/locations
router.get(
    '/',
    async (req, res, next) => {
        try {
            const { page, size, sort, filter } = req.query;

            const categories = await getLocations(page, size, sort, filter);

            res.status(200).json(categories);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
