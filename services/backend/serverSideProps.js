export async function getStore(context) {
    let store, errorCode, storeUrl;
    const { req } = context;
    const { host } = req.headers;
    const splitHost = host.split(".");
    const subdomain =
        splitHost[0] == "localhost:3000" || splitHost[0] == "192"
            ? "fxnoob"
            : splitHost[0];
    const hostWithProtocol =
        host === "localhost:3000" ? `http://${host}` : `https://${host}`;
    try {
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
        errorCode = 404;
        storeUrl = "";
    }
    return {
        props: { storeData: store || null, errorCode, storeUrl }, // will be passed to the page component as props
    };
}

export async function getProduct(context) {
    let product, errorCode, productUrl;
    const { req } = context;
    const splitArr = req.url.split("-");
    const productId = splitArr[splitArr.length - 1];
    const { host } = req.headers;
    const splitHost = host.split(".");
    const subdomain =
        splitHost[0] == "localhost:3000" || splitHost[0] == "192"
            ? "fxnoob"
            : splitHost[0];
    const hostWithProtocol =
        host === "localhost:3000" ? `http://${host}` : `https://${host}`;
    try {
        const response = await fetch(
            `${hostWithProtocol}/api/airtable/getProduct?product=${productId}&subdomain=${subdomain}`
        );
        product = await response.json();
        if (product.error) {
            throw new Error(product.error);
        }
        productUrl = `${hostWithProtocol}/product/${product?.fields?.Slug}-${product.id}`;
        errorCode = false;
    } catch (e) {
        errorCode = 404;
        productUrl = "";
    }
    return {
        props: { productId, product: product || null, errorCode, productUrl }, // will be passed to the page component as props
    };
}

export async function getOrderDetail(context) {
    let store, errorCode, order, retryLink;
    const { query, req } = context;
    const { host } = req.headers;
    const { orderId } = context.params;
    const splitHost = host.split(".");
    const subdomain =
        splitHost[0] == "localhost:3000" || splitHost[0] == "192"
            ? "fxnoob"
            : splitHost[0];
    const hostWithProtocol =
        host === "localhost:3000" ? `http://${host}` : `https://${host}`;
    try {
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
        console.log({json});
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
            errorCode,
            order,
            retryLink,
        }, // will be passed to the page component as props
    };
}
