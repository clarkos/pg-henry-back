const { Product, Photo, Category, Artist, Location, CategoryProduct } = require('../../db.js');
const { Sequelize } = require('sequelize');

const getAllProducts = async() => {
    return await Product.findAll(
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
                 attributes : ['Id', 'Path'] 
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
            ]
        },
    );
};

module.exports = { getAllProducts };

