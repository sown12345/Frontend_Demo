const { sendError } = require('../utils/response');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../constants');

// Express error handler middleware
module.exports = (err, req, res, next) => {
    // Multer file upload errors may have code property
    if (err.code === 'LIMIT_FILE_SIZE') {
        return sendError(res, HTTP_STATUS.BAD_REQUEST, 'File too large');
    }

    if (err.message && err.message.startsWith('Only')) {
        return sendError(res, HTTP_STATUS.BAD_REQUEST, err.message);
    }

    // If service threw an error object with status/message
    const status = err.status || HTTP_STATUS.INTERNAL_ERROR;
    const message = err.message || ERROR_MESSAGES.SERVER_ERROR;

    return sendError(res, status, message);
};
