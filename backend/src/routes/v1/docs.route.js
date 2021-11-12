const express = require('express');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();

const swaggerDocs = require('../../docs/v1.json');

const baseUrl =
  process.env.NODE_ENV === 'local'
    ? `${process.env.HOSTNAME}:${process.env.PORT}`
    : `${process.env.HOSTNAME}`;

swaggerDocs.host = baseUrl;

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {}));

module.exports = router;