const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Product = require('./product.model')
var jwt = require('jsonwebtoken');
const config = require('../config.json');


router.get('/', async(req, res)=> {
    try{
        const products = await Product.find()
        res.json(products)
    }catch(err){
        res.send(err)
    }
})

router.get('/:id', async(req, res)=> {
    try{
        const product = await Product.findById(req.params.id)
        res.json(product)
    }catch(err){
        res.send(err)
    }
})



router.post('/', async(req, res) => {

    var token = req.headers['authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        console.log("user-id " + decoded.sub) 
      });

    try{
        console.log(req.body)
        const product = new Product(req.body)
        const prodResponse = await product.save()
        res.send(prodResponse)
    }catch(err){
        res.send("Error: " + err)
    }
})

module.exports = router