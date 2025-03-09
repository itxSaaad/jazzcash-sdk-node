const config = require('../config');

const VALID_API_VERSIONS = ['1.0', '2.0'];

/**
 * @desc Get the base API path based on API version
 *
 * @returns {string} Base path
 * @throws {Error} If API version is invalid
 */

function getBasePath() {
  if (!config.apiVersion || !VALID_API_VERSIONS.includes(config.apiVersion)) {
    throw new Error(`Invalid API version: ${config.apiVersion}`);
  }

  return config.apiVersion === '2.0'
    ? '/ApplicationAPI/API/2.0'
    : '/ApplicationAPI/API';
}

/**
 * @desc Build the full endpoint URL
 *
 * @param {string} path - Endpoint path (e.g., "/Authorize")
 *
 * @returns {string} Full endpoint URL
 * @throws {Error} If path is missing or invalid
 */

function buildEndpoint(path) {
  if (!path || typeof path !== 'string') {
    throw new Error('Path must be a non-empty string');
  }

  const baseUrl =
    config.environment === 'live' ? config.liveUrl : config.sandboxUrl;

  if (!baseUrl) {
    throw new Error('Base URL not configured');
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${getBasePath()}${normalizedPath}`;
}

module.exports = {
  buildEndpoint,
  getBasePath,
};
