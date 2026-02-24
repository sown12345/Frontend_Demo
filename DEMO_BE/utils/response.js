// Format success response
exports.successResponse = (statusCode, message, data = null) => {
    return {
        status: statusCode,
        message,
        data,
    };
};

// Format error response
exports.errorResponse = (statusCode, message) => {
    return {
        status: statusCode,
        message,
    };
};

// Send success response
exports.sendSuccess = (res, statusCode, message, data = null) => {
    res.status(statusCode).json(exports.successResponse(statusCode, message, data));
};

// Send error response
exports.sendError = (res, statusCode, message) => {
    res.status(statusCode).json(exports.errorResponse(statusCode, message));
};
