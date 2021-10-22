const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { Store, Product } = require('../models');
const { success } = require('../utils/responseHandler');
const { pick, pickWithValueOnly } = require('../utils/pick');

const createProduct = catchAsync(async (req, res) => {
  const product = new Product({...req.body});
  const data = await product.save();
  res.send(success(data));
});

module.exports = {
  createProduct,
};
