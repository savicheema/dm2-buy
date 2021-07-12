import { getRecordBySubdomain } from "../../../services/backend/airtable";
import constants from "../../../constants";
import {withSentry} from "@sentry/nextjs";

const { baseId } = constants.airtable;
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
    console.log("GET RECORD", data);
    res.status(200).json(data);
  } catch (err) {
    console.error("GET RECORD ERROR", err);
    res.status(400).json(err);
  }
}

export default withSentry(getRecord);