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
 * Day Value Object
 * Represents a valid Advent of Code day (1-25)
 * Immutable and self-validating
 */
class Day {
  #value;

  /**
   * @param {string|number} value - The day value
   * @throws {Error} If day is invalid
   */
  constructor(value) {
    const day = validateNumberInRange(value, 1, 25, 'day');
    validateNoPathTraversal(value, 'day');
    
    this.#value = day;
    Object.freeze(this);
  }

  /**
   * Gets the day as a number
   * @returns {number}
   */
  toNumber() {
    return this.#value;
  }

  /**
   * Gets the day as a zero-padded string (e.g., "01", "15")
   * @returns {string}
   */
  toPaddedString() {
    return String(this.#value).padStart(2, '0');
  }

  /**
   * Gets the folder name for this day (e.g., "day01", "day15")
   * @returns {string}
   */
  toFolderName() {
    return `day${this.toPaddedString()}`;
  }

  /**
   * Checks equality with another Day
   * @param {Day} other
   * @returns {boolean}
   */
  equals(other) {
    return other instanceof Day && this.#value === other.#value;
  }
}

module.exports = Day;
