const contentfulManagement = require('contentful-management');
const { util } = require('prettier');
const convertToSlug = require('../utils/utils')
const client = contentfulManagement.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "vidnutv0ls36",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "CFPAT-N2xxF9WUPucWikke_jFaYYC75So1KWXC-i9_Lo5_dR8"
});

async function updateProductById(id, product) {
    console.log(product)
    console.log(id)
    var assetHeaderImageObj = null

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
                        fileName: `${convertToSlug.convertToSlug(product.name)}-header.jpeg`,
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
        console.log("processing other images....")
        for (let index = 0; index < product.otherPhotos.length; index++) {
            const element = product.otherPhotos[index];
            let assetRes = await new Promise((resolve, reject) => {
                client.getSpace('vidnutv0ls36')
                .then((space) => space.getEnvironment("master"))
                .then((environment)=> environment.createAsset({
                    fields: {
                        title: {
                        'en-US': product.name+"-" + convertToSlug.convertToSlug(new Date().toISOString())
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
                .then((asset) => asset.publish())
                .then((asset) => {
                            console.log(`processing ${index} image done....`)
                            resolve(asset)
                        })
                .catch(error => reject(error))
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
    var customAttributeArray = []
    if(product.customAttributes){
        for (let index = 0; index < product.customAttributes.length; index++) {
            const element = product.customAttributes[index];
            console.log(element)
            let customAttributeRes = await  new Promise((resolve, reject) => {

                client.getSpace('vidnutv0ls36')
                .then((space) => space.getEnvironment("master"))
                .then((environment) => environment.createEntry('customAttributes',{
                    fields: {
                        name: {
                            'en-US': element.name
                        },
                        attributeType:{
                            'en-US': convertToSlug.convertToSlug(element.attributeType)
                        },
                        required:{
                            'en-US': element.required
                        }
                    }
                }))
                .then((entry)=> entry.publish())
                .then((entry)=>  {
                    console.log(entry)
                    resolve(entry)
                })
                .catch(err => {
                    console.log('contentful err: ', err);
                    reject(err);
                });
            });

            var custAttrObj = {
                sys:{
                    "type": "Link",
                    "linkType": "Entry",
                    "id": customAttributeRes.sys.id
                }
            }
            customAttributeArray.push(custAttrObj) 
        }
    }

    return new Promise((resolve, reject) => {
        console.log(client)
        client.getSpace('vidnutv0ls36')
            .then((space) => space.getEnvironment("master"))
            .then((environment) => environment.getEntry(id))
            .then(entry => {
                // console.log(entry)
                 // if(assetArray.length>0)
                //     entry.fields.otherPhotos['en-US'] = [...assetArray]
                //entry.update()
                
                let patchArray = []
                if(product.name)
                    patchArray.push({
                        op: 'add',
                        path: '/fields/name',
                        value:{'en-US':product.name} 
                    });
                if(product.price)
                    patchArray.push({
                        op: 'add',
                        path: '/fields/price',
                        value:{'en-US':product.price} 
                    });
                if(product.description)
                    patchArray.push({
                        op: 'add',
                        path: '/fields/description',
                        value:{'en-US':product.description} 
                    });
                if(product.availableStock)
                    patchArray.push({
                        op: 'add',
                        path: '/fields/availableStock',
                        value:{'en-US':product.availableStock} 
                    });
                if(assetHeaderImageObj)
                    patchArray.push({
                        op: 'add',
                        path: '/fields/headerPhoto',
                        value:{'en-US':assetHeaderImageObj} 
                    });
                if(assetArray.length>0)
                    patchArray.push({
                        op: 'add',
                        path: '/fields/otherPhotos',
                        value:{'en-US':[...assetArray]} 
                    });
                if(customAttributeArray.length>0)
                    patchArray.push({
                        op:'add',
                        path: '/fields/customAttributes',
                        value:{'en-US':[...customAttributeArray]}
                    })
                entry.patch([...patchArray])
                .then((entry)=> resolve(entry.publish()))
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
        console.log("processing other images....")
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
                .then((asset) => asset.publish())
                .then((asset) => {
                            console.log(`processing ${index} image done....`)
                            resolve(asset)
                        })
                .catch(error => reject(error))
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
    let customAttributeArray = [];

    if(product.customAttributes){
        for (let index = 0; index < product.customAttributes.length; index++) {
            const element = product.customAttributes[index];
            console.log(element)
            let customAttributeRes = await  new Promise((resolve, reject) => {

                client.getSpace('vidnutv0ls36')
                .then((space) => space.getEnvironment("master"))
                .then((environment) => environment.createEntry('customAttributes',{
                    fields: {
                        name: {
                            'en-US': element.name
                        },
                        attributeType:{
                            'en-US': convertToSlug.convertToSlug(element.attributeType)
                        },
                        required:{
                            'en-US': element.required
                        }
                    }
                }))
                .then((entry)=> entry.publish())
                .then((entry)=>  {
                    console.log(entry)
                    resolve(entry)
                })
                .catch(err => {
                    console.log('contentful err: ', err);
                    reject(err);
                });
            });

            var custAttrObj = {
                sys:{
                    "type": "Link",
                    "linkType": "Entry",
                    "id": customAttributeRes.sys.id
                }
            }
            customAttributeArray.push(custAttrObj) 
        }
    }
    // create product on contentful
    return new Promise((resolve, reject) => {
        console.log(".............asset array.................")
        console.log(assetArray)
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
                    'en-US' : [...assetArray]
                },
                headerPhoto:{
                    'en-US': assetHeaderImageObj
                },
                customAttributes:{
                    'en-US':[...customAttributeArray]
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
