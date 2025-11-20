/**
 * Validates language string format
 * @param {string} value - The language name to validate
 * @returns {string} The trimmed value
 * @throws {Error} If validation fails
 */
function validateLanguageFormat(value) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error('Invalid language: must be a non-empty string');
  }
  
  const trimmed = value.trim();
  
  // Validate: only alphanumeric, hyphens, underscores, and plus signs allowed
  // This prevents path traversal and other injection attacks
  if (!/^[a-zA-Z0-9+#_-]+$/.test(trimmed)) {
    throw new Error(`Invalid language: "${value}" contains illegal characters. Only alphanumeric, +, #, -, and _ are allowed`);
  }
  
  // Validate: cannot start with dot or hyphen (hidden files or flags)
  if (trimmed.startsWith('.') || trimmed.startsWith('-')) {
    throw new Error(`Invalid language: "${value}" cannot start with . or -`);
  }
  
  // Validate: reasonable length (prevent DoS)
  if (trimmed.length > 50) {
    throw new Error(`Invalid language: "${value}" is too long (max 50 characters)`);
  }
  
  return trimmed;
}

/**
 * Language Value Object
 * Represents a valid programming language name
 * Immutable and self-validating
 */
class Language {
  #value;
  #normalizedValue;

  /**
   * @param {string} value - The language name
   * @throws {Error} If language is invalid
   */
  constructor(value) {
    const trimmed = validateLanguageFormat(value);
    
    this.#value = trimmed;
    this.#normalizedValue = trimmed.toLowerCase();
    Object.freeze(this);
  }

  /**
   * Gets the original language name
   * @returns {string}
   */
  toString() {
    return this.#value;
  }

  /**
   * Gets the normalized (lowercase) language name
   * @returns {string}
   */
  toNormalized() {
    return this.#normalizedValue;
  }

  /**
   * Gets the folder name for this language
   * @returns {string}
   */
  toFolderName() {
    return this.#normalizedValue;
  }

  /**
   * Checks equality with another Language
   * @param {Language} other
   * @returns {boolean}
   */
  equals(other) {
    return other instanceof Language && this.#normalizedValue === other.#normalizedValue;
  }
}

module.exports = Language;
