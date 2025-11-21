# Domain Layer - Value Objects

This directory contains Domain-Driven Design (DDD) value objects that implement the "Parse, Don't Validate" principle for secure input handling.

## Overview

The value objects in this directory provide:
- **Security**: Prevention of path traversal and injection attacks
- **Type Safety**: Immutable objects with guaranteed validity
- **Domain Modeling**: Clear representation of domain concepts (Year, Day, Language)
- **Parse, Don't Validate**: If you have a valid value object, it's guaranteed to be safe
- **DRY Principle**: Shared validation logic in `validators.js` module

## Module Structure

```
src/domain/
├── Year.js              - Year value object (2015-2099)
├── Day.js               - Day value object (1-25)
├── Language.js          - Language value object (with character whitelist)
├── SafePath.js          - Safe path construction with boundary checking
├── validators.js        - Shared validation utilities (DRY principle)
├── validators.test.js   - Tests for shared validators
├── index.js             - Barrel export for clean imports
└── README.md            - This file
```

## Shared Validators

The `validators.js` module provides reusable validation functions used by multiple value objects:

```javascript
const { validateNumberInRange, validateNoPathTraversal } = require('./validators');

// Validate numbers within a range
const year = validateNumberInRange(2024, 2015, 2099, 'year'); // 2024
validateNumberInRange(2000, 2015, 2099, 'year'); // throws Error

// Validate no path traversal characters
validateNoPathTraversal('Python', 'language'); // OK
validateNoPathTraversal('../../etc', 'language'); // throws Error
```

This follows the DRY (Don't Repeat Yourself) principle by extracting common validation logic into a single, tested module.

## Value Objects

### Year

Represents a valid Advent of Code year (2015-2099).

```javascript
const { Year } = require('../domain');  // From utils/ or cli/
// or
const Year = require('./Year');  // From within domain/

// Valid usage
const year = new Year(2024);
year.toString();      // "2024"
year.toFolderName();  // "2024"

// Invalid usage - throws Error
new Year(1999);           // Too early
new Year("../../etc");    // Path traversal attempt
new Year("202x");         // Not a valid number
```

**Validation Rules:**
- Must be a 4-digit year
- Range: 2015-2099
- No path traversal characters (/, \, ..)

### Day

Represents a valid Advent of Code day (1-25).

```javascript
const { Day } = require('../domain');  // From utils/ or cli/
// or
const Day = require('./Day');  // From within domain/

// Valid usage
const day = new Day(1);
day.toNumber();       // 1
day.toPaddedString(); // "01"
day.toFolderName();   // "day01"

// Invalid usage - throws Error
new Day(0);           // Below range
new Day(26);          // Above range
new Day("../15");     // Path traversal attempt
```

**Validation Rules:**
- Must be a number
- Range: 1-25
- No path traversal characters

### Language

Represents a valid programming language name.

```javascript
const { Language } = require('../domain');  // From utils/ or cli/
// or
const Language = require('./Language');  // From within domain/

// Valid usage
const lang = new Language('Python');
lang.toString();       // "Python"
lang.toNormalized();   // "python"
lang.toFolderName();   // "python"

// Special characters allowed for language names
new Language('C++');   // Valid
new Language('C#');    // Valid
new Language('F_Sharp'); // Valid

// Invalid usage - throws Error
new Language('../../etc/passwd'); // Path traversal
new Language('lang/with/slash');  // Invalid chars
new Language('.hidden');          // Starts with dot
```

**Validation Rules:**
- Only alphanumeric, +, #, -, _ allowed
- Cannot start with . or -
- Maximum 50 characters
- Non-empty string

### SafePath

Represents a validated file system path that prevents traversal attacks.

```javascript
const { SafePath } = require('../domain');  // From utils/ or cli/
// or
const SafePath = require('./SafePath');  // From within domain/

// Valid usage
const basePath = '/home/user/project/src';
const safePath = new SafePath(basePath, '2024', 'day01', 'python');
safePath.toString(); // "/home/user/project/src/2024/day01/python"

// Append more segments
const filePath = safePath.append('solution.py');
filePath.toString(); // "/home/user/project/src/2024/day01/python/solution.py"

// Invalid usage - throws Error
new SafePath(basePath, '../../etc'); // Escapes base path
new SafePath(basePath, '/etc/passwd'); // Absolute path escape
```

**Security Features:**
- Uses `path.resolve()` to normalize paths
- Validates resolved path is within base path
- Prevents all forms of path traversal
- Immutable - cannot be modified after creation

## Design Principles

### Parse, Don't Validate

Traditional validation:
```javascript
// ❌ Validation approach - error-prone
function createFolder(year) {
  if (!isValidYear(year)) throw new Error('Invalid');
  // year is still just a string - could be used unsafely later
  const path = `src/${year}`; // Vulnerable to path traversal
}
```

Parse, Don't Validate:
```javascript
// ✅ Parse approach - type-safe
function createFolder(year) {
  const yearVO = new Year(year); // Throws if invalid
  // yearVO is guaranteed to be valid - type system enforces safety
  const path = new SafePath(basePath, yearVO.toFolderName());
}
```

### Immutability

All value objects are immutable and frozen:
```javascript
const year = new Year(2024);
year.value = 2025; // Error: Cannot modify frozen object
```

### Fail Fast

Validation happens at construction time:
```javascript
// Exception thrown immediately
const year = new Year('invalid'); // Error: Invalid year
// No need to check validity later - if you have a Year, it's valid
```

## Security Benefits

1. **Path Traversal Prevention**: All inputs validated before use
2. **Injection Attack Prevention**: Strict character whitelisting
3. **Type Safety**: Immutable objects with guaranteed invariants
4. **Audit Trail**: Clear point of validation for security reviews
5. **Defense in Depth**: Multiple layers (value objects + SafePath)

## Usage in folderManager.js

The `folderManager.js` now uses these value objects:

```javascript
function createYearFolder(year) {
  // Parse and validate
  const yearVO = year instanceof Year ? year : new Year(year);
  
  // Safe path construction
  const yearPath = new SafePath(getBasePath(), yearVO.toFolderName());
  
  // Use the validated path
  fs.mkdirSync(yearPath.toString(), { recursive: true });
}
```

This approach:
- Validates all inputs at the boundary
- Makes illegal states unrepresentable
- Provides clear error messages
- Maintains backward compatibility (accepts strings)

## Testing

All value objects are tested for:
- Valid input acceptance
- Invalid input rejection
- Path traversal prevention
- Immutability
- Correct output formats

See the test file in the CLI for examples.
