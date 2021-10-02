import Airtable from "airtable";
import { airtableBaseId as baseId } from "../helper";

Airtable.configure({
  apiKey: process.env.AIRTABLE_KEY,
});

const base = Airtable.base(baseId);

const filterByRelatedTable = (tableName, recordName) => ({
  filterByFormula: `FIND(", ${recordName}, ", ", " & ARRAYJOIN(${tableName}) & ", ") > 0`,
});

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

async function getProductByStoreId(storeId) {
  const query = {
    view: "Grid view",
    sort: [{ field: "Created Date", direction: "desc" }],
    // ...filterByRelatedTable("Stores", storeId),
  };
  const records = await base("Products").select(query).firstPage();
  return records.map(record => record?._rawJson);
}

export { base, getRecordBySubdomain, updateProductStatus, getProductByStoreId };
