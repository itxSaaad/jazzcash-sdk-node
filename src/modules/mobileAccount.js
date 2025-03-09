const { postRequest } = require('../core/httpClient');
const generateSecureHash = require('../core/secureHash');
const config = require('../config');
const buildEndpoint = require('../endpoints/endpoint');

const DEFAULT_VALUES = {
  VERSION: config.apiVersion,
  TXN_TYPE: 'MWALLET',
  LANGUAGE: 'EN',
  CURRENCY: 'PKR',
};

const fieldOrders = [
  'pp_Version',
  'pp_TxnType',
  'pp_Language',
  'pp_MerchantID',
  'pp_SubMerchantID',
  'pp_Password',
  'pp_TxnRefNo',
  'pp_Amount',
  'pp_TxnCurrency',
  'pp_TxnDateTime',
  'pp_BillReference',
  'pp_Description',
  'pp_TxnExpiryDateTime',
  'pp_ReturnURL',
];

/**
 * @desc Process a Mobile Account payment (REST).
 *
 * @param {Object} data - Mobile Account payment data.
 *
 * @returns {Promise<Object>} Response from JazzCash API
 * @throws {Error} If required fields are missing
 */

async function mobileAccountPayment(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Payment data is required and must be an object');
  }

  const requiredFields = ['pp_Amount', 'pp_TxnRefNo'];
  const missingFields = requiredFields.filter((field) => !data[field]);
  if (missingFields.length) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  const paymentData = {
    ...data,
    pp_Version: data.pp_Version || DEFAULT_VALUES.VERSION,
    pp_TxnType: DEFAULT_VALUES.TXN_TYPE,
    pp_Language: data.pp_Language || DEFAULT_VALUES.LANGUAGE,
    pp_MerchantID: config.merchantId,
    pp_Password: config.password,
    pp_TxnCurrency: data.pp_TxnCurrency || DEFAULT_VALUES.CURRENCY,
  };

  paymentData.pp_SecureHash = generateSecureHash(
    config.hashKey,
    fieldOrders,
    paymentData
  );

  try {
    const endpoint = buildEndpoint('Purchase/DoMWalletTransaction');
    return await postRequest(endpoint, paymentData);
  } catch (error) {
    throw new Error(`Payment processing failed: ${error.message}`);
  }
}

module.exports = { mobileAccountPayment };
