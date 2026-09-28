import Joi from "joi";

const credentials = {
  username: Joi.string().trim().required(),
  password: Joi.string().min(6).required(),
};

const registerSchema = Joi.object(credentials);

const loginSchema = Joi.object(credentials);

export { registerSchema, loginSchema };