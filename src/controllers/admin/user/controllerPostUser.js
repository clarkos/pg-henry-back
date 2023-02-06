const { User } = require('../../../db');

const createUser = async (userName,password, role, status) => {
    console.log("createUser => ", userName, role, status)
    const user = await User.create({
        userName,
        password,
        role,
        status
    });

    return user;
}

module.exports = { createUser };
