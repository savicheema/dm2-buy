import { Sentry } from "../../../services/helper";
import { getProduct, updateProductStatus } from "../../../services/backend/airtable";
import constants from "../../../constants";

async function updateProduct(req, res) {
  const { productId, status, quantity } = req.query;
  const statusRef = constants.product.status[status];
  try {
    if (!statusRef) {
      throw new Error('status value not allowed');
    }
    const productDetails = await getProduct(productId);
    let count;
    if (productDetails.product_count) {
      count = parseInt(productDetails.product_count) - parseInt(quantity);
    }
    const response = await updateProductStatus({ productId, status: statusRef, quantity: count });
    res.status(200).json({productId, status: response});
  } catch (err) {
    console.error("GET PRODUCT ERROR", err);
    res.status(400).json({ error: "Error occured!" });
  }
}

export default Sentry.withSentry(updateProduct);
