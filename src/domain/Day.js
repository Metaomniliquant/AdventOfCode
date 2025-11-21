const { validateNumberInRange, validateNoPathTraversal } = require('./validators');

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
