const catchAsync = require('../utils/catchAsync');
const { Order } = require('../models');
const { orderService } = require('../services');

const getAll = catchAsync(async (req, res) => {
  const users = await Order.find();
  res.json(users);
});

const getById = catchAsync(async (req, res) => {
  orderService.getById(req.params.id, res)
});

function update(req, res, next) {
  orderService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function addOrder(req, res) {
  if(req.body.order_total == null || isNaN(req.body.order_total))
  {res.json({"error":"order_total is mandatory and must be a number"})
  }else if(req.body.seller == null){
    res.json({"error":"seller is mandatory"})
  }else if(req.body.buyer == null || req.body.buyer.name == null || req.body.buyer.phone == null){
    res.json({"error":"buyer information is not complete. Name and phone is required"})
  }else if(req.body.products == null){
    res.json({"error":"product is mandatory"})
  }else if(req.body.address == null){
    res.json({"error":"address is mandatory"})
  }else {
    var url = orderService.create(req.body, res)
  }
}

function _delete(req, res, next) {
  orderService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
function updateOrderPaymentStatus(req, res, next) {
  orderService.updateOrderPaymentStatus(req, res)
}

function paymentRedirectPage(req, res, next) {
  orderService.paymentRedirectPage(req, res)
}


module.exports = {
  getAll,
  getById,
  update,
  addOrder,
  _delete,
  updateOrderPaymentStatus,
  paymentRedirectPage,
}
