import { validatePromoCodeFromDB } from "../../../services/backend/airtable";

async function validateCode(req, res) {
  console.log('validating===========')
  try{
    let giftCodeData = await validatePromoCodeFromDB(req.query.code, req.query.store)
    console.log('validated')
    res.status(200).json(giftCodeData);
  } catch (err) {
    console.log('error')
    res.status(400).json({error: err})
  }
}

// async function validateCode(req,res) {
//   console.log('validating');
//   try{
//     const {code} = req.query;
//     const response = await fetch(
//         `https://api.airtable.com/v0/appohXo9XXC3epd3G/DiscountCodes?filterByFormula={couponCode}="${code}"`,
//         {
//           headers: {
//             Authorization: `Bearer keyzUtji12yebk5P8`,
//           },
//         }
//       );
//       const data = await response.json();
//       const [record] = data;
//       res.status(200).json(record);
//     console.log()
//   }
//   catch (err) {
//     res.status(400).json({error: 'no code found'});
//   }
// }

export default validateCode;