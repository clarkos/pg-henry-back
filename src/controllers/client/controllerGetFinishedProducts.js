const { Product, Photo, Category, Artist, Location } = require('../../db.js');
const { Op } = require('sequelize');
const { DateTime } = require('luxon');
const isShowFinished = require('./isShowFinished');

const getFinishedProducts = async (name, category) => {
    const productFields = ['id', 'name', 'Description', 'StartDate', 'StartTime', 'Stock'];

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

    const options = {
        attributes,
        include,
        where,
        order: [
            ['startDate', 'DESC'],
            ['startTime', 'DESC']
        ]
    };

    let products = await Product.findAll(options);

    products = products.filter(product =>
        isShowFinished(
            product.dataValues.StartDate,
            product.dataValues.StartTime
        )
    );

    return products;
};

module.exports = { getFinishedProducts };
