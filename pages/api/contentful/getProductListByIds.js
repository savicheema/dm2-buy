import {
    getProductListById
  } from "../../../services/backend/contentful";
  import { Sentry } from "../../../services/helper";
  
  async function getProductListByIds(req, res) {
    const { productIds } = req.query;
    try {
      const recordMeta = await getProductListById(productIds);
      if (!recordMeta) {
        res.status(400).json({ error: "Products not found!" });
        return;
      }
  
      res.status(200).json({
        productList: recordMeta
      });
    } catch (err) {
      res.status(400).json({ error: "Error occured!" });
    }
  }
  
  export default Sentry.withSentry(getProductListByIds);
  