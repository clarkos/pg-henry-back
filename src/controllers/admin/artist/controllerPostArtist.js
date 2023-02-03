const { Artist } = require('../../../db');

const createArtist = async (name, groupId, status) => {

    const artist = await Artist.create({
        name,
        groupId,
        status
    });

    return artist;
}

module.exports = { createArtist };
