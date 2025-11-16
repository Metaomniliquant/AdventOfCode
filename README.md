# Advent of Code

A BDD-driven, multi-language repository for solving [Advent of Code](https://adventofcode.com/) puzzles with automated CI/CD pipelines.

## 🎯 Features

- **BDD with Cucumber.js**: Behavior-driven development ensures consistent folder structure and workflow
- **Multi-language Support**: Solve puzzles in JavaScript, Python, Go, Rust, Java, C++, TypeScript, and more
- **GitHub Actions CI/CD**: Automated testing and validation on every commit
- **Continuous Delivery**: Automated pipelines ensure code quality and structure consistency
- **Consistent Structure**: Standardized folder organization for easy navigation
- **GitHub Copilot Ready**: Well-documented and structured for optimal AI assistance

## 📁 Repository Structure

```
AdventOfCode/
├── YYYY/                    # Year folder (e.g., 2023, 2024)
│   ├── README.md           # Year overview
│   └── dayXX/              # Day folder (zero-padded: day01, day02, etc.)
│       ├── README.md       # Puzzle description and notes
│       ├── input/          # Input files
│       │   └── input.txt
│       ├── javascript/     # Language-specific solution
│       │   ├── solution.js
│       │   └── solution.test.js
│       ├── python/         # Another language solution
│       │   ├── solution.py
│       │   └── test_solution.py
│       └── go/             # Yet another language
│           ├── solution.go
│           └── solution_test.go
├── features/               # BDD feature files
├── src/                    # Utility scripts
└── .github/workflows/      # CI/CD pipelines
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- (Optional) Python 3.12+ for Python solutions
- (Optional) Go 1.21+ for Go solutions

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Metaomniliquant/AdventOfCode.git
cd AdventOfCode
```

2. Install dependencies:
```bash
npm install
```

### Creating Your First Puzzle

#### Using the CLI Tool

Create a year folder:
```bash
node src/cli/setup.js year 2024
```

Create a puzzle folder for a specific day:
```bash
node src/cli/setup.js puzzle 2024 1
```

Add a language-specific solution:
```bash
node src/cli/setup.js language 2024 1 Python
```

#### Manual Creation

The folder structure follows BDD-validated patterns. See the feature files in `features/` for specifications.

## 🧪 Testing

### Run BDD Tests

Execute all Cucumber scenarios:
```bash
npm test
```

Verbose output:
```bash
npm run test:verbose
```

### Run Language-Specific Tests

The CI/CD pipeline automatically detects and runs tests for:
- JavaScript (using built-in test runners or Jest)
- Python (using pytest)
- Go (using `go test`)

## 📋 BDD Features

This repository implements the following BDD scenarios:

### Repository Folder Structure
- ✅ Create a folder for a target year
- ✅ Add a puzzle to a year's folder
- ✅ Ensure consistent folder naming (zero-padded days)

### Language Flexibility
- ✅ Support for multiple programming languages
- ✅ Language-specific folder structure with templates

### GitHub Actions Pipeline
- ✅ Run tests on pull requests
- ✅ Multi-language build support
- ✅ Folder structure validation
- ✅ Continuous delivery checks

## 🔄 Continuous Delivery Principles

This repository follows CD best practices:

1. **Automated Testing**: All changes are tested automatically
2. **Validation Gates**: Folder structure and naming conventions are enforced
3. **Multi-Environment Support**: Works across different language environments
4. **Fast Feedback**: Quick test execution and clear error messages
5. **Version Control**: Everything is tracked in Git
6. **Reproducible Builds**: Consistent environments via GitHub Actions

## 🤖 GitHub Copilot Integration

This repository is optimized for GitHub Copilot:

- Clear folder structure and naming conventions
- Comprehensive documentation
- Template files for each language
- BDD scenarios guide development
- Consistent code patterns

### Tips for Using Copilot

1. Open a puzzle folder to get context-aware suggestions
2. Use comments to guide Copilot (e.g., `// Parse input into array of numbers`)
3. Copilot can help write tests based on examples
4. Ask Copilot to optimize solutions or suggest alternative approaches

## 🛠️ Supported Languages

Current language templates:
- **JavaScript**: Full support with test templates
- **Python**: pytest-compatible test structure
- **Go**: Standard Go testing framework
- **Rust, Java, C++, TypeScript**: Add your own templates!

### Adding a New Language

1. Create a language folder in your puzzle directory
2. Add solution and test files following language conventions
3. Update the CI/CD workflow if needed
4. Contribute your template to help others!

## 📖 Examples

### Example: Day 1 in Python

```python
# 2024/day01/python/solution.py
def solve(input_data):
    """Solve the puzzle"""
    lines = input_data.strip().split('\n')
    # Your solution here
    return result

if __name__ == "__main__":
    with open("../input/input.txt") as f:
        data = f.read()
    result = solve(data)
    print(result)
```

### Example: Day 1 in JavaScript

```javascript
// 2024/day01/javascript/solution.js
function solve(input) {
  const lines = input.trim().split('\n');
  // Your solution here
  return result;
}

module.exports = { solve };
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Follow the established folder structure
2. Run BDD tests before submitting
3. Add tests for new features
4. Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌟 Acknowledgments

- [Advent of Code](https://adventofcode.com/) by Eric Wastl
- Cucumber.js for BDD framework
- GitHub Actions for CI/CD

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check existing feature files for examples
- Review the CI/CD workflow for testing patterns

Happy coding and happy holidays! 🎄
