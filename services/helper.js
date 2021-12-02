import * as Sentry from "@sentry/nextjs";
import constants from "../constants";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    "https://1a58051fd5714570ab93548dfca60a69@o210014.ingest.sentry.io/5859704",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

const getSubDomainOfPage = () => {
  const { host } = window.location;

  let splitHost = host.split(".");
  console.log('===========  TRIGGERED ===========');
  if (!splitHost.includes('dm2buy') && !splitHost.includes('localhost:3000')) {
    return new Promise((resolve, reject) => {
      fetch(`/api/airtable/getSubdomain?custom_domain=${encodeURI(window.location.host)}`)
      .then(response => response.json())
      .then(res => {
        splitHost[0] = res.subdomain;
        console.log('splitHost[0] ==========: ', splitHost[0]);
        resolve(splitHost[0] == "localhost:3000" || splitHost[0] == "192"
          ? "chubb"
          : splitHost[0]);
      })
      .catch(err => reject());
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve(splitHost[0] == "localhost:3000" || splitHost[0] == "192"
        ? "chubb"
        : splitHost[0]);
    });
  }
};

const airtableBaseId = process.env.AIRTABLE_BASE_ID;

const serverEndpoint = process.env.SERVER_ENDPOINT;

const guid = () => {
  var result, i, j;
  result = "";
  for (j = 0; j < 32; j++) {
    if (j == 8 || j == 12 || j == 16 || j == 20) result = result + "-";
    i = Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase();
    result = result + i;
  }
  return result;
};

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export { getSubDomainOfPage, Sentry, airtableBaseId, serverEndpoint, guid, isNumeric };
