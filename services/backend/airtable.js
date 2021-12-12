import Airtable from "airtable";
import { airtableBaseId as baseId, isNumeric } from "../helper";
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
  if (isNumeric(String(quantity))) {
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

async function getAllProducts(storeId) {
  return new Promise((resolve, reject) => {
    let records = [];
    const processPage = (partialRecords, fetchNextPage) => {
      records = [...records, ...partialRecords]
      fetchNextPage()
    }
    // called when all the records have been retrieved
    const processRecords = (err) => {
      if (err) {
        reject(err);
      }
      //process the `records` array and do something with it
      resolve(records)
    }
    base('Products').select({
      view: "Grid view",
      // filterByFormula: `Stores="${storeId}"`,
      sort: [{ field: "Created Date", direction: "desc" }],
    }).eachPage(processPage, processRecords)
  })
}

async function validatePromoCodeFromDB(giftCode, storeName) {
  return new Promise((resolve, reject) => {
    base('DiscountCodes')
    .select({
      view: "Grid view",
      filterByFormula: `{couponCode}="${giftCode}"`,
    }).firstPage((err, records)=> {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        let [record] = records;
        record = {...record, ...record.fields}
        if(record.fields.active) {
          if(record.fields.["store_name (from Store)"].includes(storeName)){
            resolve(record ? record : null);
          } else {
            reject({error: 'gift code not valid for this store'})
          }
        } else {
          reject({error: 'gift code not active'})
        }
      }
    })
  })

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

async function fetchCustomAttributesByProduct(product) {
  const query = {
    view: "Grid view",
  };
  const records = await base("Custom_Attributes").select(query).firstPage();
  return records.filter((record) => {
    const json = record ? record?._rawJson: null;
    console.log({json})
    if (json && json?.fields?.Products &&json?.fields?.Products?.includes(product.id)) {
      return json;
    }
  });
}

function getSubDomain(customDomain) {
  return new Promise((resolve, reject) => {
    base('Stores')
      .select({
        view: 'Grid view',
        filterByFormula: `{custom_domain}="${customDomain}"`,
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
  getAllProducts,
  fetchCustomAttributesByProduct,
  getSubDomain,
  validatePromoCodeFromDB
};
