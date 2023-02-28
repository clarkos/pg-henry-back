const constants = require('../../../utils/constants');
const { StatusType } = require('../../../dataType');
const { existProduct } = require('./existProduct');
const { getCategory } = require('../category/controllerGetCategory');
const { DateTime } = require('luxon');

async function validateProduct(data) {
    try {

        console.log('data: ', data);

        // name
        if (!data.name) {
            return {
                errors: {
                    name: constants.FIELD_REQUIRED,
                }
            };
        }
        // check for products with the same name
        if (await existProduct(data.name.trim(), data.id)) {
            return {
                errors: {
                    name: constants.DUPLICATED_NAME,
                }
            };
        }

        // location
        if (!data.locationId) {
            return {
                errors: {
                    location: constants.FIELD_REQUIRED,
                }
            };
        }
        // artist
        if (!data.artistId) {
            return {
                errors: {
                    artist: constants.FIELD_REQUIRED,
                }
            };
        }
        // status
        if (!StatusType.values.includes(data.status)) {
            return {
                errors: {
                    status: constants.INVALID_DATA
                }
            };
        }
        // startDate (ISO 8601 format)
        // console.log('startDate: ', data.startDate);
        if (!data.startDate) {
            return {
                errors: {
                    startDate: constants.FIELD_REQUIRED
                }
            };
        }
        if (!isValidDate(data.startDate)) {
            return {
                errors: {
                    startDate: constants.INVALID_DATA
                }
            };
        }
        // startTime
        console.log('startTime: ', data.startTime)
        if (!data.startTime) {
            return {
                errors: {
                    startTime: constants.FIELD_REQUIRED
                }
            };
        }
        if (!isValidTime(data.startTime)) {
            return {
                errors: {
                    startTime: constants.INVALID_DATA
                }
            };
        }
        // Stock
        if (isNaN(data.stock)) {
            return {
                errors: {
                    stock: constants.INVALID_DATA
                }
            };
        }
        if (data.stock < 0) {
            return {
                errors: {
                    stock: constants.INVALID_STOCK
                }
            };
        }
        // Price
        if (isNaN(data.price)) {
            return {
                errors: {
                    price: constants.INVALID_DATA
                }
            };
        }
        if (data.price <= 0) {
            return {
                errors: {
                    price: constants.INVALID_PRICE
                }
            };
        }
        // Categories
        console.log('Categories: ', data.categories);
        // if (!data.categories) {
        //     return {
        //         errors: {
        //             categories: constants.FIELD_REQUIRED
        //         }
        //     };
        // }
        if (Array.isArray(data.categories)) {
            // if (data.categories.length === 0) {
            //     return {
            //         errors: {
            //             categories: constants.FIELD_REQUIRED
            //         }
            //     };
            // }

            for (let categoryId of data.categories) {
                // category type
                if (typeof categoryId !== 'number') {
                    return {
                        errors: {
                            categories: constants.INVALID_ITEM_IN_LIST
                        }
                    };
                }
                // Empty category
                if (!categoryId) {
                    return {
                        errors: {
                            categories: constants.EMPTY_ITEM_IN_LIST
                        }
                    };
                }
                // Verify if temperament exists
                const categoryInDB = await getCategory(categoryId);
                console.log('categoryInDB: ', categoryInDB);

                if (!categoryInDB) {
                    return {
                        errors: {
                            categories: `${categoryId}: ${constants.ITEM_NOT_IN_LIST}`
                        }
                    };
                }
            }
        } else {
            if (data.categories) {
                return `categories: ${constants.INCORRECT_TYPE}`;
            }
        }

        return '';
        // Enable the next 3 lines only for testing purposes
        // return {
        //     validationError: constants.VALIDATION_ERRORS
        // };
    } catch (error) {
        console.log('Validation error: ', error);
        return {
            errors: {
                errors: constants.VALIDATION_ERRORS
            }
        };
    }
}

function isValidDate(value) {
    let date = Date.parse(value);
    if (isNaN(date)) {
        return false;
    }
    else {
        return true;
    }
}

function isValidTime(value) {
    // Regex to check valid
    // time in 24-hour format
    let regex = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)?$/);

    return value && regex.test(value);
}

module.exports = { validateProduct };
