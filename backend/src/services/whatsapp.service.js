const request = require('request');
const config = require('../config/config');
const colorMap = require('../utils/ColorCodes');
const { sendEmailAlert } = require('./emailAlert.service');


function initiateMessage(order){
  console.log('initiating whatsapp message via Interakt' + order);

  var options = {
    'method': 'POST',
    'url': 'https://api.interakt.ai/v1/public/track/users/',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': process.env.INTERAKT_TOKEN,
      'Cookie': 'ApplicationGatewayAffinity=a8f6ae06c0b3046487ae2c0ab287e175; ApplicationGatewayAffinityCORS=a8f6ae06c0b3046487ae2c0ab287e175'
    },
    body: JSON.stringify({
      "phoneNumber": order.seller.phone,
      "countryCode": "+91",
      "traits": {
        "name": order.seller.name,
        "email": "hello@dm2buy.com"
      }
    })
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log("create user interakt response")
    console.log(response.body);
    sendMessage(order)
  });
  
}


function sendMessage(order) {
  console.log('sending whatsapp message via Interakt' + order);

  const totalWithShipping = order.order_total;
  const paymentProcessingFee = order.payment_processing_fee;
  const totalMinusPaymentProcessingFee = Number(totalWithShipping) - Number(paymentProcessingFee);
  const discountCode = order.discountCode ? ("(🎁 *"+ order.discountCode.couponCode + "*)") : "";
  const amount = `₹ ${totalMinusPaymentProcessingFee} ${discountCode}`
  const productDetails = order.products.map((product) => {
    if (product.colour) {
      product.customAttributes.push({ name: 'Colour', value: colorMap.map.get(product.colour) });
    }
    if (product.size) {
      product.customAttributes.push({ name: 'Size', value: product.size });
    }
    const customAttrib =
      product.customAttributes.length > 0
        ? `( _${product.customAttributes.map((ca) => `${ca.name} - ${ca.value}`).join(' · ')}_ )`
        : '';
    return `- ${product.name}${customAttrib} x ${product.quantity} - ₹${product.price * Number(product.quantity)}`;
  }).join(',  ')

  const instagram =  order.buyer.instagram ?  `IG. @${order.buyer.instagram}` : ``



  console.log(productDetails);
  if (order.seller.phone) {
    var options = {
      'method': 'POST',
      'url': 'https://api.interakt.ai/v1/public/track/events/',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Basic LXo4ckpNWTZhUEJoU0FIaDBtbWVQOU9ZcHRHaGRHdEJPMWRmYWlsQVRlSTo=',
        'Cookie': 'ApplicationGatewayAffinity=a8f6ae06c0b3046487ae2c0ab287e175; ApplicationGatewayAffinityCORS=a8f6ae06c0b3046487ae2c0ab287e175'
      },
      body: JSON.stringify({
        "phoneNumber": order.seller.phone,
        "countryCode": "+91",
        "event": "New Order received by seller",
        "traits": {
          "seller": order.seller.name,
          "productName": productDetails,
          "buyer_name": order.buyer.name,
          "buyer_address": `${order.address.complete_address || order.address.address_line_1}`.replace(/\n/g,', ').replace(/  /g, " "),
          "buyer_city": `${order.address.city}, ${order.address.state}, ${order.address.pincode}`,
          "buyer_phone": `PH. +91 ${order.buyer.phone}`,
          "buyer_insta": instagram,
          "buyer_email":`Email: ${order.buyer.email}`,
          "amount": amount
        }
      })
    
    };

    request(options, function (error, response) {
      if (error) {
        sendEmailAlert(["sgoel19922@gmail.com", "suavelambi@gmail.com"], 'Whatsapp service failed to execute', message);
        throw new Error(error);
      }
      console.log("send message interak response");
      console.log(response);
    });
  }
}

module.exports = {
  sendMessage,
  initiateMessage
};