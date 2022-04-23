const catchAsync = require('../utils/catchAsync');
const { Order } = require('../models');
const { orderService, cashfreeService, airtableService, contentfulService } = require('../services');
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

  if (req.body.discountCode && req.body.discountCode.id) {
    if (order && order['_doc']) {
      orderService.updateOrderPaymentStatusForGiftcard(order['_doc']._id);
      res.send({status: 'OK', payment: 'completed', ...order['_doc'] });
      return;
    }
  }

  const store = await contentfulService.getStoreById(storeId);
  if (store && store.paymentInfo && store.paymentInfo.paymentGatewayAppId && store.paymentInfo.paymentGatewayAppSecret) {
    const cashfree = {
      appId: store.paymentInfo.paymentGatewayAppId,
      appSecret: store.paymentInfo.paymentGatewayAppSecret,
    };
    response = await cashfreeService.createOrder(order, { cashfree });
  } else {
    response = await cashfreeService.createOrder(order, {});
  }
  res.send(response);
});


const exportOrderToSheet = catchAsync( async (req, res) => {
  let response = await orderService.exportOrderToSheet(req.body.dateFrom, req.body.sheetId)
  res.send(response)
})

module.exports = {
  createOrder,
  getAll,
  getById,
  update,
  _delete,
  updateOrderPaymentStatus,
  paymentRedirectPage,
  exportOrderToSheet
};
