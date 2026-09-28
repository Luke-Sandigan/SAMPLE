const Joi = require('joi');

const credentials = {
    username: Joi.string().trim().required(),
    password: Joi.string().min(6).required(),
};

const registerSchema = Joi.object(credentials);
const loginSchema = Joi.object(credentials);

module.exports = { registerSchema, loginSchema };