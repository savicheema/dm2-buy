import { getRecordBySubdomain, getProductByStoreId } from "../../../services/backend/contentful";
import { Sentry, airtableBaseId as baseId  } from "../../../services/helper";

async function getRecord(req, res) {
  try {
    const recordMeta = await getRecordBySubdomain(req.query.subdomain);
    if (!recordMeta) {
      res.status(400).json({ error: "Store not found!" });
      return;
    }

    const productData = await getProductByStoreId(recordMeta.id);
    recordMeta.Products = productData;

    res.status(200).json(recordMeta);
  } catch (err) {
    res.status(400).json({error: err});
  }
}

export default Sentry.withSentry(getRecord);
