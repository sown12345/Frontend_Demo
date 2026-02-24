const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../constants');

module.exports = (req, res, next) => {
    try {
        const auth = req.headers.authorization;

        if (!auth) {
            return sendError(res, HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
        }

        // Extract token từ "Bearer <token>"
        const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth;

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.id;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Token expired');
        }
        return sendError(res, HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.INVALID_TOKEN);
    }
};