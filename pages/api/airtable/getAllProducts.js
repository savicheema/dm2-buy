import {
  getRecordBySubdomain,
  getProductByStoreId,
} from "../../../services/backend/airtable";
import { Sentry } from "../../../services/helper";

async function getAllProducts(req, res) {
  const { subdomain } = req.query;
  try {
    const recordMeta = await getRecordBySubdomain(subdomain);
    if (!recordMeta) {
      res.status(400).json({ error: "Store not found!" });
      return;
    }
    const data = await getProductByStoreId(recordMeta.id);
    res.status(200).json({
      records: data,
    });
  } catch (err) {
    console.error("GET PRODUCT ERROR", err);
    res.status(400).json({ error: "Error occured!" });
  }
}

export default Sentry.withSentry(getAllProducts);
