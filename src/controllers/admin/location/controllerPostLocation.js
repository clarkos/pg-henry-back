const { Location } = require('../../../db');

const createLocation = async (name, address, coordinates, status) => {
    // let category = await Category.findByPk(id);
    // console.log('category: ', category);

    const location = await Location.create({
        name,
        address,
        coordinates,
        status
    });

    return location;
}

module.exports = { createLocation };
