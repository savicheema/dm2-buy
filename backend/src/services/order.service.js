const request = require('request');
const config = require('../config/config');
const { Order } = require("../models");
const whatsappService = require('./whatsapp.service');
const emailService = require('./email.service');
const airtableService = require('./airtable.service');
const contentfulService = require('./contentful.service');
const googleService = require('./googleSheet.service');
const contentfulManagementService = require('./contentful-management.service');

async function getAll() {
  return Order.find();
}

async function getById(id, res) {
  const order = await Order.findById(id);

  let store;
  if (order && order.seller && order.seller.seller_id) {
    store = await contentfulService.getStoreById(order.seller.seller_id);
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
      address: order.address,
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
  if (req.body.txStatus == 'SUCCESS') {
    const order = await Order.findById(req.params.id);
    const productList = order.products;
    productList.forEach(product => {
      const variant = product.colour || product.size
       ? {
         colour: product.colour || '',
         fit: product.size || ''
       } : false;
      contentfulManagementService.updateProductStatus(product.id, variant, product.quantity);
    });
    if (order.discountCode && order.discountCode.id) {
      contentfulManagementService.updateCouponStatus({couponId: order.discountCode.id})
    }
    order.payment_status = 'complete';
    order.save();
    console.log('order status updated ' + order.id);
    res.json('');

    whatsappService.initiateMessage(order);
    emailService.sendEmail(order);
    googleService.enterOrderInSheet(order);
  }
}

async function paymentRedirectPage(req, res) {
  console.log('paymentRedirectPage called ');
  console.log('paymentRedirectPage order id ');
  console.log(req.params.id);
  const order = await Order.findById(req.params.id);
  const sellerData = await contentfulService.getStoreById(order.seller.seller_id);
  if (req.body.txStatus == 'SUCCESS') {
    console.log('paymentRedirectPage success');
    order.payment_status = 'complete';
    order.save();
  }

  let customDomain = await contentfulService.getCustomDomain(sellerData.subdomain);
  if (customDomain && customDomain.customDomainEnabled) {
    customDomain = customDomain.customDomain;
  }

  const redirectUrl = 'https://' + (customDomain && customDomain.customDomainEnabled ? customDomain : (sellerData.subdomain + config.baseUrl.frontend)) + '/order/' + order.id;

  res.writeHead(302, { Location: redirectUrl });
  res.end();
}

async function updateOrderPaymentStatusForGiftcard(orderId) {
  const order = await Order.findById(orderId);
  const productList = order.products;
  productList.forEach(product => {
    const variant = product.colour || product.size
      ? {
        colour: product.colour || '',
        fit: product.size || ''
      } : false;
    contentfulManagementService.updateProductStatus(product.id, variant, product.quantity);
  });
  if (order.discountCode && order.discountCode.id) {
    contentfulManagementService.updateCouponStatus({couponId: order.discountCode.id})
  }
  order.payment_status = 'complete';
  order.save();

  whatsappService.initiateMessage(order);
  emailService.sendEmail(order);
  googleService.enterOrderInSheet(order);
}


async function exportOrderToSheet (fromDate = null, toDate = null, sheetId, storeName = null) {
  let query = {};

  if (fromDate && toDate && storeName) {
    query = {
      createdDate:{
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      },
      "seller.name": storeName
    };
  } else if (fromDate && toDate) {
    query = {
      createdDate:{
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      }
    };
  } else if (fromDate && storeName) {
    query = {
      createdDate:{
        $gte: new Date(fromDate),
      },
      "seller.name": storeName
    };
  } else if (fromDate) {
    query = {
      createdDate:{
        $gte: new Date(fromDate),
      }
    };
  } else if (storeName) {
    query = {
      "seller.name": storeName
    };
  }

  const result = await Order.find(query).sort({createdDate: -1});
  // console.log("result length order export" + result.length);

  // exportToSheet(result, 0, sheetId);
  
  for(let i = 0; i < result.length; i++){
    await sleep(2000);
    await googleService.enterExportedOrderInSheet(result[i], sheetId);
  }
  
  return true;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function exportToSheet(result, i, sheetId){
  console.log("export...")
  if(i >= result.length) return;
  setTimeout(function() { 
    if(result[i].payment_status == 'complete'){
      googleService.enterExportedOrderInSheet(result[i], sheetId)
      exportToSheet(result, i+1, sheetId)
    }
  }, 2000);
}

module.exports = {
  getAll,
  getById,
  update,
  updateOrderPaymentStatus,
  paymentRedirectPage,
  delete: _delete,
  updateOrderPaymentStatusForGiftcard,
  exportOrderToSheet
};
