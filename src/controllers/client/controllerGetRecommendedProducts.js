const { Product, Photo, Category, Artist, Location } = require('../../db.js');
const { Op } = require('sequelize');
// const { DateTime } = require('luxon');

const getRecommendedProducts = async (filter) => {

    const productFields = ['id', 'name', 'Description', 'StartDate', 'Stock', 'Price', 'StartTime'];

    const options = {};

    // campos que retorno
    options.attributes = productFields;

    // Agrego modelos relacionados
    options.include = [
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

    const filterObj = JSON.parse(filter);

    // status condition
    const statusCondition = { [Op.eq]: 'Active' };

    // referenceShow condition
    const referencedShowCondition = { [Op.ne]: filterObj.referencedProductId };

    // startDate condition
    const startDateCondition = { [Op.gt]: new Date() };

    options.where = {
        [Op.and]:
        [
            { status: statusCondition },
            { id: referencedShowCondition },
            { startDate: startDateCondition }
        ]
    };
    
    // filtro por join - tabla relacionada
    if (filterObj.categories) {
        // categories condition
        const categoriesCondition = { [Op.or]: filterObj.categories };
        
        options.include[options.include.length - 1].where = { id: categoriesCondition }
    }
    
    // order by startDate, name
    options.order = [
        ['startDate', 'ASC'],
        ['startTime', 'ASC'],
        ['name', 'ASC']
    ];
    
    // const dt = DateTime.now();
    // var rezoned = dt.setZone("America/Argentina/Buenos_Aires");
    // console.log('hour, minute', rezoned.hour, rezoned.minute);

    return await Product.findAll(options);
};

module.exports = { getRecommendedProducts };
