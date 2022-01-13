const request = require('request');
const config = require('../config/config');
const { Order } = require("../models");
const whatsappService = require('./whatsapp.service');
const emailService = require('./email.service');
const airtableService = require('./airtable.service');
const contentfulService = require('./contentful.service');


async function getAll() {
  return Order.find();
}

async function getById(id, res) {
  const order = await Order.findById(id);

  let store;
  if (order && order.store_id) {
    store = await contentfulService.getStoreById(order.store_id);
  }

  const options = {
    method: 'POST',
    url: config.cashfree.getOrderPaymentLinkUrl,
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    },
    formData: {
      appId: store 
        && store.paymentInfo 
        && store.paymentInfo.paymentGatewayAppId
          ? store.paymentInfo.paymentGatewayAppId
          : config.cashfree.appId,
      secretKey: store 
        && store.paymentInfo
        && store.paymentInfo.paymentGatewayAppSecret
          ? store.paymentInfo.paymentGatewayAppSecret 
          : config.cashfree.appSecret,
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
      address: order.shipping_address,
      payment_status: order.payment_status,
    };
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
    const productList = order.products;
    productList.forEach(product => {
      airtableService.updateProductStatus({ productId: product.id, quantity: product.quantity });
    });
    airtableService.updateCouponStatus({couponId: order.discountCode.id, couponCode: order.discountCode.couponCode})
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
  order.seller = await contentfulService.getStoreById(order.store_id);
  if (req.body.txStatus == 'SUCCESS') {
    console.log('paymentRedirectPage success');
    order.payment_status = 'complete';
    order.save();
  }

  let customDomain = await contentfulService.getCustomDomain(order.seller.subdomain);
  if (customDomain && customDomain.customDomainEnabled) {
    customDomain = customDomain.customDomain;
  }

  const redirectUrl = 'https://' + (customDomain && customDomain.customDomainEnabled ? customDomain : (order.seller.subdomain + config.baseUrl.frontend)) + '/order/' + order.id;

  res.writeHead(302, { Location: redirectUrl });
  res.end();
}

module.exports = {
  getAll,
  getById,
  update,
  updateOrderPaymentStatus,
  paymentRedirectPage,
  delete: _delete,
};
