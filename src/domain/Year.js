const { validateNumberInRange, validateNoPathTraversal } = require('./validators');

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
