const { Router } = require('express');
const { createLocation } = require('../../../controllers/admin/location/controllerPostLocation');

const router = Router();

// POST /admin/locations
router.post(
    '/',
    async (req, res, next) => {
        try {
            const { name, address, coordinates, status } = req.body;

            const location = await createLocation(name, address, coordinates, status);

            res.status(200).json(location);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
