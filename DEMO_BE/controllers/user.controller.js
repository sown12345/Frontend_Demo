const userService = require('../services/user.service');
const { sendSuccess, sendError } = require('../utils/response');
const { HTTP_STATUS, SUCCESS_MESSAGES } = require('../constants');

exports.register = async (req, res) => {
    try {
        const result = await userService.register(req.body);
        sendSuccess(res, HTTP_STATUS.CREATED, SUCCESS_MESSAGES.REGISTER_SUCCESS);
    } catch (err) {
        const status = err.status || HTTP_STATUS.INTERNAL_ERROR;
        sendError(res, status, err.message);
    }
};

exports.login = async (req, res) => {
    try {
        const result = await userService.login(req.body);
        sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.LOGIN_SUCCESS, result);
    } catch (err) {
        const status = err.status || HTTP_STATUS.INTERNAL_ERROR;
        sendError(res, status, err.message);
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await userService.getProfile(req.userId);
        sendSuccess(res, HTTP_STATUS.OK, 'Get profile success', user);
    } catch (err) {
        const status = err.status || HTTP_STATUS.INTERNAL_ERROR;
        sendError(res, status, err.message);
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await userService.updateProfile(req.userId, req.body);
        sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.UPDATE_SUCCESS, user);
    } catch (err) {
        const status = err.status || HTTP_STATUS.INTERNAL_ERROR;
        sendError(res, status, err.message);
    }
};

exports.uploadAvatar = async (req, res) => {
    try {
        const user = await userService.uploadAvatar(req.userId, req.file?.filename);
        sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.UPLOAD_SUCCESS, user);
    } catch (err) {
        const status = err.status || HTTP_STATUS.INTERNAL_ERROR;
        sendError(res, status, err.message);
    }
};