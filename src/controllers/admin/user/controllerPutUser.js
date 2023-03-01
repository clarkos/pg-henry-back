const { User } = require("../../../db");
const admin = require("../../../config/firebase-config")

const editUser = async (id, userName, password, role, status) => {
  let user = await User.findByPk(id);

  if (status !== 'Active') {
    try {
      const firebaseUser = await admin.auth().getUserByEmail(userName);
      await admin.auth().updateUser(
        firebaseUser.uid,
        {
          disabled: true
        });
    } catch (error) {
      throw new Error(error)
    }
  }
  else if(status === 'Active'){
    try {
      const firebaseUser = await admin.auth().getUserByEmail(userName);
      await admin.auth().updateUser(
        firebaseUser.uid,
        {
          disabled: false
        });
    } catch (error) {
      throw new Error(error)
    }
  }

  await user.update({
    userName,
    password,
    role,
    status,
  });

  return user;
};

module.exports = { editUser };
