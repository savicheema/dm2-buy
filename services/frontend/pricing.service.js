import constants from "../../constants";

const getPrice = (cart) => {
  let calculatedPrice = 0;
  for (const product of cart) {
    calculatedPrice += product.fields.Price;
  }
  const productTotalPrice = calculatedPrice;
  calculatedPrice += constants.regularDeliveryFee;
  const processingFee = Number((calculatedPrice * 0.02).toFixed(2));
  calculatedPrice += processingFee;
  return {
    productTotalPrice: productTotalPrice,
    total: calculatedPrice,
    shippingFee: constants.regularDeliveryFee,
    paymentProcessingFee: processingFee,
  }
}

export {
  getPrice,
}