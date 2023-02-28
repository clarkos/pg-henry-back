const mercadopago = require("mercadopago");
// si quiero validar con bd el customer
// const { Customer } = require("../../models/Customer");
const { Order, Product, OrderItem } = require("../../db.js");
const { sequelize } = require("../../db");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

let backRedirectUrl = "";
let frontRedirectUrl = "";

if (process.env.NODE_ENV === "TEST") {
  backRedirectUrl = "http://localhost:3001";
  frontRedirectUrl = "http://localhost:3000";
} else {
  backRedirectUrl = "https://pg-henry.up.railway.app";
  frontRedirectUrl = "https://pg-front-henry.vercel.app";
}

const payment = async (req, res, next) => {
  const order = req.body;

  try {
    // VALIDACION CON DB
    // async function getById(id) {
    //   const customer = await Customer.findByPk(id, {
    //     include: { all: true, nested: true },
    //   });
    //   return customer;
    // }

    // const customer = await getById(order.customerID);
    // if (!customer)
    //   return res
    //     .status(404)
    //     .json({ error: "There is no customer with this id" });
    // FIN VALIDACION DB

    // Configuro las preferencias requeridas por Mercadopago

    const preference = {
      items: [
        {
          title: "tus entradas en Yazz",
          currency_id: "ARS",
          unit_price: order.TotalAmount,
          quantity: 1,
        },
      ],
      external_reference: `${order.id}`,
      payer: {
        name: order.customerName,
        email: order.customerEmail,
      },
      back_urls: {
        //rutas de acuerdo a como haya salido la transacion
        success: backRedirectUrl + "/pay/",
        failure: backRedirectUrl + "/pay/",
        pending: frontRedirectUrl,
      },
      statement_descriptor: "Yazz Shows",
      auto_return: "approved",
      // para que no se puedan hacer pagos pendientes (rapipago, etc)
      binary_mode: true,
    };

    return await mercadopago.preferences.create(preference).then((response) => {
      res.status(200).send({ response });
    });
  } catch (error) {
    console.log(error);
    // next(error);
  }
};

async function updateStock(orderId) {
  let transaction;
  // Obtener todos los items de la orden
  const orderItems = await OrderItem.findAll({
    where: { orderId },
    attributes: ["productId", "quantity"],
  });

  try {
    // Iniciar una transacción
    transaction = await sequelize.transaction();

    // Validar que hay al menos un item de la orden
    if (orderItems.length === 0) {
      throw new Error("La orden no tiene items.");
    }

    // Actualizar el stock de cada producto correspondiente
    await Promise.all(
      orderItems.map(async (orderItem) => {
        // Obtener el producto correspondiente al item de la orden
        const productToUpdate = await Product.findByPk(orderItem.productId, {
          transaction,
        });

        // Guardar una copia temporal del stock original
        const originalStock = productToUpdate.stock;

        // Actualizar el stock
        productToUpdate.stock = productToUpdate.stock - orderItem.quantity;
        
        // Para ver si actualiza bien el stock
        console.log(
          `El nuevo stock del Producto con ID ${orderItem.productId}: `,
          productToUpdate.stock
        );

        // Validar el nuevo stock
        if (productToUpdate.stock < 0) {
          throw new Error(
            `Stock insuficiente para el producto ${productToUpdate.id}`
          );
        }

        // Guardar los cambios
        await productToUpdate.save({ transaction });
      })
    );

    // Confirmar la transacción
    await transaction.commit();
  } catch (error) {
    // Si hay un error, revertir la transacción y restaurar el stock original
    if (transaction) {
      await transaction.rollback();
      await Promise.all(
        orderItems.map(async (orderItem) => {
          const productToUpdate = await Product.findByPk(orderItem.productId);
          productToUpdate.stock = originalStock;
          await productToUpdate.save();
        })
      );
    }
    console.error(error);
    throw error;
  }
}

// para recibir la info del pago
const getPaymentInfo = async (req, res, next) => {
  const payment_id = req.query.payment_id;
  const payment_status = req.query.status;
  const external_reference = req.query.external_reference;
  const merchant_order_id = req.query.merchant_order_id;

  try {
    Order.findByPk(external_reference).then((order) => {
      order.payment_id = payment_id;
      order.payment_status = payment_status;
      order.merchant_order_id = merchant_order_id;
      if (order.payment_status === "null")
        return res.redirect(frontRedirectUrl);
      order.payment_status === "approved"
        ? (order.status = "Completed")
        : (order.status = "Canceled");

      if (order.status === "Completed") {
        try {
          updateStock(external_reference);
        } catch (error) {
          order.status = "Canceled";
          console.log(error);
          // Redireccionar a pagina que se avisa que el hubo un error en la compra y se devolverá el dinero
        }
      }
      order
        .save()
        .then((_) => {
          return res.redirect(frontRedirectUrl);
        })
        .catch((err) => {
          console.error("error al guardar", err);
        });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { payment, getPaymentInfo };
