const axios = require('axios');

/**
 * @desc Send an HTTP POST request with enhanced error handling and timeout.
 *
 * @param {string} url - The endpoint URL.
 * @param {Object} payload - The JSON payload.
 * @param {Object} [options] - Additional request options.
 * @param {number} [options.timeout=30000] - Request timeout in milliseconds.
 * @param {Object} [options.headers] - Additional headers to merge.
 *
 * @returns {Promise<Object>} - Resolves with the response data.
 * @throws {Error} - Enhanced error with status code and details.
 */

async function postRequest(url, payload) {
  try {
    const response = await axios.post(url, payload, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const detail = error.response?.data || error.message;

    throw new Error(
      `Failed to send POST request to ${url}: ${status} ${detail}`
    );
  }
}

module.exports = { postRequest };
