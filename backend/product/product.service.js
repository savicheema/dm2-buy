const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const Store = db.Store;
const Product = db.Product


async function getByStoreId(storeId) {
    const productList =  await Product.find({'storeId':storeId})
    return productList
}

module.exports = {
    getByStoreId
};