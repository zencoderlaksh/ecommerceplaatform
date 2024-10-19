const Joi = require("joi");

const createOrderValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().required(),
          quantity: Joi.number().integer().min(1).required(),
        })
      )
      .required(),
    totalPrice: Joi.number().positive().required(),
    shippingAddress: Joi.string().required(),
    paymentMethod: Joi.string()
      .valid("Credit Card", "Debit Card", "Paypal")
      .required(),
  });
  return schema.validate(data);
};

module.exports = { createOrderValidation };
