const request = require('request');
const config = require('../config/config');
const colorMap = require('../utils/ColorCodes');
const { sendEmailAlert } = require('./emailAlert.service');

function sendMessage(order) {
  console.log('sending whatsapp message' + order);

  const totalWithShipping = order.order_total;
  const paymentProcessingFee = order.payment_processing_fee;
  const totalMinusPaymentProcessingFee = Number(totalWithShipping) - Number(paymentProcessingFee);
  const discountCode = order.discountCode ? ("(🎁 *"+ order.discountCode.couponCode + "*)") : "";

  let message = order.buyer && order.buyer.instagram
    ? `Hello ${order.seller.name},

    You have received a new order for ₹ ${totalMinusPaymentProcessingFee} ${discountCode} 🙌

    *Order Details*
    ${order.products
      .map((product) => {
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
      })
      .join('\n')}

    *Customer Details*
    ${order.buyer.name}
    ${order.address.complete_address || order.address.address_line_1}
    ${order.address.city}, ${order.address.state} ${order.address.pincode}
    PH. +91 ${order.buyer.phone}
    IG. @${order.buyer.instagram}
    Email: ${order.buyer.email}

    Thank you and Happy Selling,
    dm2buy crew 😇`
    : `Hello ${order.seller.name},

    You have received a new order for ₹ ${totalMinusPaymentProcessingFee} ${discountCode} 🙌

    *Order Details*
    ${order.products
      .map((product) => {
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
      })
      .join('\n')}

    *Customer Details*
    ${order.buyer.name}
    ${order.address.complete_address || order.address.address_line_1}
    ${order.address.city}, ${order.address.state} ${order.address.pincode}
    PH. +91 ${order.buyer.phone}
    Email: ${order.buyer.email}

    Thank you and Happy Selling,
    dm2buy crew 😇`;
  console.log(message);
  if (order.seller.phone) {
    var options = {
      method: 'GET',
      url: 'https://gogossip.live/api',
      qs: {
        token: '68080021019114979226247868085e92fd6cbc95e',
        action: 'text',
        from: config.whatsapp.businessPhone,
        country: '91',
        to: order.seller.phone,
        uid: '60f67ad4dd48b',
        text: message,
      },
      headers: { 'cache-control': 'no-cache' },
    };

    request(options, function (error, response, body) {
      if (error) {
        sendEmailAlert(["sgoel19922@gmail.com", "suavelambi@gmail.com"], 'Whatsapp service failed to execute', message);
        throw new Error(error);
      }

      console.log(body);
    });
  }
}

module.exports = {
  sendMessage,
};
