const { Location } = require('../../../db');

const getLocation = async (id) => {
    let location = await Location.findByPk(id);
    // console.log('category: ', location);

    return location;
}

module.exports = { getLocation };
