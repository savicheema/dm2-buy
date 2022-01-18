const express = require('express');
const { storeController } = require('../../controllers');
const { jwtUser } = require('../../middlewares/auth');
const router = express.Router();

router.route('/').post(storeController.createStore);
router.route('/secret/:secret').get(storeController.getStoreDetailsBySecret);
router.route('/:subdomain').get(jwtUser(), storeController.getStoreDetails);
router.route('/:storeId/products').get(storeController.getStoreProducts);
router.route('/:subdomain/products/:productId').get(storeController.getStoreProductById);

module.exports = router;
