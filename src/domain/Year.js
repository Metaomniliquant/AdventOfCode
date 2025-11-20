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
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  
  if (isNaN(num)) {
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

/**
 * Year Value Object
 * Represents a valid Advent of Code year (2015-2099)
 * Immutable and self-validating - if you have a Year instance, it's guaranteed to be valid
 */
class Year {
  #value;

  /**
   * @param {string|number} value - The year value
   * @throws {Error} If year is invalid
   */
  constructor(value) {
    const year = validateNumberInRange(value, 2015, 2099, 'year');
    
    // Validate: string representation must be exactly 4 digits (no path traversal)
    const yearString = String(value).trim();
    if (!/^\d{4}$/.test(yearString)) {
      throw new Error(`Invalid year format: "${value}" must be exactly 4 digits`);
    }
    
    validateNoPathTraversal(value, 'year');
    
    this.#value = year;
    Object.freeze(this);
  }

  /**
   * Gets the year as a number
   * @returns {number}
   */
  toNumber() {
    return this.#value;
  }

  /**
   * Gets the year as a 4-digit string
   * @returns {string}
   */
  toString() {
    return String(this.#value);
  }

  /**
   * Gets the folder name for this year
   * @returns {string}
   */
  toFolderName() {
    return this.toString();
  }

  /**
   * Checks equality with another Year
   * @param {Year} other
   * @returns {boolean}
   */
  equals(other) {
    return other instanceof Year && this.#value === other.#value;
  }
}

module.exports = Year;
