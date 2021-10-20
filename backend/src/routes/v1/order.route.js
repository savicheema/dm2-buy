const express = require('express');
const validate = require('../../middlewares/validate');
const commonValidation = require('../../validations/common.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

// router.get('/', getAll);
// router.post('/', addOrder);
// router.get('/:id', getById);
// router.put('/:id', update);
// router.delete('/:id', _delete);
// router.post('/update-payment-status/:id', updateOrderPaymentStatus);
// router.post('/payment-redirect/:id', paymentRedirectPage);

router.route('/').get(orderController.getAll).post(orderController.addOrder);

router.route('/:id').get(orderController.getById).put(orderController.update).delete(orderController._delete);

router.route('/update-payment-status/:id').post(orderController.updateOrderPaymentStatus);

router.route('/payment-redirect/:id').post(orderController.paymentRedirectPage);

module.exports = router;
