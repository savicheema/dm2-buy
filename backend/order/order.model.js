const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  order_shipping: { type: Number, required: true },
  payment_processing_fee: { type: Number, required: true },
  order_total: { type: Number, required: true },
  buyer: { type: Schema.Types.Object, ref: "User" },
  seller: { type: Schema.Types.Object, ref: "Store", required: true },
  createdDate: { type: Date, default: Date.now },
  userId: { type: String, required: true },
  products: [{ type: Schema.Types.Object, ref: "Product" }],
  address: { type: Schema.Types.Object, ref: "Address" },
  payment_status: { type: String, required: true, default: "payment_pending" },
  payment_mode: { type: String, required: true, default: "online" },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("Order", schema);
