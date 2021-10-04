const getPrice = (cart) => {
  let calculatedPrice = 0;
  let shippingFee = 0;
  for (const product of cart) {
    const productQuantity = product.quantity ? product.quantity : 1;
    calculatedPrice += product.fields.Price * productQuantity;
    shippingFee = parseInt(product.shippingFee, 10);
  }
  calculatedPrice +=  shippingFee ? shippingFee : 0;
  const productTotalPrice = calculatedPrice;
  const processingFee = Number((calculatedPrice * 0.02).toFixed(2));
  calculatedPrice += processingFee;
  return {
    productTotalPrice: productTotalPrice,
    total: calculatedPrice,
    shippingFee,
    paymentProcessingFee: processingFee,
  }
}

export {
  getPrice,
}