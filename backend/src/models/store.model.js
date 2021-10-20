const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const storeSchema = mongoose.Schema(
  {
    name: { type: String, unique: true, required: false },
    address: { type: String, required: false },
    paymentMethod: { type: String, required: false },
    createdDate: { type: Date, default: Date.now },
    userId: { type: String },
    store_instagram_handle: { type: String },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    products: [{ type: mongoose.Types.Object, ref: 'Product' }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
storeSchema.plugin(toJSON);

/**
 * @typedef Store
 */
const Product = mongoose.model('Store', storeSchema);

module.exports = Product;
