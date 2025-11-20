const path = require('path');

/**
 * Validates that a resolved path is within the base path
 * @param {string} resolvedPath - The resolved absolute path
 * @param {string} basePath - The base path
 * @throws {Error} If path traversal is detected
 */
function validatePathWithinBase(resolvedPath, basePath) {
  const isWithinBase = resolvedPath.startsWith(basePath + path.sep) || resolvedPath === basePath;
  
  if (!isWithinBase) {
    throw new Error(
      `Path traversal detected: resolved path "${resolvedPath}" is outside base path "${basePath}"`
    );
  }
}

/**
 * SafePath Value Object
 * Represents a validated, safe file system path within the project
 * Prevents path traversal attacks by ensuring paths stay within bounds
 * Immutable and self-validating
 */
class SafePath {
  #resolvedPath;
  #basePath;

  /**
   * @param {string} basePath - The base path that all paths must be within
   * @param {...string} segments - Path segments to join
   * @throws {Error} If the resulting path escapes the base path
   */
  constructor(basePath, ...segments) {
    // Normalize base path
    this.#basePath = path.resolve(basePath);
    
    // Build the target path
    const targetPath = path.join(this.#basePath, ...segments);
    
    // Resolve to absolute path (eliminates .., ., and symlinks)
    this.#resolvedPath = path.resolve(targetPath);
    
    // Security check: ensure the resolved path is within the base path
    validatePathWithinBase(this.#resolvedPath, this.#basePath);
    
    Object.freeze(this);
  }

  /**
   * Gets the resolved absolute path
   * @returns {string}
   */
  toString() {
    return this.#resolvedPath;
  }

  /**
   * Gets the path value (alias for toString)
   * @returns {string}
   */
  getValue() {
    return this.#resolvedPath;
  }

  /**
   * Gets the base path
   * @returns {string}
   */
  getBasePath() {
    return this.#basePath;
  }

  /**
   * Creates a new SafePath by appending segments to this path
   * @param {...string} segments - Path segments to append
   * @returns {SafePath}
   */
  append(...segments) {
    // Use the original base path for validation
    const relativePath = path.relative(this.#basePath, this.#resolvedPath);
    return new SafePath(this.#basePath, relativePath, ...segments);
  }

  /**
   * Checks equality with another SafePath
   * @param {SafePath} other
   * @returns {boolean}
   */
  equals(other) {
    return other instanceof SafePath && this.#resolvedPath === other.#resolvedPath;
  }
}

module.exports = SafePath;
