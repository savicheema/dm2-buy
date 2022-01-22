const catchAsync = require('../utils/catchAsync');
const { Store, Product, CustomAttribute } = require('../models');
const { success } = require('../utils/responseHandler');
const { contentfulManagementService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const product = new Product({ ...req.body });
  const data = await product.save();
  res.send(success(data));
});

const updateProduct = catchAsync(async (req, res) => {
  const data = await contentfulManagementService.updateProductById(req.params.id, { ...req.body });
  res.send(success(data));
});

const fetchProductCustomAttribute = catchAsync(async (req, res) => {
  const data = await Product.findOne({ _id: req.params.id }).populate('CustomAttribute');
  res.send(success(data));
});

const createProductCustomAttribute = catchAsync(async (req, res) => {
  const { id: productId } = req.params;
  const customAttribute = new CustomAttribute({...req.body});
  await customAttribute.save();
  const product = await Product.findOne({ _id: productId });
  if(product) {
    product.customAttributes.push(customAttribute._id);
    await product.save();
  }
  res.send(success(data));
});

const updateProductCustomAttribute = catchAsync(async (req, res) => {
  const data = await Product.findOneAndUpdate({ _id: req.params.id }, { ...req.body });
  res.send(success(data));
});

module.exports = {
  createProduct,
  updateProduct,
  fetchProductCustomAttribute,
  createProductCustomAttribute,
  updateProductCustomAttribute,
};
