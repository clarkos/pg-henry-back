const server = require('./src/app.js');
const { sequelize } = require('./src/db.js');
const { setAllDb } = require('./src/controllers/client/controlletSetAllDb');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  sequelize.authenticate().then(() => {
    console.log('Connected to the database');
    server.listen(PORT, () => {
      console.log('Server listening on port ', PORT);

    });
  }).catch((error) => {
    console.error('Error connecting to the database:', error);
  });
} else {
  sequelize.sync({ force: true }).then(() => {
    setAllDb();
    server.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}`);
    });
  });
}
