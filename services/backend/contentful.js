import * as contentful from 'contentful';

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "vidnutv0ls36",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "CyBWrbE1Tme1ScAleXkwjfcnemvU2WtUQ6RRi0_YfbE"
});

function findFromReference(referenceArray, id) {
    let data;
    referenceArray.forEach(entry => {
        if (entry.sys.id === id) {
            data = entry.fields;
        }
    });
    return data;
}

function responseSanitizer(incomingData, referenceArray) {
    let structuredObject = {};
    for (let prop in incomingData) {
        if (incomingData[prop] instanceof Object && Array.isArray(incomingData[prop]) && typeof incomingData[prop][0] === 'string') {
            structuredObject[prop] = incomingData[prop];
        } else if (incomingData[prop] instanceof Object && Array.isArray(incomingData[prop]) && incomingData[prop][0].sys.type === 'Asset') {
            structuredObject[prop] = [];
            incomingData[prop].forEach(asset => {
                let extractedData = findFromReference(referenceArray.Asset, asset.sys.id);
                structuredObject[prop].push(extractedData);
            });
        } else if (incomingData[prop] instanceof Object && Array.isArray(incomingData[prop]) && incomingData[prop][0].sys.type === 'Entry') {
            structuredObject[prop] = [];
            incomingData[prop].forEach(entry => {
                let extractedData = findFromReference(referenceArray.Entry, entry.sys.id);
                structuredObject[prop].push(extractedData);
            });
        } else if (incomingData[prop] instanceof Object && incomingData[prop].sys && incomingData[prop].sys.type && incomingData[prop].sys.type === 'Asset') {
            let extractedData = findFromReference(referenceArray.Asset, incomingData[prop].sys.id);
            structuredObject[prop] = extractedData;
        } else if (incomingData[prop] instanceof Object && incomingData[prop].fields) {
            structuredObject[prop] = incomingData[prop].fields;
        } else if (incomingData[prop] instanceof Object && incomingData[prop].sys && incomingData[prop].sys.id) {
            let extractedData = findFromReference(referenceArray.Entry, incomingData[prop].sys.id);
            structuredObject[prop] = extractedData;
        } else {
            structuredObject[prop] = incomingData[prop];
        }
    }
    return structuredObject;
}

function getProductByStoreId(storeId) {
    return new Promise((resolve, reject) => {
        client
            .getEntries({ content_type: 'product', 'fields.store.sys.id': storeId })
            .then(entry => {
                let sanitizedData = [];
                if (entry && entry.items && entry.items.length) {
                    entry.items.forEach(product => {
                        let productData = responseSanitizer(product.fields, entry.includes);
                        productData.id = product.sys.id;
                        sanitizedData.push(productData);
                    })
                    resolve(sanitizedData);
                } else {
                    reject();
                }
            })
            .catch(err => {
                console.log('contentful err: ', err);
                reject(err);
            });
    });
}

function getProductById(productId) {
    return new Promise((resolve, reject) => {
        client
            .getEntry(productId)
            .then(async (entry) => {
                if (entry && entry.fields) {
                    let sanitizedData = entry.fields;
                    sanitizedData.id = entry.sys.id;
                    sanitizedData.store.fields = await getStoreById(sanitizedData.store.sys.id);
                    sanitizedData.store.fields.id = sanitizedData.store.sys.id;
                    resolve(sanitizedData);
                } else {
                    reject();
                }
            })
            .catch(err => {
                console.log('contentful err: ', err);
                reject(err);
            });
    });
}

function getStoreById(id) {
    return new Promise((resolve, reject) => {
        client
            .getEntries({ content_type: 'store', 'sys.id': id })
            .then(entry => {
                if (entry && entry.items && entry.items.length) {
                    let sanitizedData = responseSanitizer(entry.items[0].fields, entry.includes);
                    sanitizedData.id = entry.items[0].sys.id;
                    resolve(sanitizedData);
                } else {
                    reject();
                }
            })
            .catch(err => {
                console.log('contentful err: ', err);
                reject(err);
            });
    });
}

function getRecordBySubdomain(subdomain) {
    return new Promise((resolve, reject) => {
        client
            .getEntries({ content_type: 'store', 'fields.subdomain': subdomain })
            .then(entry => {
                if (entry && entry.items && entry.items.length) {
                    let sanitizedData = responseSanitizer(entry.items[0].fields, entry.includes);
                    sanitizedData.id = entry.items[0].sys.id;
                    resolve(sanitizedData);
                } else {
                    reject();
                }
            })
            .catch(err => {
                console.log('contentful err: ', err);
                reject(err);
            });
    });
}

function getSubDomain(customDomain) {
    return new Promise((resolve, reject) => {
        client
        .getEntries({ content_type: 'routingInfo', 'fields.customDomain': customDomain })
        .then(entry => {
            if (entry && entry.items && entry.items.length) {
                let sanitizedData = entry.items[0].fields;
                resolve(sanitizedData);
            } else {
                reject();
            }
        })
        .catch(err => {
            console.log('contentful err: ', err);
            reject(err);
        });
    });
}

function getProductListById(productIds) {
    return new Promise((resolve, reject) => {
        client
            .getEntries({ content_type: 'product', 'sys.id[in]': productIds })
            .then(entry => {
                let sanitizedData = [];
                if (entry && entry.items && entry.items.length) {
                    entry.items.forEach(product => {
                        let productData = responseSanitizer(product.fields, entry.includes);
                        productData.id = product.sys.id;
                        sanitizedData.push(productData);
                    })
                    resolve(sanitizedData);
                } else {
                    reject();
                }
            })
            .catch(err => {
                console.log('contentful err: ', err);
                reject(err);
            });
    });
}

export {
  getRecordBySubdomain,
  getProductByStoreId,
  getProductById,
  getSubDomain,
  getProductListById
};
