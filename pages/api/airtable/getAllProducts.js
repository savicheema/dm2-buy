import { getRecordBySubdomain } from "../../../services/backend/airtable";
import { Sentry, airtableBaseId as baseId } from "../../../services/helper";

async function getProduct(req, res) {
  const { subdomain } = req.query;
  try {
    const recordMeta = await getRecordBySubdomain(subdomain);
    if (!recordMeta) {
      res.status(400).json({ error: "Store not found!" });
      return;
    }
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/Products?maxRecords=500&sort%5B0%5D%5Bfield%5D=Created+Date&sort%5B0%5D%5Bdirection%5D=desc`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
        },
      }
    );
    const data = await response.json();

    console.log("DATA", JSON.stringify(data));
    res.status(200).json(data);
  } catch (err) {
    console.error("GET PRODUCT ERROR", err);
    res.status(400).json({ error: "Error occured!" });
  }
}

export default Sentry.withSentry(getProduct);
