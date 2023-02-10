class ValidationError extends Error {
    constructor(message, errors, statusCode) {
        super(message);
        this.status = statusCode;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ValidationError;
