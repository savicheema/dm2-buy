import Airtable from "airtable";
import { airtableBaseId as baseId } from "../helper";

Airtable.configure({
  apiKey: process.env.AIRTABLE_KEY,
});

const base = Airtable.base(baseId);

function getRecordBySubdomain(subdomain) {
  return new Promise((resolve, reject) => {
    base("Stores")
      .select({
        view: "Grid view",
        filterByFormula: `{subdomain }="${subdomain}"`,
      })
      .firstPage((err, records) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const [record] = records;
          resolve(record ? record._rawJson : null);
        }
      });
  });
}

function updateProductStatus(productId, status) {
  return new Promise((resolve, reject) => {
    base("Products").update(
      productId,
      {
        Status: status,
      },
      (err, record) => {
        if (err) {
          reject(err);
        } else {
          resolve(record.get("Status"));
        }
      }
    );
  });
}

export { base, getRecordBySubdomain, updateProductStatus };
