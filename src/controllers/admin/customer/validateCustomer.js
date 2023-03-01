const constants = require('../../../utils/constants');
const existCustomerByName = require('./existCustomerByName');
const existCustomerByDocument = require('./existCustomerByDocument');

async function validateCustomer(data) {
    try {
        // name
        if (!data.name) {
            return {
                errors: {
                    name: 'Necesitás ingresar un nombre',
                }
            };
        }
        if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(data.name)) {  //regex solo acepta letras
            return {
                errors: {
                    name: 'Solo se permiten letras',
                }
            };
        }
        if (data.name.length < 4) {
            return {
                errors: {
                    name: 'El nombre debe tener al menos 4 letras',
                }
            };
        }

        // telephone
        if (!data.telephone) {
            return {
                errors: {
                    telephone: 'Necesitás ingrear un teléfono',
                }
            };
        }
        if (!/^(?:(?:\+|00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(data.telephone)) {
            return {
                errors: {
                    telephone: 'Tiene que ser un número válido. Por ejemplo +5491133333333 o 3515555555',
                }
            };
        }

        // document
        if (!data.document) {
            return {
                errors: {
                    document: 'Necesitás ingresar tu dni',
                }
            };
        }
        if (!/^\d{8}$/.test(data.document)) {
            return {
                errors: {
                    document: 'Tiene que ser un dni válido, solo numeros y de 8 caracteres.',
                }
            };
        }
        // check for customers with the same document
        if (await existCustomerByDocument(data.document, data.id)) {
            return {
                errors: {
                    document: 'Documento duplicado, ya lo tiene otro usuario',
                }
            };
        }

        return '';
    } catch (error) {
        console.log('Validation error: ', error);
        return {
            errors: {
                errors: constants.VALIDATION_ERRORS
            }
        };
    }
}

module.exports = { validateCustomer };
