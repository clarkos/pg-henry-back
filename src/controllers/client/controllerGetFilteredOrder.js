const { Order, OrderItem, Product, Photo, Customer, User } = require('../../db.js');

const getFilteredOrder = async (status, userName) => {

    const condition = {};
    const where = {};

    if (status) where.status = status;    

    condition.include = [
        {
            model: OrderItem,
            attributes: ['Id', 'ProductId', 'Quantity', 'UnitPrice', 'TotalAmount'],
            include : [
                {
                    model: Product,
                    attributes: ['Id', 'Name', 'StartDate'],
                    include: [
                        {
                            model: Photo,
                            attributes: ['Id', 'Path']
                        },
                    ]
                },
            ]
        },
        {
            model: Customer,
            attributes: ['Id', 'UserId', 'Name', 'Address', 'City', 'State', 'Zip', 'Telephone', 'Document', 'BirthDate', 'Email'],
            required: true, 
            include : [
                {
                    model: User,
                    attributes: ['UserName'],
                    required: true,
                    where: {
                         UserName: userName
                     }
                }
            ]

        }
    ];

    // campos que retorno
    condition.where = where;
    condition.attributes = ['Id', 'CustomerId', 'TotalAmount'];

    let order = await Order.findOne(condition);
    return order;
}

module.exports = { getFilteredOrder };
