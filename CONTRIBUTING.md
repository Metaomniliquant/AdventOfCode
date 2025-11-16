# Contributing to Advent of Code Repository

Thank you for your interest in contributing! This document provides guidelines for contributing to this BDD-driven, multi-language Advent of Code repository.

## 🎯 Overview

This repository uses Behavior-Driven Development (BDD) with Cucumber.js to ensure consistent structure and quality. All contributions should follow the established patterns.

## 📋 Before You Start

1. Read the README.md to understand the repository structure
2. Review the BDD features in the `features/` directory
3. Run the tests locally: `npm test`
4. Check the GitHub Actions workflow to understand CI/CD requirements

## 🚀 Adding Your Solutions

### Step 1: Create the Folder Structure

Use the CLI tool to maintain consistency:

```bash
# Create a year folder (if it doesn't exist)
node src/cli/setup.js year 2024

# Create a puzzle folder
node src/cli/setup.js puzzle 2024 1

# Add your language solution
node src/cli/setup.js language 2024 1 Python
```

### Step 2: Implement Your Solution

Follow the template provided in the language-specific folder:

**JavaScript Example:**
```javascript
function solve(input) {
  // Parse the input
  const lines = input.trim().split('\n');
  
  // Implement your solution
  // ...
  
  return result;
}

module.exports = { solve };
```

**Python Example:**
```python
def solve(input_data):
    """Solve the puzzle"""
    lines = input_data.strip().split('\n')
    
    # Implement your solution
    # ...
    
    return result
```

### Step 3: Add Tests

Write tests for your solution:

**JavaScript:**
```javascript
const { solve } = require('./solution');

test('example case', () => {
  const input = '...';
  expect(solve(input)).toBe(expectedResult);
});
```

**Python:**
```python
from solution import solve

def test_example_case():
    input_data = '...'
    assert solve(input_data) == expected_result
```

### Step 4: Add Your Input

Place your puzzle input in the `input/` folder:
```
2024/day01/input/input.txt
```

## 🧪 Testing Your Contribution

### Run BDD Tests

```bash
npm test
```

This validates:
- Folder structure follows conventions
- Naming is consistent (zero-padded days)
- All BDD scenarios pass

### Run Language-Specific Tests

**JavaScript:**
```bash
cd 2024/day01/javascript
npm test
```

**Python:**
```bash
cd 2024/day01/python
pytest -v
```

**Go:**
```bash
cd 2024/day01/go
go test -v
```

## 📝 Folder Structure Rules

### ✅ Correct

```
2024/
├── day01/
├── day02/
├── day15/
└── day25/
```

### ❌ Incorrect

```
2024/
├── day1/     # Missing zero-padding
├── Day02/    # Wrong capitalization
├── 15/       # Missing 'day' prefix
└── puzzle25/ # Wrong naming convention
```

## 🌐 Adding Support for a New Language

1. **Create the template** in `src/utils/folderManager.js`:
```javascript
case 'rust':
  fs.writeFileSync(
    path.join(langPath, 'solution.rs'),
    '// Your Rust template here\n'
  );
  break;
```

2. **Add CI/CD support** in `.github/workflows/ci.yml`:
```yaml
test-rust:
  name: Test Rust Solutions
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Setup Rust
      uses: actions-rs/toolchain@v1
    - name: Run tests
      run: cargo test
```

3. **Update documentation** in README.md

4. **Add a BDD test** if needed

## 🔄 Pull Request Guidelines

### PR Title Format

Use descriptive titles:
- `Add Python solution for 2024 Day 1`
- `Add Rust language support`
- `Fix folder structure validation`

### PR Description

Include:
- What problem does this solve?
- Which puzzle/day does this address?
- What language(s) are involved?
- Have you run all tests?

### PR Checklist

- [ ] Code follows the established folder structure
- [ ] BDD tests pass (`npm test`)
- [ ] Language-specific tests pass
- [ ] No lint errors
- [ ] Documentation updated (if applicable)
- [ ] CI/CD pipeline passes

## 🐛 Reporting Issues

### Bug Reports

Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)

### Feature Requests

Include:
- Clear use case
- How it fits with BDD approach
- Potential implementation ideas

## 💡 Best Practices

### Code Quality

1. **Write clean, readable code**
   - Use meaningful variable names
   - Add comments for complex logic
   - Follow language-specific conventions

2. **Optimize for clarity first**
   - Make it work
   - Make it right
   - Make it fast (in that order)

3. **Write good tests**
   - Test edge cases
   - Use meaningful test names
   - Keep tests simple and focused

### Git Practices

1. **Commit messages**
   - Use clear, descriptive messages
   - Reference issue numbers if applicable
   - Example: `Add Python solution for Day 5 Part 2`

2. **Branch naming**
   - Use descriptive branch names
   - Example: `feature/2024-day05-python`

3. **Keep commits focused**
   - One logical change per commit
   - Don't mix refactoring with new features

## 🤖 GitHub Copilot Tips

This repository is optimized for GitHub Copilot:

1. **Open relevant files** for better context
2. **Use descriptive comments** to guide Copilot
3. **Follow the templates** provided
4. **Review suggestions** before accepting

Example prompt for Copilot:
```javascript
// Parse input into two lists of numbers, one per line
// Calculate the sum of differences between corresponding elements
```

## 📚 Resources

- [Advent of Code](https://adventofcode.com/)
- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## ❓ Questions?

- Check existing issues and discussions
- Review the BDD feature files for examples
- Ask in the discussions section

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎄✨
