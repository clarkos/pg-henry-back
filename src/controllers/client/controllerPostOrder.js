const { Customer, Product, Order, OrderItem, conn } = require('../../db.js');
const { Sequelize, Transaction } = require('sequelize');

const createOrder = async(data) => {
    const {customerId, shippingDate, totalAmount, items} = data;
    
    const customer = await Customer.findByPk(customerId);
    if (!customer) 
       return {error: 'El cliente asociado a la compra no existe.'};  
  
    if (!customer.name || customer.name === "")
       return {error: 'Falta especificar el Nombre del cliente asociado a la compra.'};  

    if (!customer.document || customer.document === 0)
       return {error: 'Falta especificar el Documento del cliente asociado a la compra.'};  

    if (!customer.email || customer.email === 0)
       return {error: 'Falta especificar el Correo Electrónico del cliente asociado a la compra.'};  

    if (!totalAmount || totalAmount === 0)
       return {error: 'El importe total de la compra no puede ser igual a 0(cero).'};  

    return conn.transaction(async function (orderTransaction) {

        // agrego encabezado de registro
        const order = await Order.create(
            {
                customerId,
                orderDate: new Date(),
                shippingDate,
                totalAmount
            },
            { 
                transaction: orderTransaction 
            }
        );

        // agrego detalle de compra
        let totalValidator = 0;
        order.dataValues.items = [];
        let product = {};   
        for (const item of items) {
            product = await Product.findByPk(item.productId, {lock: orderTransaction.LOCK.UPDATE});
            if (!product) 
                throw new Error(`El producto ${item.id} no existe.`); 

            if (product.status === 'Disabled') 
                throw new Error(`El producto ${product.name} se encuentra inhabilitado para ser comprado.`); 
                
            if ( item.quantity > product.stock) 
                throw new Error(`El producto ${product.name} no tiene stock disponible.`);             

            if ( item.unitPrice * item.quantity != item.totalAmount )
                throw new Error(`El importe de total del producto ${product.name} es incorrecto. Price * Quantity = TotalAmount`);             
            totalValidator = totalValidator + item.totalAmount;

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
            const response = await OrderItem.create(
                {
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    totalAmount: item.totalAmount             
                },            
                {
                    transaction: orderTransaction
                }
            );

            if (response) 
               order.dataValues.items.push(response.dataValues);            
        };

        if (totalValidator != order.totalAmount)
           throw new Error(`La suma del campo importe de total de items no corresponde con el importe total de la orden.`);             

        return order;
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


module.exports = { createOrder };

