const contentfulManagement = require('contentful-management');
const { util } = require('prettier');
const decode = require('decode-html');
const convertToSlug = require('../utils/utils')
const client = contentfulManagement.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "vidnutv0ls36",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "CFPAT-N2xxF9WUPucWikke_jFaYYC75So1KWXC-i9_Lo5_dR8"
});


async function uploadImageToContentful(productName, imageUrl){

    if(imageUrl){
        let assetRes = await new Promise((resolve, reject) => {
            client.getSpace('vidnutv0ls36')
            .then((space) => space.getEnvironment("master"))
            .then((environment)=> environment.createAsset({
                fields: {
                    title: {
                    'en-US': convertToSlug.convertToSlug(productName)+"_image"
                    },
                    description: {
                    'en-US': productName
                    },
                    file: {
                    'en-US': {
                        contentType: 'image/jpeg',
                        fileName: `${convertToSlug.convertToSlug(productName) + Date.now()}.jpeg`,
                        upload: imageUrl
                    }
                    }
                }
            }))
            .then((asset) => asset.processForAllLocales())
            .then((asset) => asset.publish())
            .then((asset) => resolve(asset))
            .catch(error => reject(error))
        });
        assetImageObj = {
            sys:{
                "type": "Link",
                "linkType": "Asset",
                "id": assetRes.sys.id
            }
        }
        return assetImageObj
    }
}

async function updateProductById(id, product) {
    console.log(product)
    console.log(id)


    let assetArray = [];
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
                        value:{'en-US':decode(product.description)} 
                    });
                if(product.availableStock)
                    patchArray.push({
                        op: 'add',
                        path: '/fields/availableStock',
                        value:{'en-US':product.availableStock} 
                    });
                if(product.productPhotos && product.productPhotos.length>0)
                    patchArray.push({
                        op: 'add',
                        path: '/fields/productPhotos',
                        value:{'en-US':[...product.productPhotos]} 
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
    
    let customAttributeArray = [];

    if(product.customAttributes && product.customAttributes.length > 0){
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
    let variantsArray = await createVariantsArrray(product)

    // create product on contentful
    return new Promise((resolve, reject) => {
        console.log(new Date().toISOString())
        console.log(product.productPhotos)
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
                availableStock:{
                    'en-US': product.availableStock
                },
                description:{
                    'en-US': product.description
                },
                store: {
                    'en-US': {
                        sys: {type: "Link", linkType: "Entry", id: product.store}
                    }
                },
                productPhotos: {
                    'en-US' : [...product.productPhotos]
                },
                customAttributes:{
                    'en-US':[...customAttributeArray]
                },
                variantOptions:{
                    'en-US':[...variantsArray]
                }
            }
        }))
        .then((entry)=> entry.publish())
        .then((entry)=>  {
            console.log(entry)
            resolve({
                success:true,
                status_code:200
            })
        } )
        .catch(err => {
            console.log('contentful err: ', err);
            reject(err);
        });
    });
}


//Create variant options
async function createVariantsArrray(product){
    
    let variantsArray = [];
    if(product.variantOptions){
        for (let index = 0; index < product.variantOptions.length; index++) {
            const element = product.variantOptions[index];
            console.log(element)
            let variantOptionsRes = await  new Promise((resolve, reject) => {

                client.getSpace('vidnutv0ls36')
                .then((space) => space.getEnvironment("master"))
                .then((environment) => environment.createEntry('productVariants',{
                    fields: {
                        name: {
                            'en-US': element.name
                        },
                        type:{
                            'en-US': element.type
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

            var variantObj = {
                sys:{
                    "type": "Link",
                    "linkType": "Entry",
                    "id": variantOptionsRes.sys.id
                }
            }
            variantsArray.push(variantObj) 
            console.log("variantsArray " + variantsArray)
        }
    }
    return variantsArray
}

async function updateProductStatus(productId, variant, quantity) {
    client.getSpace('vidnutv0ls36').then((space) => {
        space.getEnvironment('master').then((environment) => {
            environment.getEntry(productId).then((entry) => {
                console.log('entry: ', entry);
                if (!variant) {
                    entry.fields.availableStock['en-US'] = parseInt(entry.fields.availableStock['en-US']) - quantity < 0
                        ? 0 : parseInt(entry.fields.availableStock['en-US']) - quantity;
                } else {
                    console.log('entry: ', entry.fields.variantOptions['en-US']);
                }
                entry.update().then((updatedData) => {
                    console.log('updatedData: ', updatedData);
                });
            });
        });
    });
}


module.exports = {
    updateProductById,
    createProduct,
    uploadImageToContentful,
    updateProductStatus
};
