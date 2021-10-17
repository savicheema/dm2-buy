const request = require('request');
const config = require('../config/config');
const { Order } = require("../models");
const whatsappService = require('./whatsapp.service');
const emailService = require('./email.service');
const airtableService = require('./airtable.service');


async function getAll() {
  return Order.find();
}

async function getById(id, res) {
  const order = await Order.findById(id);
  const options = {
    method: 'POST',
    url: config.cashfree.getOrderPaymentLinkUrl,
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    },
    formData: {
      appId: config.cashfree.appId,
      secretKey: config.cashfree.appSecret,
      orderId: order.id,
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    const jsonData = JSON.parse(body);

    jsonData.order = {
      products: order.products,
      order_total: order.order_total,
      buyer: order.buyer,
      createdDate: order.createdDate,
      id: order.id,
      address: order.address,
      payment_status: order.payment_status,
    };
    res.json(jsonData);
  });
}

function create(orderParams, res) {
  const order = new Order(orderParams);
  console.log(order);
  // save order
  order.save();

  var options = {
    method: 'POST',
    url: config.cashfree.orderCreateUrl,
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    },
    formData: {
      appId: config.cashfree.appId,
      secretKey: config.cashfree.appSecret,
      orderId: order.id,
      orderAmount: order.order_total,
      orderCurrency: 'INR',
      customerEmail: order.buyer.email,
      customerPhone: order.buyer.phone,
      customerName: order.buyer.name,
      returnUrl: config.baseUrl.server + '/order/payment-redirect/' + order.id,
      notifyUrl: config.baseUrl.server + '/order/update-payment-status/' + order.id,
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(JSON.parse(body).paymentLink);

    var jsonData = JSON.parse(body);
    jsonData.order = order;

    res.json(jsonData);
  });
}

async function update(id, orderParam) {
  const store = await Order.findById(id);
  if (!order) throw 'User not found';
  Object.assign(order, orderParam);
  await order.save();
}

async function _delete(id) {
  await Order.findByIdAndRemove(id);
}

async function updateOrderPaymentStatus(req, res) {
  console.log('notify update api called ');
  console.log(req.body);
  if (req.body.txStatus == 'SUCCESS') {
    const order = await Order.findById(req.params.id);
    order.payment_status = 'complete';
    order.save();
    console.log('order status updated ' + order.id);
    res.json('');

    whatsappService.sendMessage(order);
    emailService.sendEmail(order);
    airtableService.updateProductStock(order);
  }
}

async function paymentRedirectPage(req, res) {
  console.log('paymentRedirectPage called ');
  console.log('paymentRedirectPage order id ');
  console.log(req.params.id);
  const order = await Order.findById(req.params.id);
  if (req.body.txStatus == 'SUCCESS') {
    console.log('paymentRedirectPage success');
    order.payment_status = 'complete';
    order.save();
  }
  const redirectUrl = 'https://' + order.seller.name + config.baseUrl.frontend + '/order/' + order.id;
  res.writeHead(302, { Location: redirectUrl });
  res.end();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateOrderPaymentStatus,
  paymentRedirectPage,
  delete: _delete,
};
