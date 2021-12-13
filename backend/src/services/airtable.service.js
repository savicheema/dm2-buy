const request = require('request');
const Airtable = require('airtable');
const config = require('../config/config');

Airtable.configure({
  apiKey: config.airtable.key,
});

const base = Airtable.base(config.airtable.baseId);

function updateProductStock(order) {
  request(
    `https://${order.seller.name}${config.baseUrl.frontend}/api/product/${order.products[0].id}?status=sold-out`,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(body.url);
      console.log(body.explanation);
    }
  );
}

const filterByRelatedTable = (tableName, recordName) => ({
  filterByFormula: `FIND(", ${recordName}, ", ", " & ARRAYJOIN(${tableName}) & ", ") > 0`,
});

function getRecordBySubdomain(subdomain) {
  return new Promise((resolve, reject) => {
    base('Stores')
      .select({
        view: 'Grid view',
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

function isNumeric(str) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

async function updateProductStatus({ productId, quantity }) {
  const metaToUpdate = {};
  if (isNumeric(String(quantity))) {
    const productData = await getProduct(productId);
    metaToUpdate.product_count = parseInt(productData.fields.product_count) - quantity;
    if (quantity < 1) {
      metaToUpdate.Status = constants.product.status['sold-out'];
    }
  }
  return new Promise((resolve, reject) => {
    base('Products').update(productId, metaToUpdate, (err, record) => {
      if (err) {
        reject(err);
      } else {
        resolve(record.get('Status'));
      }
    });
  });
}

function updateCouponStatus({ couponId, couponCode }) {
  
  return new Promise((resolve, reject) => {
    base("DiscountCodes").update(couponId, {"active":"false"}, (err, record) => {
      if (err) {
        console.log("DiscountCodes -> " + err)
        reject(err);
      } else {
        resolve(record.get("active"));
      }
    });
  });
}

async function getProductByStoreId(storeId) {
  const query = {
    view: 'Grid view',
    sort: [{ field: 'Created Date', direction: 'desc' }],
    // ...filterByRelatedTable("Stores", storeId),
  };
  const records = await base('Products').select(query).firstPage();
  console.log(records)
  return records.map((record) => record._rawJson);
}

async function getAllProducts(storeId) {
  return new Promise((resolve, reject) => {
    let records = [];
    const processPage = (partialRecords, fetchNextPage) => {
      records = [...records, ...partialRecords];
      fetchNextPage();
    };
    // called when all the records have been retrieved
    const processRecords = (err) => {
      if (err) {
        reject(err);
      }
      //process the `records` array and do something with it
      resolve(records);
    };
    base('Products')
      .select({
        view: 'Grid view',
        // filterByFormula: `Stores="${storeId}"`,
        sort: [{ field: 'Created Date', direction: 'desc' }],
      })
      .eachPage(processPage, processRecords);
  });
}

function getProduct(productId) {
  return new Promise((resolve, reject) => {
    base('Products')
      .select({
        view: 'Grid view',
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

function getStoreById(storeId) {
  return new Promise((resolve, reject) => {
    base('Stores')
      .select({
        view: 'Grid view',
        filterByFormula: `SEARCH(RECORD_ID(),"${storeId}")`,
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
    view: 'Grid view',
  };
  const records = await base('Custom_Attributes').select(query).firstPage();
  return records.filter((record) => {
    const json = record ? record._rawJson : null;
    console.log({ json });
    if (json && json.fields.Products && json.fields.Products.includes(product.id)) {
      return json;
    }
  });
}

async function getCustomDomain(subdomain) {
  return new Promise((resolve, reject) => {
    base('Stores')
      .select({
        view: 'Grid view',
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

module.exports = {
  updateProductStock,
  base,
  getRecordBySubdomain,
  updateProductStatus,
  getProductByStoreId,
  getProduct,
  getAllProducts,
  fetchCustomAttributesByProduct,
  getStoreById,
  getCustomDomain,
  updateCouponStatus
};
