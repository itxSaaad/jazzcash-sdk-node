const crypto = require('crypto');

/**
 * @desc Generate secure hash for JazzCash transactions.
 *
 * @param {string} hashKey - Your JazzCash hash key.
 * @param {Array} fieldOrder - Array of field names in order.
 * @param {Object} data - The transaction data.
 *
 * @returns {string} The generated secure hash.
 * @throws {Error} If any of the parameters are missing or invalid.
 * @throws {Error} If failed to generate secure hash.
 */

function generateSecureHash(hashKey, fieldOrder, data) {
  if (!hashKey || typeof hashKey !== 'string') {
    throw new Error('Hash key must be a non-empty string');
  }

  if (!Array.isArray(fieldOrder) || fieldOrder.length === 0) {
    throw new Error('Field order must be a non-empty array');
  }

  if (!data || typeof data !== 'object') {
    throw new Error('Data must be a non-empty object');
  }

  try {
    const rawString = [
      hashKey,
      ...fieldOrder.map((field) => data[field] || ''),
    ].join('&');

    return crypto
      .createHmac('SHA256', hashKey)
      .update(Buffer.from(rawString, 'utf-8'))
      .digest('hex');
  } catch (error) {
    throw new Error(`Failed to generate secure hash: ${error.message}`);
  }
}

module.exports = generateSecureHash;
