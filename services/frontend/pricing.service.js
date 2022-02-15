const getPrice = (cart) => {
  console.log('cart=======: ', cart);
  let calculatedPrice = 0;
  let shippingFeeApplied = false;
  let shippingFee = cart.shippingFee;
  let discountedAmount = cart?.discountedAmount;
  let couponId, couponCode;
  if(discountedAmount) {
    couponId = cart.couponId;
    couponCode = cart.couponCode;
  }
  const actualShippingFee = cart.shippingFee;
  const shippingFeeCap = Number.isInteger(cart.shippingFeeCap)
    ? cart.shippingFeeCap
    : Number.MAX_SAFE_INTEGER;
  for (const product of cart.products) {
    const productQuantity = product.quantity ? product.quantity : 1;
    calculatedPrice += product.fields.Price * productQuantity;
  }

  let priceWithoutFees = calculatedPrice;
  if(discountedAmount){
    calculatedPrice = priceWithoutFees - discountedAmount;
  }

  if (calculatedPrice < shippingFeeCap) {
    calculatedPrice += shippingFee ? shippingFee : 0;
    shippingFeeApplied = true;
  } else {
    shippingFee = 0;
  }

  const productTotalPrice = calculatedPrice;
  const processingFee = Number((calculatedPrice * 0.02).toFixed(2));

  calculatedPrice += processingFee;
  calculatedPrice = calculatedPrice != 0 ? calculatedPrice.toFixed(2) : calculatedPrice;

  return {
    productTotalPrice: productTotalPrice,
    total: calculatedPrice,
    shippingFee,
    shippingFeeCap,
    actualShippingFee,
    paymentProcessingFee: processingFee,
    shippingFeeApplied,
    priceWithoutFees,
    couponId,
    couponCode
  };
};

export { getPrice };
