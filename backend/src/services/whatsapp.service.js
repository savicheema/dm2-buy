const request = require('request');
const config = require('../config/config');

function sendMessage(order) {
  console.log('sending whatsapp message' + order);

  const totalWithShipping = order.order_total;
  const paymentProcessingFee = order.payment_processing_fee;
  const totalMinusPaymentProcessingFee = Number(totalWithShipping) - Number(paymentProcessingFee);
var message =  `Hello ${order.seller.name},

You have received a new order for ₹ ${totalMinusPaymentProcessingFee} 🙌

*Order Details*
  ${order.products
    .map((product) => {
      if (product.colour) {
        product.customAttributes.push({ name: 'Colour', value: product.colour });
      }
      const customAttrib =
        product.customAttributes.length > 0
          ? `( _${product.customAttributes.map((ca) => `${ca.name}- ${ca.value}`).join(', ')}_ )`
          : '';
      return `- ${product.name}${customAttrib} x ${product.quantity} - ₹${product.price * Number(product.quantity)}`;
    })
    .join('\n')}

*Customer details*
${order.buyer.name}
${order.address.complete_address || order.address.address_line_1}
${order.address.city}, ${order.address.state} ${order.address.pincode}
PH. +91 ${order.buyer.phone}
Email: ${order.buyer.email}

Thank you and Happy Selling,
dm2buy crew 😇`;
console.log(message)
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
      if (error) throw new Error(error);

      console.log(body);
    });
  }
}

module.exports = {
  sendMessage,
};
