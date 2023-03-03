const constants = require('../../../utils/constants');
const { Order, MailGen } = require('../../../db');
const httpStatusCodes = require('../../../utils/http-status-codes');
const ValidationError = require('../../../utils/validation-error');
const mailer = require('../../../mailerAdmin');

const editOrder = async (data) => {
    let order = await Order.findByPk(data.id);

    if (order.status === data.status && order.isDelivered === data.isDelivered) {
        return order;
    }

    // Validate status change
    if (order.status !== data.status) {
        // creada => procesando || cancelada
        let isStatusOK = false;
        if (order.status === 'Created' && ['Created', 'Processing', 'Canceled'].some(s => s === data.status)) {
            // console.log('creada => procesando || cancelada');
            isStatusOK = true;
        }
        // procesando => cancelada || completa
        if (order.status === 'Processing' && ['Processing', 'Canceled', 'Completed'].some(s => s === data.status)) {
            // console.log('procesando => cancelada || completa');
            isStatusOK = true;
        }
    
        if (!isStatusOK) {
            throw new ValidationError(
                'Validation error',
                { errors: { status: constants.INVALID_ORDER_STATUS_CHANGE } },
                httpStatusCodes.BAD_REQUEST
            );
        }
    }

    const statusPreviousValue = order.status;
    const isDeliveredPreviousValue = order.isDelivered;

    await order.update({
        status: data.status,
        isDelivered: data.isDelivered,
        deliveredDate: data.isDelivered ? new Date() : null
    });

    try {
        const mailGenConfig = await MailGen.findByPk(1);
        const to = data.Customer.email;

        // Send status change to customer
        if (statusPreviousValue !== data.status) {
            let subject = `YAZZ - Orden de pedido N° ${data.id} actualizado`;
            let body = {
                name: data.Customer.name,
                greeting: mailGenConfig.greeting,
                signature: mailGenConfig.signature,
                intro: `Su pedido N° ${data.id} se ha actualizado al estado ${data.status}.`,
                outro: "Acceda con sus datos al sitio para ver el detalle de su pedido."
            }

            await mailer(to, subject, body);
        }

        // Send delivery change to customer
        if (isDeliveredPreviousValue !== data.isDelivered) {
            subject = `YAZZ - Orden de pedido N° ${data.id} ${data.isDelivered ? 'entregada' : 'pendiente'}`;
            body = {
                name: data.Customer.name,
                greeting: mailGenConfig.greeting,
                signature: mailGenConfig.signature,
                intro: data.isDelivered ? `Su pedido N° ${data.id} ha sido entregado.` : `Lo sentimos. Ha habido un error y su pedido N° ${data.id} no ha sido entregado.`,
                outro: data.isDelivered ? "Gracias por su compra." : "Acceda con sus datos al sitio para ver el detalle de su pedido."
            }
    
            await mailer(to, subject, body);
        }
    } catch (error) {
        // console.log('controllerPutOrder notification error', error);
        throw new ValidationError(
            'Email notification error',
            {
                notificationError: constants.EMAIL_NOTIFICATION_ERROR
            },
            httpStatusCodes.INTERNAL_SERVER
        );
    }



    return order;
}


module.exports = { editOrder };
