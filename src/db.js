const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const {
  NODE_ENV,
  DATABASE_URL
} = process.env;

let sequelize;

if (NODE_ENV === 'PROD') {
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true // Enable SSL/TLS for secure communication with the database
    },
    pool: {
      acquire: 30000, // Maximum time, in milliseconds, that the pool will try to get a connection before throwing an error
      idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
      min: 0, // Minimum number of connections in the pool
      max: 10 // Maximum number of connections in the pool
    },
    logging: false // Disable SQL query logging for production environments
  });
} else {
  sequelize = new Sequelize(DATABASE_URL, {
    logging: false,
    native: false,
  });
}

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Artist, Category, CategoryProduct, Location, Photo, Product,
  Customer, Order, OrderItem, Payment, User, Review } = sequelize.models;

// Aca vendrian las relaciones
// Product <---> Category
Product.belongsToMany(Category, { through: CategoryProduct });
Category.belongsToMany(Product, { through: CategoryProduct });

// Product <---> Photo
Product.hasMany(Photo);
Photo.belongsTo(Product);

// Product <---> Location
Location.hasMany(Product);
Product.belongsTo(Location);

// Product <---> Artist
Artist.hasMany(Product);
Product.belongsTo(Artist);

// Customer --> Order
Customer.hasMany(Order);
Order.belongsTo(Customer);

// Order --> OrderItems
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// OrderItem --> Product
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

// Payment --> Order
Order.hasMany(Payment);
Payment.belongsTo(Order);

// Customer --> User
User.hasOne(Customer);
Customer.belongsTo(User);

// User --> Review
User.hasMany(Review);
Review.belongsTo(User);

// Product --> Review
Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
