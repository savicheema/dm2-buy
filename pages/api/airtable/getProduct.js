import { getRecordBySubdomain } from "../../../services/backend/airtable";
import { Sentry, airtableBaseId as baseId } from "../../../services/helper";

async function getProduct(req, res) {
  const { product, subdomain } = req.query;
  try {
    const recordMeta = await getRecordBySubdomain(subdomain);
    if (!recordMeta) {
      res.status(400).json({ error: "Store not found!" });
      return;
    }
    if (!recordMeta.fields.Products.includes(product)) {
      res.status(400).json({ error: "Product not found!" });
      return;
    }
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/Products/${product}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("GET PRODUCT ERROR", err);
    res.status(400).json({error: 'Error occured!'});
  }
}

export default Sentry.withSentry(getProduct);
