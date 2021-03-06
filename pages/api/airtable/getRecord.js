import { getRecordBySubdomain } from "../../../services/backend/airtable";
import { Sentry, airtableBaseId as baseId  } from "../../../services/helper"

async function getRecord(req, res) {
  try {
    const recordMeta = await getRecordBySubdomain(req.query.subdomain);
    if (!recordMeta) {
      res.status(400).json({ error: "Store not found!" });
      return;
    }
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/Stores/${recordMeta.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({error: err});
  }
}

export default Sentry.withSentry(getRecord);
