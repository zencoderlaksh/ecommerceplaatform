const Joi = require("joi");

const signupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(15).required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    password: Joi.string().min(6).required(),
    city: Joi.string().required(),
    // state: Joi.string().required(),
    address: Joi.string().required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports = { signupValidation, loginValidation };
