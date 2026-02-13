const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        username: { type: String, unique: true, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },

        fullName: String,
        phone: String,
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
        },
        address: String,

        role: {
            type: String,
            default: 'user',
        },

        avatar: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', schema);
