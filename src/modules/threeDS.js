const { postRequest } = require('../core/httpClient');
const generateSecureHash = require('../core/secureHash');
const config = require('../config');
const buildEndpoint = require('../endpoints/endpoint');

const fieldOrders = {
  threeDSecure: [
    'pp_Version',
    'pp_TxnType',
    'pp_TxnRefNo',
    'pp_Amount',
    'pp_TxnCurrency',
    'pp_TxnDateTime',
    'pp_TxnExpiryDateTime',
    'pp_BillReference',
    'pp_Description',
    'pp_CustomerCardNumber',
    'pp_CustomerCardExpiry',
    'pp_CustomerCardCvv',
    'pp_MerchantID',
    'pp_Password',
  ],
  acs: [
    'pp_Version',
    'pp_TxnType',
    'pp_TxnRefNo',
    'pp_3dSecureID',
    'pp_TxnDateTime',
    'pp_TxnExpiryDateTime',
    'pp_BillReference',
    'pp_Description',
    'paRes',
    'pp_MerchantID',
    'pp_Password',
  ],
};

const addCommonFields = (data) => ({
  ...data,
  pp_Version: data.pp_Version || config.apiVersion,
  pp_MerchantID: config.merchantId,
  pp_Password: config.password,
});

/**
 * @desc Check 3D Secure Enrollment for a card.
 *
 * @param {Object} data - Enrollment data.
 *
 * @returns {Promise<Object>}
 * @throws {Error} If required fields are missing
 */

async function check3DSecureEnrollment(data) {
  const enrichedData = {
    ...addCommonFields(data),
    pp_TxnType: 'MPAY',
    pp_TxnCurrency: data.pp_TxnCurrency || 'PKR',
  };

  enrichedData.pp_SecureHash = generateSecureHash(
    config.hashKey,
    fieldOrders.threeDSecure,
    enrichedData
  );

  return postRequest(
    buildEndpoint('Purchase/Check3DsEnrollment'),
    enrichedData
  );
}

/**
 * @desc Process ACS response after 3D Secure authentication.
 *
 * @param {Object} data - ACS response data.
 *
 * @returns {Promise<Object>}
 * @throws {Error} If required fields are missing
 */

async function processACS(data) {
  const enrichedData = addCommonFields(data);

  enrichedData.pp_SecureHash = generateSecureHash(
    config.hashKey,
    fieldOrders.acs,
    enrichedData
  );

  return postRequest(buildEndpoint('ProcessACS'), enrichedData);
}

module.exports = { check3DSecureEnrollment, processACS };
