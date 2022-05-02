const contentful = require('contentful');

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
        } else if (referenceArray && incomingData[prop] instanceof Object && Array.isArray(incomingData[prop]) && incomingData[prop][0].sys.type === 'Asset') {
            structuredObject[prop] = [];
            incomingData[prop].forEach(asset => {
                let extractedData = findFromReference(referenceArray.Asset, asset.sys.id);
                structuredObject[prop].push(extractedData);
            });
        } else if (referenceArray && incomingData[prop] instanceof Object && Array.isArray(incomingData[prop]) && incomingData[prop][0].sys.type === 'Entry') {
            structuredObject[prop] = [];
            incomingData[prop].forEach(entry => {
                let extractedData = findFromReference(referenceArray.Entry, entry.sys.id);
                structuredObject[prop].push(extractedData);
            });
        } else if (referenceArray && incomingData[prop] instanceof Object && incomingData[prop].sys && incomingData[prop].sys.type === 'Asset') {
            let extractedData = findFromReference(referenceArray.Asset, incomingData[prop].sys.id);
            structuredObject[prop] = extractedData;
        } else if (incomingData[prop] instanceof Object && incomingData[prop].fields) {
            structuredObject[prop] = incomingData[prop].fields;
            structuredObject[prop].id = incomingData[prop].sys.id;
        } else if ( referenceArray && incomingData[prop] instanceof Object && incomingData[prop].sys) {
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
            .getEntries({ content_type: 'product', 'fields.store.sys.id': storeId, limit: 200 })
            .then(entry => {
                let sanitizedData = [];
                if (entry && entry.items && entry.items.length) {
                    //console.log(entry.items[0])
                    entry.items.forEach(product => {
                        // console.log("<-------product------>")
                        // console.log(product)
                        // console.log(product.fields.otherPhotos)
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
            .then(entry => {
                if (entry && entry.fields) {
                    let sanitizedData = responseSanitizer(entry.fields, entry.includes);
                    sanitizedData.id = entry.sys.id;
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

function getStoreById(storeId) {
    return new Promise((resolve, reject) => {
        client
            .getEntry(storeId)
            .then(entry => {
                if (entry && entry.fields) {
                    let sanitizedData = responseSanitizer(entry.fields, entry.includes);
                    sanitizedData.id = entry.sys.id;
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

function getStoreBySecret(secret) {
    console.log(secret)

    return new Promise((resolve, reject) => {
        client
        .getEntries({ content_type: 'store', 'fields.secretCode': secret })
        .then(entry => {
            console.log(entry)
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


function getStoreByPhone(phone) {
    console.log("get store by " + phone)

    return new Promise((resolve, reject) => {
        client
        .getEntries({ content_type: 'store', 
        'fields.contactInfo.sys.contentType.sys.id': 'storeContact',
        'fields.contactInfo.fields.contact': phone })
        .then(entry => {
            console.log(entry)
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

async function getCustomDomain(subdomain) {
    return new Promise((resolve, reject) => {
        client
        .getEntries({ content_type: 'routingInfo', 'fields.subdomain': subdomain })
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


async function getVariantOptions(){
    return new Promise((resolve, reject) =>{
        client
        .getEntries({ content_type: 'productVariants' })
            .then(entry => {
                let sanitizedData = [];
                if (entry && entry.items && entry.items.length) {
                    entry.items.forEach(productOption => {
                        console.log(productOption)
                        let productOptionData = responseSanitizer(productOption.fields, entry.includes);
                        sanitizedData.push(productOptionData);
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

module.exports = {
  getRecordBySubdomain,
  getProductByStoreId,
  getProductById,
  getStoreById,
  getCustomDomain,
  getStoreBySecret,
  getVariantOptions,
  getStoreByPhone
};
