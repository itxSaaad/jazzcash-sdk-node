const config = require('../config');

/**
 * @desc Build the full endpoint URL
 *
 * @param {string} key - Endpoint key (e.g., AUTHORIZE, CAPTURE, etc.)
 *
 * @returns {string} Full endpoint URL
 * @throws {Error} If key is missing or invalid
 */

function buildEndpoint(key) {
  if (!key || typeof key !== 'string') {
    throw new Error('key must be a non-empty string');
  }

  const baseUrl =
    config.environment === 'live' ? config.liveUrl : config.sandboxUrl;

  if (config.endpoints && config.endpoints[key]) {
    return `${baseUrl}${config.endpoints[key]}`;
  }

  const normalizedKey = key.startsWith('/') ? key : `/${key}`;

  return `${baseUrl}/ApplicationAPI/API/${config.apiVersion}${normalizedKey}`;
}

module.exports = {
  buildEndpoint,
};
