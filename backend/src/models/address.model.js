const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const addressSchema = new mongoose.Schema({
  complete_address: { type: String, required: true },
  pincode: { type: String, required: true },
  city: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
});

// add plugin that converts mongoose to json
addressSchema.plugin(toJSON);

/**
 * @typedef Address
 */
module.exports = mongoose.model('Address', addressSchema);
