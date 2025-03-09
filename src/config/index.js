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
};

module.exports = config;
