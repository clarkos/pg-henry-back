const { Artist } = require('../../../db');

const getArtist = async (id) => {
    let artist = await Artist.findByPk(id);
    // console.log('artist: ', artist);

    return artist;
}

module.exports = { getArtist };
