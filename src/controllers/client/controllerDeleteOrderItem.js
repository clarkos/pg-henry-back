const { Product, Order, OrderItem, sequelize } = require('../../db.js');
const { Sequelize, Transaction } = require('sequelize');

const deleteOrderItem = async(data) => {
    const {orderId, productId} = data;
    
    return sequelize.transaction(async function (orderTransaction) {

        // obtengo encabezado de order
        const order = await Order.findByPk(orderId,  {lock: orderTransaction.LOCK.UPDATE});
        if (!order)
           throw new Error(`Orden no existe. Número de orden ${orderId}`);

        if (order.status != 'Created')   
           throw new Error(`Imposible agregar nuevos items a la orden ${orderId}. Estado distinto a Created`);

        // agrego item al detalle de la compra
        const condition = {};
        condition.where = {};
        condition.where.orderId = orderId;
        condition.where.productId = productId;

        const orderItem = await OrderItem.findOne(condition);

        if (orderItem) {
           const oldQuantity = orderItem.quantity;
           const oldTotalAmount = orderItem.totalAmount;

           // elimino el item de la orden
           await orderItem.destroy({force: true, transaction: orderTransaction});

           // sumo stock de compra
           const product = await Product.findByPk(productId, {lock: orderTransaction.LOCK.UPDATE});

           // actualizo stock
           await product.update(
              {
                stock: product.stock + oldQuantity,
              }, 
              {
                transaction: orderTransaction
              }
           );

           // agrego item al detalle de la compra
           // actualizo monto total de orden
           await order.update(
               {
                   totalAmount: parseFloat(order.totalAmount) - parseFloat(oldTotalAmount)
               }, 
               {
                   transaction: orderTransaction
               }
           );
        }

        return orderItem;
     })

    .then(
        result =>
        {
            return result;
        }
     )
     
    .catch(
        e => 
        {
            return {error: e.message};
        }
    );
};

module.exports = { deleteOrderItem };
