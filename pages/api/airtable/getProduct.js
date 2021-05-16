export default async (req, res) => {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/appgXTWF83485iHfy/Products/${req.query.product}`,
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
};