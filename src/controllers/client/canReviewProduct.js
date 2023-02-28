const { Order, OrderItem } = require('../../db');
const { Op } = require('sequelize');

async function canReviewProduct(productId, customerId) {
    const options = {
        where: {
            [Op.and]: [
                { status: { [Op.eq]: 'Completed' } },
                { CustomerId: { [Op.eq]: customerId } }
            ]
        },
        include: [
            {
                model: OrderItem,
                where: {
                    [Op.and]: [
                        // { status: { [Op.eq]: 'Active' } },
                        { ProductId: { [Op.eq]: productId } }
                    ]
                }
            }
        ]
    }

    const orders = await Order.findOne(options);

    return true;
}

module.exports = canReviewProduct;
