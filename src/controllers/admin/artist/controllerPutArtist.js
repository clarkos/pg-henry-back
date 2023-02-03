const { Artist } = require('../../../db');

const editArtist = async (id, name, groupId, status) => {
    let artist = await Artist.findByPk(id);

    await artist.update({
        name,
        groupId,
        status
    });

    return artist;
}

module.exports = { editArtist };
