const Joi = require("joi");

const createProductValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    category: Joi.string().required(),
    stock: Joi.number().integer().required(),
    imageUrl: Joi.string().uri().required(),
  });
  return schema.validate(data);
};

const updateProductValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().positive(),
    category: Joi.string(),
    stock: Joi.number().integer(),
    imageUrl: Joi.string().uri(),
  });
  return schema.validate(data);
};

module.exports = { createProductValidation, updateProductValidation };
