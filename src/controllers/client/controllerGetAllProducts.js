const { Product, Photo, Category, Artist, Location, CategoryProduct } = require('../../db.js');
const { Op } = require('sequelize');
const isProductFinished = require('./isProductFinished');

const getAllProducts = async () => {

  const products = await Product.findAll(
    {
      attributes: [
        'id',
        'name',
        'Description',
        'StartDate',
        'EndDate',
        'Stock',
        'Price',
        'StartTime',
        'Status'],
      include: [
        {
          model: Photo,
          attributes: ['Id', 'Path']
        },
        {
          model: Category,
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        },
        {
          model: Artist,
          attributes: ['Id', 'Name']
        },
        {
          model: Location,
          attributes: ['Id', 'Name', 'Address', 'Coordinates']
        },
      ],
      where : { status: { [Op.eq]: 'Active' } }
    },
  );

  products.forEach(product => {
    product.dataValues.isProductFinished = isProductFinished(product.dataValues.StartDate, product.dataValues.StartTime)
  });

  return products;
};

module.exports = { getAllProducts };

