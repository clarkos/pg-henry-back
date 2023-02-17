const { Product, Order, OrderItem, conn } = require('../../db.js');
const { Sequelize, Transaction } = require('sequelize');

const addOrderItem = async(data) => {
    const {orderId, productId, quantity} = data;
    
    return conn.transaction(async function (orderTransaction) {

        // obtengo encabezado de order
        const order = await Order.findByPk(orderId,  {lock: orderTransaction.LOCK.UPDATE});
        if (!order)
           throw new Error(`Orden no existe. Número de order ${orderId}`);

        if (order.status != 'Created')   
           throw new Error(`Imposible agregar nuevos items a la orden ${orderId}. Estado distinto a Created`);

        // agrego detalle de compra
        const product = await Product.findByPk(productId, {lock: orderTransaction.LOCK.UPDATE});
        if (!product) 
            throw new Error(`El producto ${productId} no existe.`); 

        if (product.status === 'Disabled') 
            throw new Error(`El producto ${product.name} se encuentra inhabilitado para ser comprado.`); 
                
        if ( quantity > product.stock) 
            throw new Error(`El producto ${product.name} no tiene stock disponible.`);             

        // actualizo stock
        await product.update(
            {
                Stock: product.stock - quantity,
            }, 
            {
                transaction: orderTransaction
            }
        );

        // agrego item al detalle de la compra
        const condition = {};
        condition.where = {};
        condition.where.orderId = orderId;
        condition.where.productId = productId;

        let orderItem = await OrderItem.findOne(condition);

        if (orderItem) {
            orderItem.update(
                {
                    Quantity: orderItem.quantity + quantity,
                    TotalAmount: parseFloat(orderItem.totalAmount + (quantity * product.price)).toFixed(2) 
                }, 
                {
                    transaction: orderTransaction
                }
            ) 

        }else{
            orderItem = await OrderItem.create(
                {
                    OrderId: orderId,
                    OroductId: productId,
                    Quantity: quantity,
                    UnitPrice: product.price,
                    TotalAmount: parseFloat(quantity * product.price).toFixed(2),
                },            
                {
                    transaction: orderTransaction
                }
            );
        }

        
        // actualizo monto total de orden
        await order.update(
            {
                TotalAmount: parseFloat(order.totalAmount) +parseFloat(orderItem.totalAmount)
            }, 
            {
                transaction: orderTransaction
            }
        );

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


module.exports = { addOrderItem };

