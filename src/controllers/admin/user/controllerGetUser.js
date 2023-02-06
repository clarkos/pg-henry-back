const { User } = require('../../../db');

const getUser = async (id) => {
    let user = await User.findByPk(id);
    // console.log('artist: ', artist);

    return user;
}

module.exports = { getUser };
