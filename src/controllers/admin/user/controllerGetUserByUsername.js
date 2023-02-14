const { User } = require('../../../db');

const getUserByUsername = async (username) => {
    let user = await User.findOne({where:{userName: username}});
    // console.log('artist: ', artist);
    console.log(user)
    return user;
}

module.exports = { getUserByUsername };
