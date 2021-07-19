import { withSentry } from "@sentry/nextjs";
import { serverEndpoint } from "../../../services/helper";

async function handler(req, res) {
  // const url = `${serverEndpoint}/order`;
    console.log({req: req.body})
 const url = `http://ec2-15-206-157-252.ap-south-1.compute.amazonaws.com/order/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    console.log({data});
    res.status(200).json(data);
  } catch (err) {
    console.error("GET ORDER DETAIL ERROR: ", err);
    res.status(500).text(err);
  }
}

export default withSentry(handler);
