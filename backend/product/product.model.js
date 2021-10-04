const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{type: String, required:true},
    price:{type: String, required:true},
    quantity: {type: Number, required: true, default: 1},
    description:{type: String, required:false},
    image:{type: String, required:false, default: "image"},
    storeId:{type: String, required:false},
    shipping_applicable:{type: Boolean, required: false, default: true}
})

module.exports = mongoose.model('Product', productSchema)