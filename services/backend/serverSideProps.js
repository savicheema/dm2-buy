import constants from "../../constants";

export async function getStore(context) {
  let store, errorCode, storeUrl;
  const { req } = context;
  const { host } = req.headers;
  //console.log('host: ', host);
  const splitHost = host.split(".");
  //console.log('splitHost: ', host);
  let subdomain =
    splitHost[0] == "localhost:3000" || splitHost[0] == "192"
      ? constants.devEnv.storeSubdomain
      : splitHost[0];
  const hostWithProtocol =
    host === "localhost:3000" ? `http://${host}` : `https://${host}`;
  try {
    //console.log('splitHost --------: ', splitHost);
    //console.log('subdomain before: ', subdomain);
    //console.log('host', host)
    if (!splitHost.includes('dm2buy') && !splitHost.includes('localhost:3000')) {
      //console.log('inside condition')
      console.log(encodeURI(host))
      let original_subdomain_response = await fetch(`${hostWithProtocol}/api/airtable/getSubdomain?custom_domain=${encodeURI(host)}`);
      let original_subdomain = await original_subdomain_response.json();
      subdomain = original_subdomain.subdomain;
      console.log('subdomain after: ', subdomain);
    }

    const response = await fetch(
      `${hostWithProtocol}/api/airtable/getRecord?subdomain=${subdomain}`
    );
    store = await response.json();
    if (store.error) {
      throw new Error(store.error);
    }
    storeUrl = `${hostWithProtocol}/`;
    errorCode = false;
  } catch (e) {
    console.log(e)
    errorCode = 404;
    storeUrl = "";
  }
  return {
    props: { storeData: store || null, errorCode, storeUrl }, // will be passed to the page component as props
  };
}

export async function getProduct(context) {
  let product, errorCode, productUrl, storeData;
  const { req } = context;
  const splitArr = req.url.split("-");
  const productId = splitArr[splitArr.length - 1];
  const { host } = req.headers;
  // console.log('host getProduct: ', host);
  const splitHost = host.split(".");
  let subdomain =
    splitHost[0] == "localhost:3000" || splitHost[0] == "192"
      ? constants.devEnv.storeSubdomain
      : splitHost[0];
  const hostWithProtocol =
    host === "localhost:3000" ? `http://${host}` : `https://${host}`;
  try {
    if (!splitHost.includes('dm2buy') && !splitHost.includes('localhost:3000')) {
      let original_subdomain_response = await fetch(`${hostWithProtocol}/api/airtable/getSubdomain?custom_domain=${encodeURI(host)}`);
      let original_subdomain = await original_subdomain_response.json();
      subdomain = original_subdomain.subdomain;
    }

    const response = await fetch(
      `${hostWithProtocol}/api/airtable/getProduct?product=${productId}&subdomain=${subdomain}`
    );
    product = await response.json();
    if (product.error) {
      throw new Error(product.error);
    }
    productUrl = `${hostWithProtocol}/product/${product?.fields?.Slug}-${product.id}`;
    errorCode = false;
    storeData = await getStore(context);
  } catch (e) {
    errorCode = 404;
    productUrl = "";
  }
  return {
    props: { productId, product: product || null, ...storeData.props, errorCode, productUrl }, // will be passed to the page component as props
  };
}

export async function getOrderDetail(context) {
  let store, errorCode, order, retryLink;
  const { query, req } = context;
  const { host } = req.headers;
  const { orderId } = context.params;
  console.log('host getOrderDetail: ', host);

  const splitHost = host.split(".");
  let subdomain =
    splitHost[0] == "localhost:3000" || splitHost[0] == "192"
      ? constants.devEnv.storeSubdomain
      : splitHost[0];
  const hostWithProtocol =
    host === "localhost:3000" ? `http://${host}` : `https://${host}`;
  try {
    if (!splitHost.includes('dm2buy') && !splitHost.includes('localhost:3000')) {
      let original_subdomain_response = await fetch(`${hostWithProtocol}/api/airtable/getSubdomain?custom_domain=${encodeURI(host)}`);
      let original_subdomain = await original_subdomain_response.json();
      subdomain = original_subdomain.subdomain;
    }

    const response = await fetch(
      `${hostWithProtocol}/api/airtable/getRecord?subdomain=${subdomain}`
    );
    store = await response.json();
    if (store.error) {
      throw new Error(store.error);
    }
    const orderResponse = await fetch(
      `${hostWithProtocol}/api/order/order?orderId=${orderId}`
    );
    const json = await orderResponse.json();
    // console.log({ json });
    const { order: orderDetails, paymentLink } = json;
    retryLink = paymentLink ? paymentLink : null;
    order = orderDetails;
    errorCode = false;
  } catch (e) {
    errorCode = 404;
    order = null;
    retryLink = null;
  }
  return {
    props: {
      orderId: query.orderId,
      store: store || {},
      storeData: store || {},
      errorCode,
      order,
      retryLink,
    }, // will be passed to the page component as props
  };
}
