const mongoose = require('mongoose');
const { User } = require('../helpers/db');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: false },
    address: { type: String, required: false },
    paymentMethod: { type: String, required: false },
    createdDate: { type: Date, default: Date.now },
    userId: {type: String },
    store_instagram_handle:{type: String},
    phone:{type: String, required: false},
    email:{type: String, required: false},
    products:[{type: Schema.Types.Object, ref: 'Product'}]
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Store', schema);