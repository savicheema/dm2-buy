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

async function getProductByStoreId(storeName) {
  const query = {
    view: "Grid view",
    filterByFormula: `SEARCH("${storeName}", ARRAYJOIN(Stores))`,
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
    try {
      base('DiscountCodes')
      .select({
        view: "Grid view",
        filterByFormula: `{couponCode}="${giftCode}"`,
      }).firstPage((err, records)=> {
        try{
          console.log('validation started')
          if (err) {
            console.log('not found')
            console.error(err);
            reject(err);
          } else {
            console.log('found')
            if(records.length === 0){
              console.log('empty array found');
              throw new Error('invalid code')
            };
            let [record] = records;
            record = {...record._rawJson, ...record._rawJson.fields}
            console.log(typeof (record.active), '<----- typeof')
            if(record.count && parseInt(record.count) > 0) {
              console.log(record.active, '<----- active')
              if(record["store_name (from Store)"].includes(storeName)){
                console.log(record.active, '<----- active resolve')
                resolve(record);
              } else {
                console.log(record.active, '<----- active reject')
                reject(new Error('invalid code'))
              }
            } else {
              reject(new Error('invalid code'))
            }
          }
        } catch(err) {
          console.log('====---->>',err)
          reject(new Error('invalid code'))
        }
      })
    } catch (err) {
      reject(err);
    }
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
