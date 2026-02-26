const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateRegister, validateLogin, validateUpdateProfile } = require('../validators/user.validator');
const { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } = require('../constants');

// REGISTER
exports.register = async (data) => {
    // Validate input
    const validation = validateRegister(data);
    if (!validation.valid) {
        throw {
            status: HTTP_STATUS.BAD_REQUEST,
            message: validation.message
        };
    }

    const { username, email, password, fullName, phone, gender, address } = data;

    // Check if user already exists
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
        throw {
            status: HTTP_STATUS.CONFLICT,
            message: ERROR_MESSAGES.USER_EXIST
        };
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create new user
    const createdUser = await User.create({
        username,
        email,
        password: hashed,
        fullName,
        phone,
        gender,
        address,
    });

    return {
        message: SUCCESS_MESSAGES.REGISTER_SUCCESS,
        user: {
            _id: createdUser._id,
            username: createdUser.username,
            email: createdUser.email,
            fullName: createdUser.fullName,
            phone: createdUser.phone,
            gender: createdUser.gender,
            address: createdUser.address,
            role: createdUser.role,
            avatar: createdUser.avatar,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt,
        },
    };
};

// LOGIN
exports.login = async (data) => {
    // Validate input
    const validation = validateLogin(data);
    if (!validation.valid) {
        throw {
            status: HTTP_STATUS.BAD_REQUEST,
            message: validation.message
        };
    }

    const { username, password } = data;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
        throw {
            status: HTTP_STATUS.BAD_REQUEST,
            message: ERROR_MESSAGES.USER_NOT_FOUND
        };
    }

    // Compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw {
            status: HTTP_STATUS.BAD_REQUEST,
            message: ERROR_MESSAGES.INVALID_PASSWORD
        };
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { token };
};

// GET PROFILE
exports.getProfile = async (userId) => {
    const user = await User.findById(userId).select('-password').lean();
    if (!user) {
        throw {
            status: HTTP_STATUS.NOT_FOUND,
            message: ERROR_MESSAGES.USER_NOT_FOUND
        };
    }
    return user;
};

// UPDATE PROFILE
exports.updateProfile = async (userId, data) => {
    // Validate input
    const validation = validateUpdateProfile(data);
    if (!validation.valid) {
        throw {
            status: HTTP_STATUS.BAD_REQUEST,
            message: validation.message
        };
    }

    // Filter fields to prevent updating sensitive data
    const allowedFields = ['email', 'fullName', 'phone', 'gender', 'address'];
    const updateData = {};

    allowedFields.forEach(field => {
        if (data[field] !== undefined) {
            updateData[field] = data[field];
        }
    });

    const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
        throw {
            status: HTTP_STATUS.NOT_FOUND,
            message: ERROR_MESSAGES.USER_NOT_FOUND
        };
    }

    return user;
};

// UPLOAD AVATAR
exports.uploadAvatar = async (userId, filename) => {
    if (!filename) {
        throw {
            status: HTTP_STATUS.BAD_REQUEST,
            message: ERROR_MESSAGES.NO_FILE_UPLOAD
        };
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { avatar: filename },
        { new: true }
    ).select('-password');

    if (!user) {
        throw {
            status: HTTP_STATUS.NOT_FOUND,
            message: ERROR_MESSAGES.USER_NOT_FOUND
        };
    }

    return user;
};
