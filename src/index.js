const card = require('./modules/card');
const mobileAccount = require('./modules/mobileAccount');
const voucher = require('./modules/voucher');
const threeDS = require('./modules/threeDS');

module.exports = {
  authorize: card.authorize,
  capture: card.capture,
  voidPayment: card.voidPayment,
  refund: card.refund,
  statusInquiry: card.statusInquiry,
  directPay: card.directPay,
  mobileAccountPayment: mobileAccount.mobileAccountPayment,
  voucherPayment: voucher.voucherPayment,
  check3DSecureEnrollment: threeDS.check3DSecureEnrollment,
  processACS: threeDS.processACS,
};
