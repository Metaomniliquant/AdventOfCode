# Security Advisory: Path Traversal Vulnerability Fix

## Summary

A path traversal vulnerability was identified and fixed in the folder management utilities (`src/utils/folderManager.js`). The vulnerability allowed malicious inputs to potentially create files and directories outside the intended `src/` directory.

## Vulnerability Details

**Severity**: High  
**Type**: CWE-22 Path Traversal  
**Affected Code**: `src/utils/folderManager.js` (lines 18, 50, 115, 140)

### Attack Vector

User-controlled inputs (year, day, language) were used directly in path construction without proper validation:

```javascript
// VULNERABLE CODE (before fix)
function createYearFolder(year) {
  const yearPath = path.join(getBasePath(), year); // No validation!
  fs.mkdirSync(yearPath, { recursive: true });
}

// Attack example:
createYearFolder('../../etc/malicious'); // Escapes src/ directory
```

### Impact

An attacker could:
1. Write files outside the `src/` directory
2. Overwrite critical system files (with appropriate permissions)
3. Create directories in unauthorized locations
4. Execute directory traversal attacks via CLI

## Fix Implementation

The vulnerability has been fixed using Domain-Driven Design (DDD) principles and the "Parse, Don't Validate" pattern.

### Solution Architecture

1. **Value Objects** (`src/domain/valueObjects.js`):
   - `Year`: Validates years (2015-2099, no path chars)
   - `Day`: Validates days (1-25, no path chars)
   - `Language`: Validates language names (alphanumeric + safe chars only)
   - `SafePath`: Ensures paths stay within base directory

2. **Immutability**: All value objects are immutable and frozen
3. **Fail Fast**: Validation occurs at construction time
4. **Type Safety**: If you have a valid value object, it's guaranteed safe

### Code Changes

**After Fix:**
```javascript
function createYearFolder(year) {
  // Parse and validate - throws on invalid input
  const yearVO = year instanceof Year ? year : new Year(year);
  
  // Safe path construction - prevents traversal
  const yearPath = new SafePath(getBasePath(), yearVO.toFolderName());
  
  // Use validated path
  fs.mkdirSync(yearPath.toString(), { recursive: true });
}

// Attack attempt now fails:
createYearFolder('../../etc/malicious'); // Error: Invalid year format
```

## Security Features

1. **Input Validation**:
   - Year: Must be 4-digit number (2015-2099)
   - Day: Must be number (1-25)
   - Language: Alphanumeric + `+#_-` only

2. **Path Traversal Prevention**:
   - `SafePath` uses `path.resolve()` to normalize paths
   - Validates resolved path is within base directory
   - Rejects any escape attempts

3. **Defense in Depth**:
   - Multiple validation layers
   - Value objects + SafePath validation
   - Template filename validation

4. **Character Whitelisting**:
   - No `/`, `\`, or `..` in inputs
   - Strict regex patterns for each input type

## Testing

All security fixes are verified by:
- Unit tests for value objects
- Integration tests via BDD scenarios
- Manual penetration testing

Example attack attempts that are now blocked:
```javascript
// All of these now throw errors:
new Year('../../etc');
new Day('../25');
new Language('../../etc/passwd');
new SafePath(basePath, '../../etc');
```

## Backward Compatibility

The fix maintains backward compatibility:
- Functions still accept string inputs (for CLI)
- Automatically converts to value objects
- Same public API
- All existing tests pass

## Recommendations

1. **Code Review**: Review any code that constructs file paths from user input
2. **Principle**: Always use value objects for domain inputs
3. **Pattern**: Follow "Parse, Don't Validate" pattern
4. **Testing**: Add security tests for all user inputs

## References

- **CWE-22**: Improper Limitation of a Pathname to a Restricted Directory
- **OWASP**: Path Traversal
- **Pattern**: Parse, Don't Validate
- **DDD**: Domain-Driven Design Value Objects

## Credits

Security fix implemented using Domain-Driven Design principles and value objects pattern.

---

**Status**: ✅ Fixed  
**Version**: Current  
**Date**: 2024-11-20
