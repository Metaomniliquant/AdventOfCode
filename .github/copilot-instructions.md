# Copilot Instructions for AdventOfCode Repository

## Repository Overview

This is a BDD-driven, multi-language repository for solving [Advent of Code](https://adventofcode.com/) puzzles with automated CI/CD pipelines. The repository emphasizes:

- **Behavior-Driven Development (BDD)** with Cucumber.js
- **Multi-language support** (JavaScript, Python, Go, Rust, Java, C++, TypeScript, etc.)
- **Consistent folder structure** validated by BDD tests
- **Continuous Delivery** principles with GitHub Actions

## Repository Structure

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
├── features/               # BDD feature files (Cucumber)
├── src/                    # Utility scripts and CLI tools
└── .github/
    ├── workflows/          # CI/CD pipelines
    ├── agents/             # Custom Copilot agents
    └── instructions/       # Domain-specific instructions
```

## Development Workflow

### Using the CLI Tool

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

### Folder Naming Conventions

- **Year folders**: Four digits (e.g., `2024`)
- **Day folders**: Zero-padded two digits with "day" prefix (e.g., `day01`, `day02`, ..., `day25`)
- **Language folders**: Lowercase language name (e.g., `javascript`, `python`, `go`)

## Testing

### BDD Tests

Run all Cucumber scenarios:
```bash
npm test
```

Verbose output:
```bash
npm run test:verbose
```

### Language-Specific Tests

- **JavaScript**: Use built-in test runners or Jest
- **Python**: Use pytest
- **Go**: Use `go test`

The CI/CD pipeline automatically detects and runs tests for each language.

## Code Style and Practices

### General Principles

- **BDD → ATDD → TDD**: Write features, acceptance tests, then unit tests before implementation
- **Functional programming**: Favor immutability, pure functions, and composition
- **Test-driven**: Write tests before implementation
- **Clean code**: Clear naming, small functions, single responsibility

### Commit Messages

Follow Conventional Commits format as defined in `.github/instructions/commit-message.instructions.md`:

```
type(scope): subject

- type: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- scope: Optional, e.g., cli, bdd, day01, python
- subject: Imperative, lowercase, ≤50 chars, no period
```

Examples:
```
feat(day01): add JavaScript solution for part 1
fix(cli): correct year folder validation
docs(readme): update installation instructions
test(bdd): add scenario for Python solutions
```

## Custom Agents

This repository has specialized Copilot agents for different tasks:

- **@bdd-expert**: Review and improve Gherkin feature files
- **@ddd-expert**: Guide domain modeling and design patterns
- **@test-quality-reviewer**: Review unit, integration, and acceptance tests
- **@ui-styling-expert**: Review layout and styling patterns
- **@application-architecture-expert**: Review system design and architecture

Use these agents proactively during development. See `docs/github-copilot-development-guide.md` for detailed guidance.

## Common Tasks

### Adding a New Puzzle Solution

1. Ensure the year and day folders exist (use CLI if needed)
2. Create a language-specific folder in the day directory
3. Add solution file (e.g., `solution.js`, `solution.py`)
4. Add test file following language conventions
5. Add puzzle input to `input/input.txt`
6. Update the day's README.md with notes or approach

### Adding a New Language Template

1. Create the language folder in a day directory
2. Add solution and test files following language conventions
3. Ensure the CI/CD workflow can detect and run tests
4. Consider adding templates for future use

### Working with BDD Features

1. Feature files are in `features/` directory
2. Step definitions are in `features/step_definitions/`
3. Run tests with `npm test` to validate structure
4. BDD tests ensure folder structure consistency

## Important Files

- **`src/cli/setup.js`**: CLI tool for creating folders and files
- **`cucumber.js`**: Cucumber configuration
- **`package.json`**: Node.js dependencies and scripts
- **`features/*.feature`**: BDD scenarios for repository structure
- **`docs/github-copilot-development-guide.md`**: Comprehensive development guide

## Best Practices

### When Adding Solutions

- Keep solutions focused and readable
- Add comments to explain non-obvious logic
- Include test cases with different inputs
- Handle edge cases appropriately
- Consider algorithmic complexity for larger inputs

### When Modifying Structure

- Run BDD tests to ensure structure remains valid
- Update feature files if changing folder conventions
- Keep the CLI tool in sync with structure changes
- Update documentation to reflect changes

### When Adding Tests

- Test behavior, not implementation details
- Use descriptive test names
- Keep tests independent and isolated
- Include edge cases and error conditions
- Use @test-quality-reviewer agent for review

## Continuous Integration

GitHub Actions automatically:
- Runs BDD tests to validate structure
- Executes language-specific tests
- Validates folder naming conventions
- Checks for consistent patterns

Ensure all tests pass before merging pull requests.

## Additional Resources

- **Development Guide**: `docs/github-copilot-development-guide.md`
- **Commit Guidelines**: `.github/instructions/commit-message.instructions.md`
- **BDD Features**: `features/` directory
- **Advent of Code**: https://adventofcode.com/

## Quick Reference

### Running Tests
```bash
npm test                # Run BDD tests
npm run test:verbose    # Run BDD tests with verbose output
```

### Creating Structure
```bash
node src/cli/setup.js year <year>              # Create year folder
node src/cli/setup.js puzzle <year> <day>      # Create day folder
node src/cli/setup.js language <year> <day> <Language>  # Add language solution
```

### Common Paths
- BDD features: `features/`
- Solution code: `YYYY/dayXX/<language>/`
- Puzzle inputs: `YYYY/dayXX/input/input.txt`
- CLI tool: `src/cli/setup.js`
- Workflows: `.github/workflows/`

---

**Remember**: This repository values clean code, comprehensive testing, and consistent structure. Use the custom agents to get expert feedback, and follow the BDD → ATDD → TDD workflow for the best results.
