const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { Store, Product } = require('../models');
const { success } = require('../utils/responseHandler');
const { pick, pickWithValueOnly } = require('../utils/pick');

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

const getStoreProducts = catchAsync(async (req, res) => {
  const { subdomain } = req.params;
  const store = await Store.findOne({ subdomain });

  if (!store) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Store not found!');
  }

  const filter = pickWithValueOnly(req.query, ['name', 'status', 'isCountable']);
  const options = pick(req.query, ['_sort', '_order', 'limit', 'page']);

  if (options._sort) {
    options.sort = { [options._sort]: options._order === 'ASC' ? 1 : -1 };
    delete options._sort;
    delete options._order;
  } else {
    options.sort = { _id: -1 };
  }

  options.populate = 'customAttributes';

  const caseInsensitiveFilter = { store: store._id };

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(filter)) {
    caseInsensitiveFilter[key] = {
      // eslint-disable-next-line security/detect-non-literal-regexp
      $regex: new RegExp(value, 'i'),
    };
  }

  const result = await Product.paginate(caseInsensitiveFilter, options);
  result.docs = result.docs.map((doc) => {
    doc._doc.id = doc._doc._id;
    delete doc._doc._id;
    return { ...doc._doc };
  });
  res.send(
    success({
      message: 'Products list',
      ...result,
    })
  );
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
};
