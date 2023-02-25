const { Product, Photo, Category, Artist, Location } = require('../../db.js');
const isShowFinished = require('./isShowFinished');

const getProductDetail = async(id) => {
    const product = await Product.findByPk(id,
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
    
    product.dataValues.isShowFinished = isShowFinished(product.dataValues.StartDate, product.dataValues.StartTime)

    return product;
};

module.exports = { getProductDetail };
