import constants from "../../../constants";
import { Sentry } from "../../../services/helper"

const { baseId } = constants.airtable;

async function getProduct(req, res) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/Products/${req.query.product}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
        },
      }
    );
    const data = await response.json();
    console.log("GET PRODUCT", data, req.query.product);
    res.status(200).json(data);
  } catch (err) {
    console.error("GET PRODUCT ERROR", err);
    res.status(400).text(err);
  }
}

export default Sentry.withSentry(getProduct);
