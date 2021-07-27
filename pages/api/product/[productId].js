import { Sentry } from "../../../services/helper";
import { updateProductStatus } from "../../../services/backend/airtable";
import constants from "../../../constants";

async function updateProduct(req, res) {
  const { productId, status } = req.query;
  const statusRef = constants.product.status[status];
  try {
    if (!statusRef) {
      throw new Error('status value not allowed');
    }
    const response = await updateProductStatus(productId, statusRef);
    res.status(200).json({productId, status: response});
  } catch (err) {
    console.error("GET PRODUCT ERROR", err);
    res.status(400).json({ error: "Error occured!" });
  }
}

export default Sentry.withSentry(updateProduct);
