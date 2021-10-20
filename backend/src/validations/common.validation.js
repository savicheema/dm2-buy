const Joi = require('joi');

const addOrder = {
  body: Joi.object().keys({
    order_total: Joi.number().required(),
    seller: Joi.string().required(),
    buyer: Joi.string().required(),
  }),
};
// personalDetails: Joi.object().keys({
//   name: Joi.string().required(),
//   address: Joi.string().required(),
//   pincode: Joi.string().required(),
// }),

module.exports = {
  addOrder,
}
