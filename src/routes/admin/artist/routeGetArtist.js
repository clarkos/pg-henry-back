const { Router } = require('express');
const { getArtist } = require('../../../controllers/admin/artist/controllerGetArtist');

const router = Router();

// GET /artists/{id}
router.get(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const artist = await getArtist(id);

            res.status(200).json(artist);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
