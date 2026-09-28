const { registerSchema, loginSchema } = require('../validators/authValidator');
const authService = require('../services/authService');

const ok = (res, status, message, data) =>
    res.status(status).json({ success: true, message, data });

const fail = (res, status, message, error) =>
    res.status(status).json({ success: false, message, ...(error && { error }) });

const register = async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) return fail(res, 400, 'Validation failed', error.details[0].message);

        const user = await authService.registerUser(value.username, value.password);
        return ok(res, 201, 'User registered successfully', user);
    } catch (err) {
        return fail(res, err.status || 500, err.status ? err.message : 'Internal server error');
    }
};

const login = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) return fail(res, 400, 'Validation failed', error.details[0].message);

        const token = await authService.loginUser(value.username, value.password);
        return ok(res, 200, 'Login successful', { token });
    } catch (err) {
        return fail(res, err.status || 500, err.status ? err.message : 'Internal server error');
    }
};

module.exports = { register, login };