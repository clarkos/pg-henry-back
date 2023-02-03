const { Router } = require('express');
const { getLocation } = require('../../../controllers/admin/location/controllerGetLocation');

const router = Router();

// GET /admin/locations/{id}
router.get(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const location = await getLocation(id);

            res.status(200).json(location);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
