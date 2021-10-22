const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    headerPhoto: { type: String, required: true },
    otherPhotos: { type: Array, required: true, default: [] },
    store: { type: mongoose.SchemaTypes.ObjectId, ref: 'Store',  required: false },
    status: { type: Boolean, required: true, default: true },
    description: { type: String, required: false },
    quantity: { type: Number, required: true, default: 1 },
    isCountable: { type: Boolean, required: true, default: true },
    collections: { type: Array, required: true, default: [] },
    shipping_applicable: { type: Boolean, required: false, default: true },
    customAttributes: { type: [mongoose.SchemaTypes.ObjectId], ref: 'CustomAttribute', required: false },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
