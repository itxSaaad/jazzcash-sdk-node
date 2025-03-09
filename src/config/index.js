require('dotenv').config();

const config = {
  merchantId: process.env.JAZZCASH_MERCHANT_ID,
  password: process.env.JAZZCASH_PASSWORD,
  hashKey: process.env.JAZZCASH_HASH_KEY,
  environment: process.env.JAZZCASH_ENVIRONMENT || 'sandbox',
  apiVersion: process.env.JAZZCASH_API_VERSION || '1.1',
  sandboxUrl:
    process.env.JAZZCASH_SANDBOX_URL || 'https://sandbox.jazzcash.com.pk',
  liveUrl: process.env.JAZZCASH_LIVE_URL || 'https://payments.jazzcash.com.pk',
  endpoints: {
    AUTHORIZE: process.env.JAZZCASH_ENDPOINT_AUTHORIZE,
    CAPTURE: process.env.JAZZCASH_ENDPOINT_CAPTURE,
    VOID: process.env.JAZZCASH_ENDPOINT_VOID,
    REFUND: process.env.JAZZCASH_ENDPOINT_REFUND,
    STATUS: process.env.JAZZCASH_ENDPOINT_STATUS,
    DIRECT_PAY: process.env.JAZZCASH_ENDPOINT_DIRECT_PAY,
    MOBILE: process.env.JAZZCASH_ENDPOINT_MOBILE,
    VOUCHER: process.env.JAZZCASH_ENDPOINT_VOUCHER,
    '3DS_ENROLL': process.env.JAZZCASH_ENDPOINT_3DS_ENROLL,
    PROCESS_ACS: process.env.JAZZCASH_ENDPOINT_PROCESS_ACS,
  },
};

module.exports = config;
