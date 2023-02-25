const { Product, Photo, Category, Artist, Location } = require('../../db.js');
const { Op } = require('sequelize');
const isProductFinished = require('./isProductFinished');

const getProductsFiltered = async (name, days, category) => {
    const productFields = ['id', 'name', 'Description', 'StartDate', 'EndDate', 'Stock', 'Price', 'StartTime'];

    const condition = {};
    const where = {};

    // campos que retorno
    condition.attributes = productFields;

    // Agrego modelos relacionados
    condition.include = [
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

    // filtro status
    where.status = "Active";

    // filtro por campos de countries
    if (name) where.name = { [Op.iLike]: `%${name}%` };

    // lo dejo por si despues se quiere filtrar por una fecha en particular
    // const validateDate = /^\d{4}\-\d{2}\-\d{2}$/;
    // if (day && validateDate.test(date)) where.startDate = `${date}`;
    if (days && !isNaN(days)) {
        const date = new Date();
        date.setDate(date.getDate() + parseInt(days));
        where.startDate = { [Op.lte]: `${date}` };
    }
    condition.where = where;

    // filtro por join - tabla relacionada
    if (category && !isNaN(category)) {
        condition.include[condition.include.length - 1].where = { id: `${category}` }
    }

    const products = await Product.findAll(condition);

    products.forEach(product => {
        product.dataValues.isProductFinished = isProductFinished(product.dataValues.StartDate, product.dataValues.StartTime)
    });

    return products;
};

module.exports = { getProductsFiltered };
