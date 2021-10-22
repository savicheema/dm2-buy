const express = require('express');
const { storeController } = require('../../controllers');

const router = express.Router();

router.route('/').post(storeController.createStore);
router.route('/:subdomain').get(storeController.getStoreDetails);
router.route('/:subdomain/products').get(storeController.getStoreProducts);
router.route('/:subdomain/products/:productId').get(storeController.getStoreProductById);

module.exports = router;
