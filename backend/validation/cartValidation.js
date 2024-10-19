const Joi = require("joi");

const updateCartValidation = (data) => {
  const schema = Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().required(),
          quantity: Joi.number().integer().min(1).required(),
        })
      )
      .required(),
  });
  return schema.validate(data);
};

module.exports = { updateCartValidation };
