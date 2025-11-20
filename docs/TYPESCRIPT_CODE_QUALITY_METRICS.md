# TypeScript Code Quality Metrics

This document describes the TypeScript code quality metrics we use in this repository, powered by FTA (Fast TypeScript Analyzer).

## Table of Contents

- [Overview](#overview)
- [Why FTA?](#why-fta)
- [Metrics Explained](#metrics-explained)
- [Configuration](#configuration)
- [Usage](#usage)
- [Interpreting Results](#interpreting-results)
- [Improving Your Score](#improving-your-score)
- [CI/CD Integration](#cicd-integration)
- [References](#references)

## Overview

We use [FTA (Fast TypeScript Analyzer)](https://ftaproject.dev/) to measure and enforce code quality standards for TypeScript code in this repository. FTA is a super-fast static analysis tool written in Rust that analyzes TypeScript and JavaScript code to provide insights into complexity and maintainability.

**Key Benefits:**
- **Objective metrics**: Quantifiable measures of code complexity
- **Early detection**: Catch quality issues before code review
- **Baseline tracking**: Monitor code quality trends over time
- **Automated enforcement**: CI pipeline fails if thresholds are exceeded
- **Fast feedback**: Analyzes up to 1600 files per second

## Why FTA?

FTA was chosen for this project because it:

1. **Provides comprehensive metrics** - Including cyclomatic complexity, Halstead metrics, and a composite FTA score
2. **Is extremely fast** - Written in Rust, it can analyze large codebases quickly
3. **Integrates easily** - Simple CLI tool that works in CI/CD pipelines
4. **Offers clear assessments** - Provides human-readable quality assessments (OK, Could be better, Needs improvement)
5. **Supports TypeScript natively** - Built specifically for TypeScript/JavaScript analysis

## Metrics Explained

FTA calculates several metrics for each file:

### FTA Score (Primary Metric)

The **FTA Score** is a composite score that provides a general indication of file quality. Lower scores are better.

**Score Ranges:**
- **0-50**: OK - Generally well-structured code
- **50-60**: Could be better - Consider refactoring if complexity increases
- **60+**: Needs improvement - Should be refactored to improve maintainability

Our repository uses a **score cap of 50** - files exceeding this threshold will cause CI to fail.

### Cyclomatic Complexity

Measures the number of independent paths through the code. Higher values indicate more complex control flow.

- **1-10**: Simple, easy to test
- **11-20**: More complex, may need refactoring
- **21+**: Very complex, difficult to maintain

### Halstead Metrics

A set of metrics that measure software complexity based on operator and operand counts:

- **Volume**: Size of the implementation
- **Difficulty**: How difficult the code is to write and understand
- **Effort**: Mental effort required to develop/maintain the code
- **Time**: Estimated time to program (in seconds)
- **Bugs**: Estimated number of bugs based on complexity

### Line Count

Total number of lines in the file (excluding what's configured to be excluded).

### Assessment

Human-readable quality assessment based on the FTA score:
- **OK**: Code quality is acceptable
- **Could be better**: Consider improvements
- **Needs improvement**: Refactoring recommended

## Configuration

FTA configuration is stored in `.ftarc.json` at the repository root:

```json
{
  "scoreCap": 50,
  "includeComments": false,
  "excludeUnder": 6,
  "outputLimit": 5000
}
```

**Configuration Options:**

- **scoreCap** (50): Maximum allowed FTA score; files exceeding this will cause CI to fail
- **includeComments** (false): Whether to include code comments in the analysis
- **excludeUnder** (6): Minimum line count for files to be included in analysis
- **outputLimit** (5000): Maximum number of files to display in table output

### Why Score Cap of 50?

Based on our baseline analysis and refactoring efforts, all current files now score below 50:
- `src/2024/day01/typescript/solution.ts`: 41.34 (OK)
- `src/2024/day01/typescript/solution.test.ts`: 12.77 (OK)
- `src/utils/folderManager.js`: 47.99 (OK) - refactored from 51.51
- `src/utils/languageTemplates.js`: 10.99 (OK) - extracted from folderManager

A score cap of 50 provides:
- ✅ Stricter threshold for maintainable code
- ✅ Encourages proactive refactoring before complexity grows
- ✅ Clear boundary at the "OK" vs "Could be better" assessment
- ✅ All current code meets this standard

## Usage

### Running Locally

Check code quality for all TypeScript files:

```bash
npm run fta:typescript
```

Or use the generic FTA command (analyzes all JavaScript/TypeScript):

```bash
npm run fta
```

**Example Output:**

```
┌───────────────────────┬────────────┬───────────────────────┬─────────────────┐
│ File                  ┆ Num. lines ┆ FTA Score (Lower is   ┆ Assessment      │
│                       ┆            ┆ better)               ┆                 │
╞═══════════════════════╪════════════╪═══════════════════════╪═════════════════╡
│ 2024/day01/typescript ┆ 32         ┆ 41.34                 ┆ OK              │
│ /solution.ts          ┆            ┆                       ┆                 │
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
│ 2024/day01/typescript ┆ 91         ┆ 12.77                 ┆ OK              │
│ /solution.test.ts     ┆            ┆                       ┆                 │
└───────────────────────┴────────────┴───────────────────────┴─────────────────┘
2 files analyzed in 0.0096s.
```

### Getting JSON Output

For programmatic analysis or detailed metrics:

```bash
npx fta-cli src --config-path .ftarc.json --json
```

This returns full metrics for each file including all Halstead metrics.

## Interpreting Results

### What to Focus On

1. **Files with scores > 50**: Consider refactoring to improve maintainability
2. **High cyclomatic complexity**: Break down complex functions into smaller ones
3. **High Halstead difficulty**: Simplify logic, improve naming, reduce nesting

### When to Refactor

You should consider refactoring when:

- ❌ **FTA Score > 50**: CI will fail; refactoring required
- ⚠️ **FTA Score 45-50**: Proactive refactoring recommended
- ⚠️ **Cyclomatic Complexity > 15**: Consider breaking down functions
- ⚠️ **File > 200 lines**: Consider splitting into smaller modules

### Good Practices

To maintain good FTA scores:

- ✅ **Keep functions small** - Single Responsibility Principle
- ✅ **Reduce nesting** - Use early returns, guard clauses
- ✅ **Extract complex logic** - Into well-named helper functions
- ✅ **Use clear names** - Reduce cognitive load
- ✅ **Avoid deep conditionals** - Simplify branching logic
- ✅ **Write modular code** - Separate concerns appropriately

## Improving Your Score

### Common Patterns to Avoid

**❌ Deep Nesting:**
```typescript
if (condition1) {
  if (condition2) {
    if (condition3) {
      // deeply nested logic
    }
  }
}
```

**✅ Early Returns:**
```typescript
if (!condition1) return;
if (!condition2) return;
if (!condition3) return;
// logic at top level
```

**❌ Long Functions:**
```typescript
function processData(data) {
  // 50+ lines of logic
  // multiple responsibilities
  // high complexity
}
```

**✅ Extracted Functions:**
```typescript
function processData(data) {
  const validated = validateData(data);
  const transformed = transformData(validated);
  return persistData(transformed);
}
```

### Refactoring Strategies

1. **Extract Method**: Pull complex logic into separate functions
2. **Replace Conditional with Polymorphism**: Use object-oriented patterns
3. **Simplify Conditional Expressions**: Use guard clauses, combine conditions
4. **Decompose Complex Logic**: Break into smaller, testable units
5. **Use Higher-Order Functions**: Leverage map, filter, reduce instead of loops

## CI/CD Integration

FTA runs automatically in the CI pipeline for TypeScript solutions:

### When It Runs

FTA analysis runs in the `test-typescript` job when:
- Commits/PRs mention "typescript" in the message/title
- Any push to `main` or `develop` branches

### What Happens

1. **Type Checking**: `npm run typecheck:typescript`
2. **Linting**: `npm run lint:typescript`
3. **FTA Analysis**: `npm run fta:typescript` ← **New step**
4. **Unit Tests**: `npm run test:typescript`

### When It Fails

The CI pipeline will fail if:

- ❌ Any file exceeds the score cap of 50
- ❌ The error message will show: `File <name> has a score of X, which is beyond the score cap of 50, exiting.`

**Resolution:**
- Review the file(s) that failed
- Refactor to reduce complexity (see refactoring strategies above)
- Re-run FTA locally to verify improvement
- Push changes

### Bypassing for Legitimate Cases

If you have a legitimate case where a file must exceed 50 (e.g., generated code, complex algorithm):

1. **First, try to refactor** - Most code can be improved
2. **Document why** - Explain in PR description
3. **Request score cap adjustment** - Propose temporary or permanent increase
4. **Consider exclusion** - Add specific file exclusion if justified

## References

- [FTA Project Website](https://ftaproject.dev/)
- [FTA GitHub Repository](https://github.com/sgb-io/fta)
- [FTA Scoring Documentation](https://ftaproject.dev/docs/scoring)
- [FTA Configuration Guide](https://ftaproject.dev/docs/configuration)
- [Cyclomatic Complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity)
- [Halstead Complexity Measures](https://en.wikipedia.org/wiki/Halstead_complexity_measures)
- [Hypothesis-Driven Design Guide](./HYPOTHESIS_DRIVEN_DESIGN.md)
- [GitHub Copilot Development Guide](./github-copilot-development-guide.md)

---

**Last Updated:** 2025-11-20  
**Baseline Established:** 2025-11-20  
**Current Score Cap:** 50
