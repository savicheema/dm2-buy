const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const Store = db.Store;
const productController = require('../product/product.controller')
const productService = require('../product/product.service')

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await Store.find();
}

async function getById(id) {
    const store =  await Store.findById(id)
    store.products = await productService.getByStoreId(store.id)
    
    return store
}

async function create(storeParams) {
    
    const store = new Store(storeParams);

    // save user
    await store.save();
}

async function update(id, storeParam) {
    const store = await Store.findById(id);

    // validate
    if (!store) throw 'User not found';
   

    // copy storeParam properties to user
    Object.assign(store, storeParam);

    await store.save();
}

async function _delete(id) {
    await Store.findByIdAndRemove(id);
}