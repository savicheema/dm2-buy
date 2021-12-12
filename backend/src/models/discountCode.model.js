const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const discountCodeSchema = mongoose.Schema(
  {
    couponCode: { type: String, required: true },
    usagePerCustomer: { type: Number, required: false },
    percentageDiscount: { type: Number, required: true, default: 0 },
    active: { type: Boolean, required: true, default: true },
    store: { type: mongoose.SchemaTypes.ObjectId, ref: 'Store', required: false },
    storeName:{type: String, required: false}

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
discountCodeSchema.plugin(toJSON);

/**
 * @typedef CustomAttribute
 */
const DiscountCode = mongoose.model('DiscountCode', discountCodeSchema);

module.exports = DiscountCode;
