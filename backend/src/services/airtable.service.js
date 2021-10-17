const request = require('request');
const config = require('../config/config');

function updateProductStock(order){
  request(`https://${order.seller.name}${config.baseUrl.frontend}/api/product/${order.products[0].id}?status=sold-out`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
  });
}

module.exports = {
  updateProductStock,
}
