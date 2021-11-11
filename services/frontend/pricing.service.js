const getPrice = (cart) => {
  let calculatedPrice = 0;
  let shippingFeeApplied = false;
  let shippingFee = cart.shippingFee;
  const actualShippingFee = cart.shippingFee;
  const shippingFeeCap = Number.isInteger(cart.shippingFeeCap)
    ? cart.shippingFeeCap
    : Number.MAX_SAFE_INTEGER;
  for (const product of cart.products) {
    const productQuantity = product.quantity ? product.quantity : 1;
    calculatedPrice += product.fields.Price * productQuantity;
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
  return {
    productTotalPrice: productTotalPrice,
    total: calculatedPrice,
    shippingFee,
    shippingFeeCap,
    actualShippingFee,
    paymentProcessingFee: processingFee,
    shippingFeeApplied,
  };
};

export { getPrice };
