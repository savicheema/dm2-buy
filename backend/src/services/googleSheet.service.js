const request = require('request');
const config = require('../config/config');
const { google } = require("googleapis");
const moment = require('moment');

async function enterOrderInSheet(order) {
    console.log("entered in sheet!");
    if( !order.seller.orderGoogleSheetId ) {
        console.log("google sheet id not found in order: ", order.seller.orderGoogleSheetId);
        return;
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: "./credentials/dm2buy-3ddf86663185.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    });
    console.log("auth "+auth)

    const authClientObject = await auth.getClient();
    console.log("authClientObject "+authClientObject)

    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    const spreadsheetId = order.seller.orderGoogleSheetId;

    const productOrdered = `${order.products
        .map((product) => {
          if (product.colour) {
            product.customAttributes.push({
              name: 'Colour',
              // value: colorMap.map.get(product.colour),
              value: product.colour
            });
          }
          if (product.size) {
            product.customAttributes.push({ name: 'Size', value: product.size });
          }
          const customAttrib =
            product.customAttributes.length > 0
              ? `( _${product.customAttributes.map((ca) => `${ca.name} - ${ca.value}`).join(' · ')}_ )`
              : '';
          return `- ${product.name}${customAttrib} x ${product.quantity} - ₹${product.price * Number(product.quantity)}`;
        })
        .join('\n')}`


    await googleSheetsInstance.spreadsheets.values.append({
        auth, //auth object
        spreadsheetId, //spreadsheet id
        range: "A1", //sheet name and range of cells
        valueInputOption: "RAW", // The information will be passed according to what the usere passes in as date, number or text
        resource: {
            values: [[order.id, 
                    order.buyer.name,
                    order.buyer.phone, 
                    order.buyer.email, 
                    order.buyer.instagram, 
                    order.order_total, 
                    moment(order.createdDate).format('MMMM Do YYYY, h:mm:ss a'),
                    productOrdered,
                    order.address.complete_address,
                    order.address.city,
                    order.address.state,
                    order.address.pincode
                ]],
        },
    });

    console.log("googleSheetsInstance "+googleSheetsInstance)

}

async function enterExportedOrderInSheet(order, spreadsheetId) {
  console.log("enter in sheet ", order, spreadsheetId)
  const auth = new google.auth.GoogleAuth({
    keyFile: "./credentials/dm2buy-3ddf86663185.json", //the key file
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets", 
  });
  console.log("auth "+auth)

  const authClientObject = await auth.getClient();
  console.log("authClientObject "+authClientObject)

  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

  await googleSheetsInstance.spreadsheets.values.append({
    auth, //auth object
    spreadsheetId, //spreadsheet id
    range: "A1", //sheet name and range of cells
    valueInputOption: "RAW", // The information will be passed according to what the usere passes in as date, number or text
    resource: {
        values: [[order.seller.name, 
                order.order_total,
                order.payment_status,
                moment(order.createdDate).format('MM/DD/YYYY'),
                order.buyer.name,
                order.products
                      .map((product) => {
                      
                        return `- ${product.id}`;
                      })
                      .join(', ')
            ]],
    },
});
}


module.exports = {
  enterOrderInSheet,
  enterExportedOrderInSheet
};