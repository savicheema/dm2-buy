import { withSentry } from '@sentry/nextjs'
import { serverEndpoint } from "../../../services/helper";

async function handler(req, res) {
    const orderId = req.query.orderId;
    const url = `${serverEndpoint}/order/${orderId}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log({data});
        res.status(200).json(data)
    } catch (err) {
        console.error("GET ORDER DETAIL ERROR: ", err);
        console.log({err});
        res.status(500).json({error: err});
    }
}

export default withSentry(handler)
