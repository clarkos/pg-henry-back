const { Product, Photo, Category, Artist, Location } = require('../db.js');
const { Op } = require('sequelize');

const getProductsFiltered = async(name, date, category) => {
    const productFields = ['id', 'name', 'Description', 'StartDate','EndDate', 'Stock','Price','StartTime'];

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
    if (name) where.name = {[Op.iLike] : `%${name}%`};

    const validateDate = /^\d{4}\-\d{2}\-\d{2}$/;
    if (date && validateDate.test(date)) where.startDate = `${date}`;
    condition.where = where; 

    // filtro por join - tabla relacionada
    if (category && !isNaN(category)) {
        condition.include[condition.include.length-1].where = {id: `${category}`}
    } 

    return await Product.findAll(condition);
};

module.exports = { getProductsFiltered };

