const server = require('./src/app.js');
const { sequelize } = require('./src/db.js');
const { setAllDb } = require('./src/controllers/client/controlletSetAllDb');
const PORT = process.env.PORT || 3000;


sequelize.authenticate().then(() => {
  console.log('Connected to the database');
  setAllDb(); // Call your function to set up your database content
  server.listen(PORT, () => {
    console.log('Server listening on port ', PORT);
  });
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});
