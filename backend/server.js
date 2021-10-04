require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const rateLimit = require("express-rate-limit");

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
Sentry.init({
  dsn: "https://f522d6f3d5f04a4caa775171628627e5@o929331.ingest.sentry.io/5878106",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.5,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(limiter);
// use JWT auth to secure the api
//app.use(jwt());

// api routes
app.use('/users', require('./user/user.controller'));
app.use('/store', require('./store/store.controller'));
app.use('/product', require('./product/product.controller'));
app.use('/order', require('./order/order.controller'));
// global error handler
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('dm2buy');
});

// start server
const port = (process.env.PORT || 8080);
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app