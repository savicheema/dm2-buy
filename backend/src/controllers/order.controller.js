const catchAsync = require('../utils/catchAsync');
const { Order } = require('../models');
const { orderService, cashfreeService, airtableService } = require('../services');
const { success } = require('../utils/responseHandler');

const getAll = catchAsync(async (req, res) => {
  const users = await Order.find();
  res.json(users);
});

const getById = catchAsync(async (req, res) => {
  orderService.getById(req.params.id, res);
});

function update(req, res, next) {
  orderService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  orderService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
function updateOrderPaymentStatus(req, res, next) {
  orderService.updateOrderPaymentStatus(req, res);
}

function paymentRedirectPage(req, res, next) {
  orderService.paymentRedirectPage(req, res);
}

const createOrder = catchAsync(async (req, res) => {
  let response;
  const { seller_id: storeId } = req.body.seller;
  const order = new Order({ ...req.body });
  await order.save();
  const store = await airtableService.getStoreById(storeId);
  if (store.fields.CASHFREE_APP_ID && store.fields.CASHFREE_APP_SECRET) {
    const cashfree = {
      appId: store.fields.CASHFREE_APP_ID,
      appSecret: store.fields.CASHFREE_APP_SECRET,
    };
    response = await cashfreeService.createOrder(order, { cashfree });
  } else {
    response = await cashfreeService.createOrder(order, {});
  }
  res.send(response);
});

module.exports = {
  createOrder,
  getAll,
  getById,
  update,
  _delete,
  updateOrderPaymentStatus,
  paymentRedirectPage,
};
