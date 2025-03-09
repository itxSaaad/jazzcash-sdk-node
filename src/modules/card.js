const { postRequest } = require('../core/httpClient');
const generateSecureHash = require('../core/secureHash');
const config = require('../config');
const { buildEndpoint } = require('../endpoints/endpoint');

const DEFAULT_VALUES = {
  INSTRUMENT_TYPE: 'Card',
  VERSION: config.apiVersion,
  CURRENCY: 'PKR',
};

const ENDPOINTS = {
  AUTHORIZE: '/authorize/AuthorizePayment',
  CAPTURE: '/authorize/Capture',
  VOID: '/authorize/Void',
  REFUND: '/authorize/Refund',
  STATUS: '/PaymentInquiry/Inquire',
  DIRECT_PAY: '/DirectPay',
};

const fieldOrders = {
  AUTHORIZE: [
    'pp_InstrumentType',
    'pp_TxnRefNo',
    'pp_Amount',
    'pp_TxnCurrency',
    'pp_CustomerCardNumber',
    'pp_CustomerCardExpiry',
    'pp_CustomerCardCvv',
    'pp_MerchantID',
    'pp_Password',
    'pp_Frequency',
  ],
  CAPTURE: [
    'pp_TxnRefNo',
    'pp_Amount',
    'pp_TxnCurrency',
    'pp_MerchantID',
    'pp_Password',
  ],
  VOID: ['pp_TxnRefNo', 'pp_MerchantID', 'pp_Password'],
  REFUND: [
    'pp_TxnRefNo',
    'pp_Amount',
    'pp_TxnCurrency',
    'pp_MerchantID',
    'pp_Password',
  ],
  STATUS: ['pp_TxnRefNo', 'pp_MerchantID', 'pp_Password', 'pp_Version'],
  DIRECT_PAY: [
    'pp_InstrumentType',
    'pp_TxnRefNo',
    'pp_Amount',
    'pp_TxnCurrency',
    'pp_CustomerCardNumber',
    'pp_CustomerCardExpiry',
    'pp_CustomerCardCvv',
    'pp_MerchantID',
    'pp_Password',
    'pp_Frequency',
  ],
};

/**
 * @desc Validate data for required fields
 *
 * @param {Object} data - Data to be validated
 * @param {Array} requiredFields - Required fields for the API
 *
 * @returns {void}
 * @throws {Error} - If any required field is missing
 */

function validateData(data, requiredFields) {
  const missing = requiredFields.filter((field) => !data[field]);
  if (missing.length) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
}

/**
 * @desc Call the card API
 *
 * @param {string} type - API type
 * @param {Object} data - API data
 *
 * @returns {Promise<Object>} API response
 * @throws {Error} If API type is invalid or data is missing
 */

async function callCardAPI(type, data) {
  try {
    if (!fieldOrders[type]) {
      throw new Error(`Invalid API type: ${type}`);
    }

    validateData(data, fieldOrders[type]);

    const enrichedData = {
      pp_Version: DEFAULT_VALUES.VERSION,
      pp_MerchantID: config.merchantId,
      pp_Password: config.password,
      pp_TxnCurrency: DEFAULT_VALUES.CURRENCY,
      ...data,
    };

    enrichedData.pp_SecureHash = generateSecureHash(
      config.hashKey,
      fieldOrders[type],
      enrichedData
    );

    const endpoint = buildEndpoint(ENDPOINTS[type]);
    const payloadKey = type === 'STATUS' ? '' : `${type}Request`;
    const payload = payloadKey ? { [payloadKey]: enrichedData } : enrichedData;

    const response = await postRequest(endpoint, payload);
    return response;
  } catch (error) {
    throw new Error(`Card API Error (${type}): ${error.message}`);
  }
}

/**
 * @desc Authorize a payment
 *
 * @param {Object} data - Payment data
 *
 * @returns {Promise<Object>} API response
 * @throws {Error} If data is missing
 */

async function authorize(data) {
  data.pp_InstrumentType = DEFAULT_VALUES.INSTRUMENT_TYPE;
  return callCardAPI('AUTHORIZE', data);
}

/**
 * @desc Capture a payment
 *
 * @param {Object} data - Payment data
 *
 * @returns {Promise<Object>} API response
 * @throws {Error} If data is missing
 */

async function capture(data) {
  return callCardAPI('CAPTURE', data);
}

/**
 * @desc Void a payment
 *
 * @param {Object} data - Payment data
 *
 * @returns {Promise<Object>} API response
 * @throws {Error} If data is missing
 */

async function voidPayment(data) {
  return callCardAPI('VOID', data);
}

/**
 * @desc Refund a payment
 *
 * @param {Object} data - Payment data
 *
 * @returns {Promise<Object>} API response
 * @throws {Error} If data is missing
 */

async function refund(data) {
  return callCardAPI('REFUND', data);
}

/**
 * @desc Check payment status
 *
 * @param {Object} data - Payment data
 *
 * @returns {Promise<Object>} API response
 * @throws {Error} If data is missing
 */

async function statusInquiry(data) {
  return callCardAPI('STATUS', data);
}

/**
 * @desc Direct pay using card
 *
 * @param {Object} data - Payment data
 *
 * @returns {Promise<Object>} API response
 * @throws {Error} If data is missing
 */

async function directPay(data) {
  data.pp_InstrumentType = DEFAULT_VALUES.INSTRUMENT_TYPE;
  return callCardAPI('DIRECT_PAY', data);
}

module.exports = {
  authorize,
  capture,
  voidPayment,
  refund,
  statusInquiry,
  directPay,
};
