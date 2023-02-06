const { User } = require("../../../db");

const editUser = async (id, userName,password, role, status) => {
  let user = await User.findByPk(id);

  await user.update({
    userName,
    password,
    role,
    status,
  });

  return user;
};

module.exports = { editUser };
