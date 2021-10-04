const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../user/user.model'),
    Store: require('../store/store.model'),
    Product: require('../product/product.model'),
    Order: require('../order/order.model'),
    Address: require('../address/address.model')

};