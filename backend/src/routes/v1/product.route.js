const express = require('express');
const { productController } = require('../../controllers');

const router = express.Router();

router.route('/').post(productController.createProduct);
router.route('/:id').put(productController.updateProduct);

// custom attribute related apis
router
  .route('/:id/custom-attribute')
  .get(productController.fetchProductCustomAttribute)
  .post(productController.createProductCustomAttribute)
  .put(productController.updateProductCustomAttribute);

module.exports = router;
