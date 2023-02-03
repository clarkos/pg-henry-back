const { Router } = require('express');
const { createArtist } = require('../../../controllers/admin/artist/controllerPostArtist');

const router = Router();

// POST /artists
router.post(
    '/',
    async (req, res, next) => {
        try {
            const { name, groupId, status } = req.body;
            // console.log('post /artists req.body: ', req.body);

            const artist = await createArtist(name, groupId, status);

            res.status(200).json(artist);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
