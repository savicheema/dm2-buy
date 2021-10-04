const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    complete_address:{type: String, required:true},
    pincode:{type: String, required:true},
    city:{type: String, required:false},
    state:{type: String, required:false},
    country:{type: String, required:false},
})

module.exports = mongoose.model('Address', addressSchema)