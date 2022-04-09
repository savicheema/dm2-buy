import { getCollectionByIds } from "../../../services/backend/airtable";
import { Sentry, airtableBaseId as baseId  } from "../../../services/helper";

async function getCollections(req, res) {
  try {
    const recordMeta = await getCollectionByIds(req.query.collectionIds);
    if (!recordMeta) {
      res.status(400).json({ error: "Collections not found!" });
      return;
    }

    res.status(200).json(recordMeta);
  } catch (err) {
    res.status(400).json({error: err});
  }
}

export default Sentry.withSentry(getCollections);
