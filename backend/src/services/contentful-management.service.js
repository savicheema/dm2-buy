const contentfulManagement = require('contentful-management');
const { util } = require('prettier');
const convertToSlug = require('../utils/utils')
const client = contentfulManagement.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "vidnutv0ls36",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "CFPAT-N2xxF9WUPucWikke_jFaYYC75So1KWXC-i9_Lo5_dR8"
});

function updateProductById(id, product) {
    console.log(product)
    console.log(id)
    return new Promise((resolve, reject) => {
        console.log(client)
        client.getSpace('vidnutv0ls36')
            .then((space) => space.getEnvironment("master"))
            .then((environment) => environment.getEntry(id))
            .then(entry => {
                if(product.name)
                    entry.fields.name['en-US'] = product.name
                if(product.price)
                    entry.fields.price['en-US'] = product.price
                resolve(entry.update())
            })
            .catch(err => {
                console.log('contentful err: ', err);
                reject(err);
            });
    });
}

async function createProduct(product){
    console.log(product)
    var assetHeaderImageObj = {}
    if(product.headerPhoto){
        let assetRes = await new Promise((resolve, reject) => {
            client.getSpace('vidnutv0ls36')
            .then((space) => space.getEnvironment("master"))
            .then((environment)=> environment.createAsset({
                fields: {
                    title: {
                    'en-US': convertToSlug.convertToSlug(product.name)+"-header"
                    },
                    description: {
                    'en-US': product.name
                    },
                    file: {
                    'en-US': {
                        contentType: 'image/jpeg',
                        fileName: 'example.jpeg',
                        upload: product.headerPhoto
                    }
                    }
                }
            }))
            .then((asset) => asset.processForAllLocales())
            .then((asset) => asset.publish())
            .then((asset) => resolve(asset))
            .catch(error => reject(error))
        });
        assetHeaderImageObj = {
            sys:{
                "type": "Link",
                "linkType": "Asset",
                "id": assetRes.sys.id
            }
        }
    }

    let assetArray = [];
    if(product.otherPhotos){
        for (let index = 0; index < product.otherPhotos.length; index++) {
            const element = product.otherPhotos[index];
            let assetRes = await new Promise((resolve, reject) => {
                client.getSpace('vidnutv0ls36')
                .then((space) => space.getEnvironment("master"))
                .then((environment)=> environment.createAsset({
                    fields: {
                        title: {
                        'en-US': product.name
                        },
                        description: {
                        'en-US': product.name
                        },
                        file: {
                        'en-US': {
                            contentType: 'image/jpeg',
                            fileName: 'example.jpeg',
                            upload: element
                        }
                        }
                    }
                }))
                .then((asset) => asset.processForAllLocales())
                .then((asset) => {
                    console.log(asset)
                    resolve(asset)
                }).catch(error => reject(error))
            });

            var assetObj = {
                sys:{
                    "type": "Link",
                    "linkType": "Asset",
                    "id": assetRes.sys.id
                }
            }
            assetArray.push(assetObj)   
        }
    }


    // create product on contentful
    return new Promise((resolve, reject) => {
        console.log("start asset array.................")
        console.log(assetArray)
        console.log("end asset array.................")
        console.log(new Date().toISOString())

        client.getSpace('vidnutv0ls36')
        .then((space) => space.getEnvironment("master"))
        .then((environment) => environment.createEntry('product',{
            fields: {
                name: {
                    'en-US': product.name
                },
                slug:{
                    'en-US': convertToSlug.convertToSlug(product.name)
                },
                createdDate:{
                    'en-US': new Date().toISOString()
                },
                price: {
                    'en-US': product.price
                },
                store: {
                    'en-US': {
                        sys: {type: "Link", linkType: "Entry", id: product.store}
                    }
                },
                otherPhotos: {
                    'en-US' : [
                            ...assetArray
                        ]
                },
                headerPhoto:{
                    'en-US': assetHeaderImageObj
                }
            }
        }))
        .then((entry)=> entry.publish())
        .then((entry)=>  resolve(entry))
        .catch(err => {
            console.log('contentful err: ', err);
            reject(err);
        });
    });
}

module.exports = {
    updateProductById,
    createProduct
  };
