const nodemailer = require('nodemailer');

async function sendEmail(order) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var convertedStartDate = new Date();
  var month = monthNames[convertedStartDate.getMonth()];
  var date = convertedStartDate.getDate();
  var shortDate = month + ' ' + date;

  var totalWithShipping = order.order_total;
  const shippingFee = order.order_shipping;
  const paymentProcessingFee = order.payment_processing_fee;

  var completeAddress = order.address.complete_address || order.address.address_line_1;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${process.env.EMAIL}`, // sender address
    to: `${order.buyer.email}`, // list of receivers
    cc:[ "sgoel19922@gmail.com", "suavelambi@gmail.com"],
    subject: 'Order Confirmed', // Subject line
    html: `<div class="">
    <div class="aHl"></div>
    <div id=":2v" tabindex="-1"></div>
    <div id=":2k" class="ii gt">
      <div id=":2j" class="a3s aiL msg-8883701113059166932"><u></u>
        <div style="font-family:'Avenir','Proxima Nova','Helvetica',sans-serif;font-size:16px;background-color:#e6eaf2;background-image:none;background-repeat:repeat;background-position:top left;color:#3c3e44;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
          <table class="m_-8883701113059166932container" style="border-collapse:collapse;border-spacing:0;border-style:none;width:100%;height:100%;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;text-align:center">
            <tbody>
              <tr style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                <td style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                  <table class="m_-8883701113059166932content" style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;width:100%;max-width:350px;text-align:center;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto">
                    <tbody>
                      <tr style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                        <td style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                          <div style="padding-top:50px;padding-bottom:40px"> </div>
                          <h1 style="width:85%;margin-top:0;margin-bottom:.35em;margin-right:auto;margin-left:auto;font-size:1.75em;line-height:1.40625;padding-bottom:.15em">Order Confirmed</h1>
                          <h2 style="width:85%;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;font-size:1.25em;line-height:1.6;font-weight:normal">
                        Hey ${order.buyer.name}, here's a receipt for your order on <strong>${shortDate}</strong>.
                      </h2> <a class="m_-8883701113059166932cta-link" href="https://${order.seller.name}${
      process.env.FRONTENT_BASE_URL
    }/order/${
      order.id
    }" style="margin-top:.6em;margin-bottom:2em;margin-right:auto;margin-left:auto;color:#6e88ff;text-decoration:none;text-transform:uppercase;letter-spacing:0.07em;font-weight:bold;display:block;padding-top:1em;padding-bottom:1em;padding-right:1em;padding-left:1em" target="_blank"><span style="border-bottom:1px dotted #6e88ff">Order Summary</span></a>
                          <div class="m_-8883701113059166932card" style="background-color:#fff;background-image:none;background-repeat:repeat;background-position:top left;display:block;border-radius:4px;margin-top:.8em;margin-bottom:.8em;margin-right:auto;margin-left:auto;padding-top:1.6em;padding-bottom:1.6em;padding-right:1.6em;padding-left:1.6em;font-size:1.125em;text-align:left">
                            <table class="m_-8883701113059166932line-items-table" style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;font-weight:bold;width:100%">
                              <tbody> ${order.products
                                .map((product) => {
                                  return `
                                <tr style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                                  <td style="border-collapse:collapse;border-spacing:0;border-style:none;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:top;padding-top:.6em;padding-bottom:.6em;padding-right:0;padding-left:0">
                                    <div class="m_-8883701113059166932line-item-title">${product.name} x ${product.quantity}
                                    <div class="m_-7969646897801254430line-item-description" style="font-size:.9em;font-weight:normal;color:#83889e;line-height:1.9">
                                      ${product.customAttributes
                                        .map((ca) => {
                                          return `${ca.name} - ${ca.value}`;
                                        })
                                        .join(
                                          `<span class="m_-7969646897801254430middot" style="display:inline-block;padding-top:0;padding-bottom:0;padding-right:.15em;padding-left:.15em;line-height:.7">·</span>`
                                        )}
                                    </div>
                                    <div class="m_-7969646897801254430line-item-description" style="font-size:.9em;font-weight:normal;color:#83889e;line-height:1.9">
                                      ${product.size ? 'Size - ' + product.size : ''}
                                    </div>
                                    </div>
                                  </td>
                                  <td style="border-collapse:collapse;border-spacing:0;border-style:none;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:top;padding-top:.6em;padding-bottom:.6em;padding-right:0;padding-left:0">
                                    <div class="m_-8883701113059166932line-item-price" style="text-align:right">₹${
                                      product.price * Number(product.quantity)
                                    }</div>
                                  </td>
                                </tr> `;
                                })
                                .join('')}
                                <tr style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                                  <td colspan="2" style="border-collapse:collapse;border-spacing:0;border-style:none;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:top;padding-top:.6em;padding-bottom:.6em;padding-right:0;padding-left:0">
                                    <hr style="background-color:#dadde5;color:#dadde5;width:100%;height:1px;border-style:none;margin-top:.5em;margin-bottom:.5em;margin-right:0;margin-left:0">
                                  </td>
                                </tr>
                                <tr style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                                  <td style="border-collapse:collapse;border-spacing:0;border-style:none;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:top;padding-top:.6em;padding-bottom:.6em;padding-right:0;padding-left:0">
                                    <div class="m_-8883701113059166932line-item-title">Shipping Fee</div>
                                  </td>
                                  <td style="border-collapse:collapse;border-spacing:0;border-style:none;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:top;padding-top:.6em;padding-bottom:.6em;padding-right:0;padding-left:0">
                                    <div class="m_-8883701113059166932line-item-price" style="text-align:right">₹${shippingFee}</div>
                                  </td>
                                </tr>
                                <tr style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                                  <td colspan="2" style="border-collapse:collapse;border-spacing:0;border-style:none;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:top;padding-top:.6em;padding-bottom:.6em;padding-right:0;padding-left:0">
                                    <hr style="background-color:#dadde5;color:#dadde5;width:100%;height:1px;border-style:none;margin-top:.5em;margin-bottom:.5em;margin-right:0;margin-left:0">
                                  </td>
                                </tr>
                                <tr style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                                  <td style="border-collapse:collapse;border-spacing:0;border-style:none;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:top;padding-top:.6em;padding-bottom:.6em;padding-right:0;padding-left:0">
                                    <div class="m_-8883701113059166932line-item-title">Payment Processing Fee</div>
                                  </td>
                                  <td style="border-collapse:collapse;border-spacing:0;border-style:none;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:top;padding-top:.6em;padding-bottom:.6em;padding-right:0;padding-left:0">
                                    <div class="m_-8883701113059166932line-item-price" style="text-align:right">${paymentProcessingFee}</div>
                                  </td>
                                </tr>
                                <tr style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                                  <td colspan="2" style="border-collapse:collapse;border-spacing:0;border-style:none;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:top;padding-top:.6em;padding-bottom:.6em;padding-right:0;padding-left:0">
                                    <hr style="background-color:#dadde5;color:#dadde5;width:100%;height:1px;border-style:none;margin-top:.5em;margin-bottom:.5em;margin-right:0;margin-left:0">
                                  </td>
                                </tr>
                                <tr style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                                  <td style="border-collapse:collapse;border-spacing:0;border-style:none;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:top;padding-top:.6em;padding-bottom:.6em;padding-right:0;padding-left:0">
                                    <div class="m_-8883701113059166932line-item-title">Total</div>
                                  </td>
                                  <td style="border-collapse:collapse;border-spacing:0;border-style:none;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:top;padding-top:.6em;padding-bottom:.6em;padding-right:0;padding-left:0">
                                    <div class="m_-8883701113059166932line-item-price" style="text-align:right">₹${totalWithShipping}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="m_-8883701113059166932card" style="background-color:#fff;background-image:none;background-repeat:repeat;background-position:top left;display:block;border-radius:4px;margin-top:.8em;margin-bottom:.8em;margin-right:auto;margin-left:auto;padding-top:1.6em;padding-bottom:1.6em;padding-right:1.6em;padding-left:1.6em;font-size:1.125em;text-align:left">
                            <table style="width:100%;border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                              <tbody>
                                <tr style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                                  <td style="vertical-align:baseline;border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                                    <p style="font-weight:bold;margin-bottom:0;font-size:1em;line-height:1.555555556;padding-top:0;margin-top:.75em;margin-right:0;margin-left:0">${
                                      order.buyer.name
                                    }</p>
                                  </td>
                                  <td style="text-align:right;vertical-align:bottom;border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0"> <img src="https://ci4.googleusercontent.com/proxy/LlTPHf8dlrFfPrbku_9zlf5g3nY5cgeDz5as9F6-xRGbIg-oN7wLqaZpyQwLVeC3XlU7wUAm9o1u4xgG4PCrzTXSE29GAZ2nbsjNqOP6_zPUE81Ssg=s0-d-e1-ft#https://www.marchtee.com/core/static/emails/emoji-home-address.png" style="width:35px;height:35px;display:inline-block" class="CToWUd"> </td>
                                </tr>
                                <tr style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                                  <td colspan="2" style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                                    <div class="m_-8883701113059166932line-item-description" style="font-size:.9em;font-weight:normal;color:#83889e;line-height:1.9">
                                      <p style="font-size:1em;line-height:1.555555556;padding-top:0;margin-top:.75em;margin-bottom:.75em;margin-right:0;margin-left:0"> ${completeAddress}
                                        <br> ${order.address.city}, ${order.address.state} ${order.address.pincode}
                                        <br>India</p>
                                      <p style="font-size:1em;line-height:1.555555556;padding-top:0;margin-top:.75em;margin-bottom:.75em;margin-right:0;margin-left:0"><a href="mailto:nakkul.verma15@gmail.com" style="color:#6e88ff;text-decoration:none" target="_blank">${
                                        order.buyer.email
                                      }</a></p>
                                      <p style="font-size:1em;line-height:1.555555556;padding-top:0;margin-top:.75em;margin-bottom:.75em;margin-right:0;margin-left:0"><a href="tel:919910978655" style="color:#6e88ff;text-decoration:none" target="_blank">+91 ${
                                        order.buyer.phone
                                      }</a></p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <tr style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                            <td style="border-collapse:collapse;border-spacing:0;border-style:none;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0">
                              <p class="m_-8883701113059166932footer" style="line-height:1.555555556;padding-top:0;font-size:.75em;max-width:22em;margin-top:1em;margin-bottom:3em;margin-right:auto;margin-left:auto;color:#85899e">Have a question? DM me on instagram <a href="https://instagram.com/${
                                order.seller.instagram
                              }" style="text-decoration:none;color:inherit" target="_blank">@${
      order.seller.instagram
    } </a></p>
                            </td>
                          </tr>
                    </tbody>
                  </table>
                  </td>
                  </tr>
            </tbody>
          </table> <img src="https://ci5.googleusercontent.com/proxy/1C0n0vl8ye6_KFb0NvhD_KF2Pfsz2HU96hJMD6M39RsoKPS6uH7RCRdeyabb1sNNZ8V_7B5R2YskXiWMFH8iPVRXK03igl0YgkX2SBd3VcCZE5H4pnFAmi_zXjJz4V9Obm-4VgkiJLlsrh6dLr7LuGgZtT_UwNC49kJAWMLTCQqCY7Du8CxGUSSp3OgPtvOU-xIbYwV3-FX-8TYN1gNv7RQkzpjm4DV0VInhoy_io87C9nWxIItiAuqzcc8i9umrMCp9gT9HOtyVu991-Gb3pSMd6F6xygyA8khwkvVG5kmk2HPDjd6Wf100B6T_G8sFadSdiVjgqCQimnsI6t6_dc7aGtdS9f6bGqpHQO_XEVbSHmgjZF1VZPN1UO9tUi_2cfrv3RXPiKoCKKNu4CC7GYW-6D2scn4nmNQn7LCKYWMDs8dkjBC6-Of7u5r68yvhm29PA6uDX9hVy72DUBv8ykUX8cZkfzVkZlxLtR2aeErYu0q1zUaZV_Ap6Jvv0NuHdj_R-Zw7ifLUaWkWtRv7XD9rYWc3uZQws2-b2nCTNtRnjPv6T3XG-rY9UanXis6n3tnPoTNFREdswolZLwDf82Rir_zJuBh5FeiCyVr_h9zP1dVMv3oon0hi3v8=s0-d-e1-ft#https://ea.pstmrk.it/open/v3_hnJxY9uX-PmQThEm9IIq_riYoBlo2um1TGvtG0vB02Geg8mT7k58vwQPL_u0k5GNPzO5PzLpxA6k_ue3ZFDirBZDvfyybA4pKFjgOQt0IjCNolek2IE6p1-JXSqwq5IAM1n48wTOexR3JM3yMV4I1_fh3SA_ZbhQndzKu61qNmCmC9YDyNTV-KANGMDIgK4NRynTG1whIlNK1X0CurimI0i1tKOu1S162VXiarMWfEtK6Q_GLabjAGtpzPa3FL7m1XeAGICy9hPr-yRMmCohXF-h-GxvxYoUSm0XdnemUcZzbZG2zAqtzdvQPZOhpR1dzZONCbxeG9kTSR7iWSbAnmyUtO99SgN2tTuN3DRRR9Y7Avck0pFl6oeDbTU8AemoZctRRNDQdppbp4Tr6YdKFzQye3t4BNMYCUkzPGjAgmA" width="1" height="1" border="0" alt="" class="CToWUd"></div>
        <div class="yj6qo"></div>
        <div class="adL"> </div>
      </div>
    </div>
    <div id=":2z" class="ii gt" style="display:none">
      <div id=":30" class="a3s aiL "></div>
    </div>
    <div class="hi"></div>
  </div>`,
  });

  console.log('Message sent: %s', info.messageId);
}

module.exports = {
  sendEmail,
};
