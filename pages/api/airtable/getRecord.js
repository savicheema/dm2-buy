export default async (req, res) => {
  try {
    const response = await fetch(
      "https://api.airtable.com/v0/appgXTWF83485iHfy/Table%201/recvPq1aVPifDwUAY",
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
        },
      }
    );
    const data = await response.json();
    console.log("GET RECORD", data);
    res.status(200).json(data);
  } catch (err) {
    console.error("GET RECORD ERROR", err);
    res.status(400).text(err);
  }
};
