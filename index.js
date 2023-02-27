const server = require('./src/app.js');
const { sequelize } = require('./src/db.js');
const { setAllDb } = require('./src/controllers/client/controllerSetAllDb');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  sequelize.sync({ force: true }).then(() => {
    setAllDb();
    server.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}`);
    });
  });
} else {
  sequelize.sync({ force: true }).then(() => {
    setAllDb();
    server.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}`);
    });
  });
}
