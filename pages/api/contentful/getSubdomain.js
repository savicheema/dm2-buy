import {
    getSubDomain
} from "../../../services/backend/contentful";
import { Sentry } from "../../../services/helper";
  
async function getSubdomain(req, res) {
    const { custom_domain } = req.query;

    try {
      const recordMeta = await getSubDomain(custom_domain);
      if (!recordMeta) {
        res.status(400).json({ error: "Domain not found!" });
        return;
      }

      const data = recordMeta.fields['subdomain '];

      res.status(200).json({
        subdomain: data
      });
    } catch (err) {
      console.error("GET DOMAIN ERROR", err);
      res.status(400).json({ error: "Error occured!" });
    }
}
  
export default Sentry.withSentry(getSubdomain);
  