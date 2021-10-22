const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const orderRoute = require('./order.route');
const productRoute = require('./product.route');
const storeRoute = require('./store.route');
const addressRoute = require('./address.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/order',
    route: orderRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/stores',
    route: storeRoute,
  },
  // {
  //   path: '/address',
  //   route: addressRoute,
  // },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
