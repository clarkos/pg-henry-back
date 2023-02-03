const { Router } = require('express');
const { editArtist } = require('../../../controllers/admin/artist/controllerPutArtist');

const router = Router();

// PUT /artists/{id}
router.put(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, groupId, status } = req.body;
            // console.log('put /artists/:id req.body: ', req.body);

            const artist = await editArtist(id, name, groupId, status);

            res.status(200).json(artist);
        } catch (error) {
            // console.log('PUT /artists/{id} error: ', error);
            next(error);
        }
    }
);

module.exports = router;
