const express = require('express');
const { productController } = require('../../controllers');

const router = express.Router();

router.route('/').post(productController.createProduct);
router.route('/:id').put(productController.updateProduct).get(productController.getProductById)

// custom attribute related apis
router
  .route('/:id/custom-attribute')
  .get(productController.fetchProductCustomAttribute)
  .post(productController.createProductCustomAttribute)
  .put(productController.updateProductCustomAttribute);
router.route('/product-options').get(productController.fetchVariantOptions)

module.exports = router;
