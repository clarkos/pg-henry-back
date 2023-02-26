const { Product, Photo, Category, Artist, Location } = require('../../db.js');
const { Op } = require('sequelize');
const { DateTime } = require('luxon');
const isShowFinished = require('./isShowFinished');

const getProducts = async (name, days, category) => {
    const productFields = ['id', 'name', 'Description', 'StartDate', 'Stock', 'Price', 'StartTime'];

    
    const attributes = productFields;
    
    const include = [
        {
            model: Photo,
            attributes: ['Id', 'Path']
        },
        {
            model: Artist,
            attributes: ['Id', 'Name']
        },
        {
            model: Location,
            attributes: ['Id', 'Name', 'Address', 'Coordinates']
        },
        {
            model: Category,
            attributes: ['id', 'name'],
            through: {
                attributes: []
            },
        },
    ];
    
    if (category && !isNaN(category)) {
        include[include.length - 1].where = { id: `${category}` }
    }
    
    // Filters
    // status
    const where = {};
    where.status = "Active";
    
    // product name
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    
    // days
    console.log('days', days);
    const dt = DateTime.now();
    const startDate = dt.setZone("America/Argentina/Buenos_Aires").toISODate();

    if (days && days === 'today') {
        console.log('startDate: ', startDate);
        where.startDate = { [Op.eq]: startDate }
    }

    if (days && !isNaN(days)) {
        let endDate = dt.setZone("America/Argentina/Buenos_Aires");
        endDate = endDate.plus({ days }).toISODate();
        console.log('range: ', startDate, endDate);
        where.startDate = { [Op.gte]: startDate, [Op.lt]: endDate }
    }

    const options = {
        attributes,
        include,
        where,
    };

    const products = await Product.findAll(options);
    
    products.forEach(product => {
        product.dataValues.isShowFinished = isShowFinished(product.dataValues.StartDate, product.dataValues.StartTime)
    });

    return products;
};

module.exports = { getProducts };
