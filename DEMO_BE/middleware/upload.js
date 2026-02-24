const multer = require('multer');
const path = require('path');
const { UPLOAD_CONFIG } = require('../constants');
const { sendError } = require('../utils/response');
const { HTTP_STATUS } = require('../constants');

// Cấu hình nơi lưu file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_CONFIG.UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Chỉ cho upload ảnh
const fileFilter = (req, file, cb) => {
    if (UPLOAD_CONFIG.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ cho phép upload ảnh (JPEG, PNG, GIF, WebP)'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: UPLOAD_CONFIG.MAX_FILE_SIZE },
});

// Wrapper middleware to catch multer errors and send formatted response
const uploadMiddleware = (fieldName) => (req, res, next) => {
    const single = upload.single(fieldName);
    single(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return sendError(res, HTTP_STATUS.BAD_REQUEST, 'File too large');
            }
            return sendError(res, HTTP_STATUS.BAD_REQUEST, err.message || 'Upload error');
        }
        next();
    });
};

module.exports = uploadMiddleware;
