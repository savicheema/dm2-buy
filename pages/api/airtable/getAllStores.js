import {
    getMarketBySubdomain,
    getStoresByMarket,
  } from "../../../services/backend/airtable";
import { Sentry } from "../../../services/helper";
  
async function getAllStores(req, res) {
    const { subdomain } = req.query;
    try {
        const recordMeta = await getMarketBySubdomain(subdomain);
        if (!recordMeta) {
          res.status(400).json({ error: "Market place not found!" });
          return;
        }

        const data = await getStoresByMarket(recordMeta?.fields?.name);
        res.status(200).json({
            market: recordMeta,
            records: data,
        });
    } catch (err) {
        console.error("GET STORE ERROR", err);
        res.status(400).json({ error: "Error occured!" });
    }
}
  
export default Sentry.withSentry(getAllStores);
  