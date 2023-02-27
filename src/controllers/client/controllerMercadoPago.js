const mercadopago = require("mercadopago");
// si quiero validar con bd el customer
// const { Customer } = require("../../models/Customer");
const { Order } = require("../../db.js");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const payment = async (req, res, next) => {
  const order = req.body;

  let backRedirectUrl = "";
  let frontRedirectUrl = "";
  if (process.env.NODE_ENV === "TEST") {
     backRedirectUrl = "http://localhost:3001";
     frontRedirectUrl = "http://localhost:3000";
  }else{
     backRedirectUrl = "https://pg-henry.up.railway.app";
     frontRedirectUrl = "https://pg-front-henry.vercel.app";
  }

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

    return await mercadopago.preferences
      .create(preference)
      .then((response) => {res.status(200).send({ response })});
  } catch (error) {
    console.log(error);
    // next(error);
  }
};

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

      order
        .save()
        .then((_) => {
          return res.redirect(frontRedirectUrl);
        })
        .catch((err) => {
          console.error("error al guardar", err);
          // return res.redirect(
          //   `http://localhost:3000/?error=${err}&where=saving`
          // );
        });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { payment, getPaymentInfo };
