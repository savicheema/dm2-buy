const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

// name:{type: String, required:true},
// price:{type: String, required:true},
// description:{type: String, required:false},
// image:{type: String, required:false, default: "image"},
// storeId:{type: String, required:false},
// shipping_applicable:{type: Boolean, required: false, default: true}

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    description: { type: String, required: false },
    image: { type: String, required: false, default: 'image' },
    storeId: { type: String, required: false },
    shipping_applicable: { type: Boolean, required: false, default: true },
    customAttributes: { type: Array, required: true, default: [] },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
