const { Location } = require('../../../db');

const editLocation = async (id, name, address, coordinates, status) => {
    let location = await Location.findByPk(id);
    // console.log('category: ', category);

    await location.update({
        name,
        address,
        coordinates,
        status
    });

    return location;
}

module.exports = { editLocation };
