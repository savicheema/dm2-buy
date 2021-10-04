const express = require('express');
const router = express.Router();
const orderService = require('./order.service');
var jwt = require('jsonwebtoken');


router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.post('/', addOrder);
router.delete('/:id', _delete);
router.post('/update-payment-status/:id', updateOrderPaymentStatus);
router.post('/payment-redirect/:id', paymentRedirectPage);


module.exports = router;

/**
 * Create a new order in MongoDb and return along with Payment link for the order
*/
function addOrder(req, res, next) {
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

function getAll(req, res, next) {
    orderService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}


function getById(req, res, next) {
    orderService.getById(req.params.id, res)
}

function updateOrderPaymentStatus(req, res, next) {
    orderService.updateOrderPaymentStatus(req, res)
}

function paymentRedirectPage(req, res, next) {
    orderService.paymentRedirectPage(req, res)
}

function update(req, res, next) {
    orderService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    orderService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}