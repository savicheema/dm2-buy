const twilio = require('twilio');
const httpStatus = require('http-status');
const { otp } = require('../config/config');
const APIError = require('./ApiError');

const sendSMS = async (mobile, msg) => {
  const sid = otp.otp_sid;
  const token = otp.otp_token;
  const service = otp.otp_service;
  const client = twilio(sid, token);
  const data = await client.messages.create({
    body: msg,
    to: mobile,
    messagingServiceSid: service,
  });

  if (data.status !== 'accepted') {
    throw new APIError(httpStatus.INTERNAL_SERVER_ERROR, 'Unable to send msg ');
  }

  return true;
};
module.exports = { sendSMS };
