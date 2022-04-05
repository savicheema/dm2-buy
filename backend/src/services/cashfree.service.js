const request = require('request');
const config = require('../config/config');
const whatsappService = require('./whatsapp.service');


const callToCashFree = async (order, { cashfree }) => {
  return new Promise((resolve, reject) => {
    let appId, appSecret;
    if (cashfree) {
      appId = cashfree.appId;
      appSecret = cashfree.appSecret;
    } else {
      appId = config.cashfree.appId;
      appSecret = config.cashfree.appSecret;
    }
    const options = {
      method: 'POST',
      url: config.cashfree.orderCreateUrl,
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      },
      formData: {
        appId: appId,
        secretKey: appSecret,
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

    request(options,  (error, response, body) => {
      if (error) reject(error);
      var jsonData = JSON.parse(body);
      jsonData.order = order;
      //whatsappService.initiateMessage(order)
      resolve(jsonData);
    });
  });
};

const createOrder = async (order, { cashfree }) => {
  return await callToCashFree(order, { cashfree });
};

module.exports = {
  createOrder,
};
