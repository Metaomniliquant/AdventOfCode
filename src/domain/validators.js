/**
 * Shared validation utilities for domain value objects
 * These functions implement security-critical validation logic
 * to prevent path traversal attacks and ensure data integrity
 */

/**
 * Validates that a value is a valid number within range
 * @param {string|number} value - The value to validate
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @param {string} type - Type name for error messages
 * @returns {number} The parsed number
 * @throws {Error} If validation fails
 */
function validateNumberInRange(value, min, max, type) {
  if (value === null || value === undefined) {
    throw new Error(`Invalid ${type}: "${value}" is not a valid number`);
  }
  
  const num = typeof value === 'string' ? parseInt(value, 10) : Number(value);
  
  if (isNaN(num) || !isFinite(num)) {
    throw new Error(`Invalid ${type}: "${value}" is not a valid number`);
  }
  
  if (num < min || num > max) {
    throw new Error(`Invalid ${type}: ${num} must be between ${min} and ${max}`);
  }
  
  return num;
}

/**
 * Validates that a string contains no path traversal characters
 * @param {string} value - The value to check
 * @param {string} type - Type name for error messages
 * @throws {Error} If path traversal characters are found
 */
function validateNoPathTraversal(value, type) {
  const str = String(value).trim();
  if (str.includes('/') || str.includes('\\') || str.includes('..')) {
    throw new Error(`Invalid ${type}: "${value}" contains illegal path characters`);
  }
}

module.exports = {
  validateNumberInRange,
  validateNoPathTraversal
};
