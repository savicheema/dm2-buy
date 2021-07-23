import { Sentry } from "../../services/helper";

async function pincode(req, res) {
    try {
        const response = await fetch(
            `https://www.marchtee.com/cart/shipping_options/${req.query.pincode}`
        );
        const data = await response.json();
        console.log({data})
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({error: 'Pincode not found!'});
    }
}
export default Sentry.withSentry(pincode);
