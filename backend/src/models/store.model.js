const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');

const storeSchema = mongoose.Schema(
  {
    subdomain: { type: String, required: true, unique: true },
    storeInstagramHandle: { type: String, required: false },
    storeBio: { type: String, required: false },
    storeProfilePhoto: { type: String, required: false },
    dateJoined: { type: Date, default: Date.now },
    shippingFee: { type: Number, default: 0 },
    shippingFeeCap: { type: Number, default: 0 },
    thankYouNote: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    orderConfirmationThankYouMessage: { type: String, required: false },
    thankYouPagePhoto: {type: String, required: false},
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
storeSchema.plugin(toJSON);
storeSchema.plugin(paginate);

/**
 * @typedef Store
 */
const store = mongoose.model('Store', storeSchema);

module.exports = store;
