const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const customAttributeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    required: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
customAttributeSchema.plugin(toJSON);

/**
 * @typedef CustomAttribute
 */
const customAttribute = mongoose.model('CustomAttribute', customAttributeSchema);

module.exports = customAttribute;
