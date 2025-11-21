/**
 * Tests for domain validation utilities
 * These tests drive the design of reusable validation functions
 */

const { validateNumberInRange, validateNoPathTraversal } = require('./validators');

describe('validators', () => {
  describe('validateNumberInRange', () => {
    it('should accept valid number within range', () => {
      expect(validateNumberInRange(2024, 2015, 2099, 'year')).toBe(2024);
      expect(validateNumberInRange(15, 1, 25, 'day')).toBe(15);
    });

    it('should accept valid string number within range', () => {
      expect(validateNumberInRange('2024', 2015, 2099, 'year')).toBe(2024);
      expect(validateNumberInRange('15', 1, 25, 'day')).toBe(15);
    });

    it('should throw error for non-numeric values', () => {
      expect(() => validateNumberInRange('abc', 1, 25, 'day')).toThrow(
        'Invalid day: "abc" is not a valid number'
      );
      expect(() => validateNumberInRange(null, 1, 25, 'day')).toThrow(
        'Invalid day: "null" is not a valid number'
      );
    });

    it('should throw error for values below minimum', () => {
      expect(() => validateNumberInRange(2014, 2015, 2099, 'year')).toThrow(
        'Invalid year: 2014 must be between 2015 and 2099'
      );
      expect(() => validateNumberInRange(0, 1, 25, 'day')).toThrow(
        'Invalid day: 0 must be between 1 and 25'
      );
    });

    it('should throw error for values above maximum', () => {
      expect(() => validateNumberInRange(2100, 2015, 2099, 'year')).toThrow(
        'Invalid year: 2100 must be between 2015 and 2099'
      );
      expect(() => validateNumberInRange(26, 1, 25, 'day')).toThrow(
        'Invalid day: 26 must be between 1 and 25'
      );
    });
  });

  describe('validateNoPathTraversal', () => {
    it('should accept values without path traversal characters', () => {
      expect(() => validateNoPathTraversal('2024', 'year')).not.toThrow();
      expect(() => validateNoPathTraversal('15', 'day')).not.toThrow();
      expect(() => validateNoPathTraversal('JavaScript', 'language')).not.toThrow();
    });

    it('should throw error for forward slash', () => {
      expect(() => validateNoPathTraversal('20/24', 'year')).toThrow(
        'Invalid year: "20/24" contains illegal path characters'
      );
    });

    it('should throw error for backslash', () => {
      expect(() => validateNoPathTraversal('20\\24', 'year')).toThrow(
        'Invalid year: "20\\24" contains illegal path characters'
      );
    });

    it('should throw error for dot-dot', () => {
      expect(() => validateNoPathTraversal('..', 'day')).toThrow(
        'Invalid day: ".." contains illegal path characters'
      );
      expect(() => validateNoPathTraversal('..2024', 'year')).toThrow(
        'Invalid year: "..2024" contains illegal path characters'
      );
    });

    it('should throw error for path traversal sequences', () => {
      expect(() => validateNoPathTraversal('../../etc', 'language')).toThrow(
        'Invalid language: "../../etc" contains illegal path characters'
      );
      expect(() => validateNoPathTraversal('..\\..\\etc', 'language')).toThrow(
        'Invalid language: "..\\..\\etc" contains illegal path characters'
      );
    });
  });
});
