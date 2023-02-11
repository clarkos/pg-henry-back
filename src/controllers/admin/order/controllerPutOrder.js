const constants = require('../../../utils/constants');
const { Order } = require('../../../db');
const httpStatusCodes = require('../../../utils/http-status-codes');
const ValidationError = require('../../../utils/validation-error');

const editOrder = async (data) => {
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

    return order;
}

module.exports = { editOrder };
