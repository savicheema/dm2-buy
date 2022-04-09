import {
  getRecordBySubdomain,
  getProductByStoreId,
} from "../../../services/backend/contentful";
import { Sentry } from "../../../services/helper";

async function getAllProducts(req, res) {
  const { subdomain, collection } = req.query;
  try {
    const recordMeta = await getRecordBySubdomain(subdomain);
    if (!recordMeta) {
      res.status(400).json({ error: "Store not found!" });
      return;
    }

    const productData = await getProductByStoreId(recordMeta.id, collection);
    recordMeta.Products = productData;

    res.status(200).json({
      store: recordMeta,
      records: productData,
    });
  } catch (err) {
    console.error("GET PRODUCT ERROR", err);
    res.status(400).json({ error: "Error occured!" });
  }
}

export default Sentry.withSentry(getAllProducts);
