class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;