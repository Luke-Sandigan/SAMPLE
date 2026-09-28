const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const httpError = (status, message) => {
    const err = new Error(message);
    err.status = status;
    return err;
};

const registerUser = async (username, password, role = 'user') => {
    if (User.findByUsername(username)) {
        throw httpError(409, 'Username already taken');
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = User.create({ username, password: hashed, role });
    return User.toPublic(user);
};

const loginUser = async (username, password) => {
    const user = User.findByUsername(username);
    const valid = user && (await bcrypt.compare(password, user.password));
    if (!valid) {
        throw httpError(401, 'Invalid username or password');
    }
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

module.exports = { registerUser, loginUser };