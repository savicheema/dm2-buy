const express = require('express');
const { productController } = require('../../controllers');

const router = express.Router();

router.route('/').post(productController.createProduct);

module.exports = router;
