const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Chỉ cho upload ảnh
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ cho phép upload ảnh'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload;
