const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const orderSchema = mongoose.Schema(
  {
    order_shipping: { type: Number, required: true },
    payment_processing_fee: { type: Number, required: true },
    order_total: { type: Number, required: true },
    buyer: { type: mongoose.Schema.Types.Object, ref: 'User' },
    seller: { type: mongoose.Schema.Types.Object, ref: 'Store', required: true },
    createdDate: { type: Date, default: Date.now },
    userId: { type: String },
    products: [{ type: mongoose.Schema.Types.Object, ref: 'Product' }],
    address: { type: mongoose.Schema.Types.Object, ref: 'Address' },
    payment_status: { type: String, required: true, default: 'payment_pending' },
    payment_mode: { type: String, required: true, default: 'online' },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
