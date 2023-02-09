const { Product, Photo, Category, Artist, Location, CategoryProduct} = require('../../db.js');

const getProductDetail = async(id) => {
    return await Product.findByPk(id,
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
                  attributes: ['Id', 'Name'],
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

module.exports = { getProductDetail };
