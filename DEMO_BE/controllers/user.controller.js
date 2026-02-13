const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;

        const exists = await User.findOne({ $or: [{ username }, { email }] });
        if (exists)
            return res.status(400).json({ message: 'User already exists' });

        const hashed = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashed,
            fullName,
        });

        res.status(201).json({ message: 'Register success' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ message: 'User not found' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            return res.status(400).json({ message: 'Wrong password' });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProfile = async (req, res) => {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
};

exports.updateProfile = async (req, res) => {
    const updated = await User.findByIdAndUpdate(
        req.userId,
        req.body,
        { new: true }
    ).select('-password');

    res.json(updated);
};

exports.uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Không có file upload' });
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            { avatar: req.file.filename },
            { new: true }
        );

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};