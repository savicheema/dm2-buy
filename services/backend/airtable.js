import Airtable from "airtable";
import { airtableBaseId as baseId } from "../helper";
import constants from "../../constants";

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

function updateProductStatus({ productId, quantity }) {
  const metaToUpdate = {};
  if (quantity) {
    metaToUpdate.product_count = quantity;
    if (quantity < 1) {
      metaToUpdate.Status = constants.product.status["sold-out"];
    }
  }
  return new Promise((resolve, reject) => {
    base("Products").update(productId, metaToUpdate, (err, record) => {
      if (err) {
        reject(err);
      } else {
        resolve(record.get("Status"));
      }
    });
  });
}

async function getProductByStoreId(storeId) {
  const query = {
    view: "Grid view",
    sort: [{ field: "Created Date", direction: "desc" }],
    // ...filterByRelatedTable("Stores", storeId),
  };
  const records = await base("Products").select(query).firstPage();
  return records.map((record) => record?._rawJson);
}

function getProduct(productId) {
  return new Promise((resolve, reject) => {
    base("Products")
      .select({
        view: "Grid view",
        filterByFormula: `SEARCH(RECORD_ID(),"${productId}")`,
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

export {
  base,
  getRecordBySubdomain,
  updateProductStatus,
  getProductByStoreId,
  getProduct,
};
