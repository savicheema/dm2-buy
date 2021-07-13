import  * as Sentry  from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
    dsn: SENTRY_DSN || 'https://1a58051fd5714570ab93548dfca60a69@o210014.ingest.sentry.io/5859704',
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
    return splitHost[0] == "localhost:3000" ? 'fxnoob' : splitHost[0];
}
export  {
    getSubDomainOfPage,
    Sentry
}