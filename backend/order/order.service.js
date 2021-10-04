const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const utils = require('../Utils')
const Order = db.Order;
var request = require("request");
const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    getAll,
    getById,
    create,
    update,
    updateOrderPaymentStatus,
    paymentRedirectPage,
    delete: _delete
};


async function getAll() {
    return await Order.find();
}

async function getById(id, res) {
    const order =  await Order.findById(id)

    //Get payment link from Cashfree
    var options = { method: 'POST',
    url: process.env.CASHFREE_GET_ORDER_PAYMENT_LINK_URL,
    headers: 
    {   'cache-control': 'no-cache',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
    formData: {
        "appId":process.env.CASHFREE_APP_ID,
        "secretKey":process.env.CASHFREE_APP_SECRET,
        "orderId":order.id
        }
    };

    request(options, function (error, response, body) {
        if (error)
            throw new Error(error);
        console.log(JSON.parse(body));

        var jsonData = JSON.parse(body);


        var orderResponse = {
            products: order.products,
            order_total: order.order_total,
            buyer: order.buyer,
            createdDate: order.createdDate,
            id: order.id,
            address: order.address,
            payment_status: order.payment_status
        }
        jsonData.order = orderResponse;
        res.json(jsonData)
    });
}

function create(orderParams, res) {
    
    const order = new Order(orderParams);
    console.log(order)
    // save order
    order.save();

    var options = { method: 'POST',
    url: process.env.CASHFREE_ORDER_CREATE_URL,
    headers: 
    {   'cache-control': 'no-cache',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
    formData: {
        "appId":process.env.CASHFREE_APP_ID,
        "secretKey":process.env.CASHFREE_APP_SECRET,
        "orderId":order.id,
        "orderAmount":order.order_total,
        "orderCurrency":"INR",
        "customerEmail":order.buyer.email,
        "customerPhone":order.buyer.phone,
        "customerName":order.buyer.name,
        "returnUrl":process.env.SERVER_BASE_URL+"/order/payment-redirect/"+order.id,
        "notifyUrl":process.env.SERVER_BASE_URL+"/order/update-payment-status/"+order.id
        }
    };

    request(options, function (error, response, body) {
        if (error)
            throw new Error(error);
        console.log(JSON.parse(body).paymentLink);

        var jsonData = JSON.parse(body);
        jsonData.order = order;
        res.json(jsonData)

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

async function updateOrderPaymentStatus(req, res){
    console.log("notify update api called ")
    console.log(req.body)
    if(req.body.txStatus == 'SUCCESS'){
        const order =  await Order.findById(req.params.id)
        order.payment_status = "complete"
        order.save();
        console.log("order status updated " + order.id)
        res.json("")

        utils.sendWhatsappMessage(order)
        utils.sendEmail(order)
        utils.updateProductStockOnAirtable(order)
    }
}




async function paymentRedirectPage(req, res){
    console.log("paymentRedirectPage called ")
    //console.log(req.body)
    console.log("paymentRedirectPage order id ")
    console.log(req.params.id)
    const order =  await Order.findById(req.params.id)

    if(req.body.txStatus == 'SUCCESS'){
        console.log("paymentRedirectPage success")

        order.payment_status = "complete"
        order.save();   
    }

    var redirectUrl = "https://"+order.seller.name+process.env.FRONTENT_BASE_URL+"/order/"+order.id

        res.writeHead(302, { "Location": redirectUrl })
        res.end()

    
}