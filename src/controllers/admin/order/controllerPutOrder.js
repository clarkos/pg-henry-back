const constants = require('../../../utils/constants');
const { Order } = require('../../../db');
const httpStatusCodes = require('../../../utils/http-status-codes');
const ValidationError = require('../../../utils/validation-error');
const mailer = require('../../../mailerAdmin');

const editOrder = async (data) => {
    // console.log('editOrder data: ', data);
    let order = await Order.findByPk(data.id);

    // Validate status change
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


    await order.update({
        status: data.status
    });

    // Send event to customer
    try {
        const to = data.Customer.email;
        const subject = `YAZZ - Orden de pedido N° ${data.id} actualizado`;
        const body = {
            name: data.Customer.name,  // Nombre del sitio
            greeting: 'Hola',
            signature: 'Saludos cordiales',
            intro: `Su pedido N° ${data.id} se ha actualizado al estado ${data.status}.`,
            outro: "Acceda con sus datos al sitio para ver el detalle de su pedido."
        }

        await mailer(to, subject, body);
    } catch (error) {
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
