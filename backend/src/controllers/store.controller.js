const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { Store, Product } = require('../models');
const { success } = require('../utils/responseHandler');
const { pick, pickWithValueOnly } = require('../utils/pick');
const { contentfulService } = require('../services');

const createStore = catchAsync(async (req, res) => {
  const store = new Store({...req.body});
  const data = await store.save();
  res.send(success(data));
});

const getStoreDetails = catchAsync(async (req, res) => {
  const { subdomain } = req.params;
  const data = await Store.findOne({ subdomain });
  res.send(success(data));
});

const getStoreDetailsBySecret = catchAsync(async (req, res) => {
  const { secret } = req.params;
  console.log(secret)
  const data = await contentfulService.getStoreBySecret(secret);
  res.send(success(data));
});

const getStoreProducts = catchAsync(async (req, res) => {
  const { storeId } = req.params;
  const products = await contentfulService.getProductByStoreId(storeId)
  res.send(success(products));
});

const getStoreProductById = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const data = await Product.findOne({ _id: productId }).populate('CustomAttribute');
  res.send(success(data));
});

module.exports = {
  createStore,
  getStoreDetails,
  getStoreProducts,
  getStoreProductById,
  getStoreDetailsBySecret
};
