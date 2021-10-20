const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    CASHFREE_APP_ID: Joi.string().description('cashfree app id'),
    CASHFREE_APP_SECRET: Joi.string().description('cashfree app secret'),
    CASHFREE_ORDER_CREATE_URL: Joi.string().description('CASHFREE_ORDER_CREATE_URL'),
    SERVER_BASE_URL: Joi.string().description('SERVER_BASE_URL'),
    FRONTENT_BASE_URL: Joi.string().description('FRONTENT_BASE_URL'),
    CASHFREE_GET_ORDER_PAYMENT_LINK_URL: Joi.string().description('CASHFREE_GET_ORDER_PAYMENT_LINK_URL'),
    WHATSAPP_BUSINESS_PHONE: Joi.string().description('WHATSAPP_BUSINESS_PHONE'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  cashfree: {
    appId: envVars.CASHFREE_APP_ID,
    appSecret: envVars.CASHFREE_APP_SECRET,
    orderCreateUrl: envVars.CASHFREE_ORDER_CREATE_URL,
    getOrderPaymentLinkUrl: envVars.CASHFREE_GET_ORDER_PAYMENT_LINK_URL,
  },
  baseUrl: {
    server: envVars.SERVER_BASE_URL,
    frontend: envVars.FRONTENT_BASE_URL,
  },
  whatsapp: {
    businessPhone: envVars.WHATSAPP_BUSINESS_PHONE
  }
};
