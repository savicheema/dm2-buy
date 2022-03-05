const Joi = require('joi');

const productValue = Joi.object().keys({
  customAttributes: Joi.array().required(),
  id: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  colour: Joi.string(),
  size: Joi.string().allow('')
});

const createOrderValidations = {
  body: Joi.object().keys({
    shipping_address: Joi.object().keys({
      complete_address: Joi.string().required(),
      pincode: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    }),
    buyer: Joi.object().keys({
      email: Joi.string().required(),
      name: Joi.string().required(),
      instagram: Joi.string(),
      phone: Joi.string().required(),
    }),
    order_shipping: Joi.number().required(),
    order_total: Joi.number().required(),
    payment_mode: Joi.string().allow(''),
    payment_processing_fee: Joi.number().required(),
    products: Joi.array().items(productValue).required(),
    store_id: Joi.string().required(),
    buyer_id: Joi.string().required(),
    discountCode: Joi.object().keys({
      couponCode: Joi.string(),
      id:Joi.string().required()
    })
  }),
};

module.exports = {
  createOrderValidations,
};
