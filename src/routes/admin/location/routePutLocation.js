const { Router } = require('express');
const { editLocation } = require('../../../controllers/admin/location/controllerPutLocation');

const router = Router();

// PUT /admin/locations/{id}
router.put(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, address, coordinates, status } = req.body;

            const location = await editLocation(id, name, address, coordinates, status);

            res.status(200).json(location);
        } catch (error) {
            // console.log('PUT /locations/{id} error: ', error);
            next(error);
        }
    }
);

module.exports = router;
