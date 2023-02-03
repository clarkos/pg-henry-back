const { Router } = require('express');
const { getArtists } = require('../../../controllers/admin/artist/controllerGetArtists');
const router = Router();

// GET /admin/artists
router.get(
    '/',
    async (req, res, next) => {
        try {
            const { page, size, sort, filter } = req.query;

            // console.log('filter query: ', filter);

            const artists = await getArtists(page, size, sort, filter);

            res.status(200).json(artists);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
