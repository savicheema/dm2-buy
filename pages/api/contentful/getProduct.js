import {
  getRecordBySubdomain,
  fetchCustomAttributesByProduct,
  getProductById
} from "../../../services/backend/contentful";
import { Sentry, airtableBaseId as baseId } from "../../../services/helper";

async function getProduct(req, res) {
  const { product, subdomain } = req.query;
  try {
    const recordMeta = await getProductById(product);
    if (!recordMeta) {
      res.status(400).json({ error: "Product not found!" });
      return;
    }
    // if (!recordMeta.fields.Products.includes(product)) {
    //   res.status(400).json({ error: "Product not found!" });
    //   return;
    // }
    // const response = await fetch(
    //   `https://api.airtable.com/v0/${baseId}/Products/${product}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
    //     },
    //   }
    // );
    // const data = await response.json();
    // const customAttributes = await fetchCustomAttributesByProduct(data);
    // data.store = recordMeta;
    // data.customAttributes = customAttributes;
    res.status(200).json(recordMeta);
  } catch (err) {
    console.error("GET PRODUCT ERROR", err);
    res.status(400).json({ error: "Error occured!" });
  }
}

export default Sentry.withSentry(getProduct);
