const constants = {
  regularDeliveryFee: 100,
  devEnv: {
    storeSubdomain: "cowrie",
  },
  airtable: {
    dev: {
      baseId: "appohXo9XXC3epd3G",
    },
    prod: {
      baseId: "appgXTWF83485iHfy",
    },
  },
  endpoints: {
    dev: {
      url: "http://3.110.224.20",
    },
    prod: {
      url: "https://api.dm2buy.com",
    },
  },
  product: {
    status: {
      "for-sale": "for-sale",
      "sold-out": "sold-out",
    },
  },
};
export default constants;
