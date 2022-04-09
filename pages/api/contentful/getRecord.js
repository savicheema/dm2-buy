import { getRecordBySubdomain, getProductByStoreId, getSectionByIds } from "../../../services/backend/contentful";
import { Sentry, airtableBaseId as baseId  } from "../../../services/helper";

async function getRecord(req, res) {
  try {
    let recordMeta = await getRecordBySubdomain(req.query.subdomain);
    if (!recordMeta) {
      res.status(400).json({ error: "Store not found!" });
      return;
    }

    const productData = await getProductByStoreId(recordMeta.id);
    recordMeta.Products = productData;

    if (recordMeta?.homePage?.sections?.length) {
      const ids = recordMeta?.homePage?.sections?.map(sectionData => sectionData.sys.id);
      const sections = await getSectionByIds(ids);

      if (sections) {
        recordMeta.homePage.sections = sections;
      }
    }

    res.status(200).json(recordMeta);
  } catch (err) {
    res.status(400).json({error: err});
  }
}

export default Sentry.withSentry(getRecord);
