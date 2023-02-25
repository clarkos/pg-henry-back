const { Product, Order, OrderItem, sequelize } = require('../../db.js');
const { Sequelize, Transaction } = require('sequelize');

const addEditOrderItems = async(data) => {
    const {orderId, items} = data;
    // items = [{productId, quantity}]
    return sequelize.transaction(async function (orderTransaction) {

        const order = await Order.findByPk(orderId,  {lock: orderTransaction.LOCK.UPDATE});
        if (!order)
           throw new Error(`Orden no existe. Número de orden ${orderId}`);

        if (order.status != 'Created')   
           throw new Error(`Imposible agregar nuevos items a la orden ${orderId}. Estado distinto a Created`);
    
        if (!items)    
            throw new Error(`Imposible agregar o modificar items. Items esta indefinido`);

        // agrego detalle de compra
        let newAditionalTotal = 0;
        let updatedOrderItems = [];
        for (const item of items) {
            const product = await Product.findByPk(item.productId, {lock: orderTransaction.LOCK.UPDATE});
            if (!product) 
                throw new Error(`El producto ${item.productId} no existe.`); 

            if (product.status === 'Disabled') 
                throw new Error(`El producto ${product.name} se encuentra inhabilitado para ser comprado.`); 
                    
            if ( item.quantity > product.stock) 
                throw new Error(`El producto ${product.name} no tiene stock disponible.`);             

                // actualizo stock
            await product.update(
                {
                    stock: product.stock - item.quantity,
                }, 
                {
                    transaction: orderTransaction
                }
            );

            // agrego item al detalle de la compra
            const condition = {};
            condition.where = {};
            condition.where.orderId = orderId;
            condition.where.productId = item.productId;

            let orderItem = await OrderItem.findOne(condition);
            if (orderItem) {
                if ((orderItem.quantity + item.quantity) <= 0)  
                    throw new Error(`el item ${product.name} no puede tener cantidad menor que 0(cero).`);    

                newAditionalTotal = item.quantity * orderItem.unitPrice;
                orderItem.update(
                    {
                        quantity: orderItem.quantity + item.quantity,
                        totalAmount:  (orderItem.quantity + item.quantity) * orderItem.unitPrice,
                        // parseFloat(orderItem.totalAmount + (quantity * product.price)).toFixed(2) 
                    }, 
                    {
                        transaction: orderTransaction
                    }
                ) 

            }else{
                if (item.quantity <= 0)
                throw new Error(`el item ${product.name} no puede tener cantidad menor que 0(cero).`);    

                newAditionalTotal = item.quantity * product.price;
                orderItem = await OrderItem.create(
                    {
                        orderId: orderId,
                        productId: item.productId,
                        quantity: item.quantity,
                        unitPrice: product.price,
                        totalAmount: parseFloat(item.quantity * product.price).toFixed(2),
                    },            
                    {
                        transaction: orderTransaction
                    }
                );
            updatedOrderItems.push(orderItem); 
            }
        }
        
        // actualizo monto total de orden
        await order.update(
            {
                totalAmount: parseFloat(order.totalAmount) + parseFloat(newAditionalTotal)
            }, 
            {
                transaction: orderTransaction
            }
        );

        return updatedOrderItems;
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

module.exports = { addEditOrderItems };

