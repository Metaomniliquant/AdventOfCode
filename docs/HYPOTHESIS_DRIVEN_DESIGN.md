# Hypothesis-Driven Design

## Overview

Hypothesis-Driven Design (HDD) is a systematic approach to software development that starts with a testable hypothesis about what will create value. This guide shows how to use HDD with GitHub Copilot coding agent to achieve better outcomes with minimal rework.

## What is Hypothesis-Driven Design?

Hypothesis-Driven Design treats every development effort as an experiment. Instead of assuming we know the right solution, we:

1. **Formulate a hypothesis** about what will create value
2. **Define success criteria** that are measurable and observable
3. **Design experiments** (code, documentation, features) to test the hypothesis
4. **Measure outcomes** against success criteria
5. **Learn and iterate** based on results

## The Hypothesis Format

A well-formed hypothesis follows this structure:

```
We believe that [doing this/building this/creating this]
Will result in [this outcome]
We will know we have succeeded when [these measurable criteria are met]
```

### Example Hypotheses

#### Code Hypothesis
```
We believe that implementing a caching layer for puzzle solutions
Will result in faster execution times for repeated calculations
We will know we have succeeded when:
- Benchmark tests show >50% improvement for cached operations
- Memory usage remains under 100MB for typical inputs
- All existing tests continue to pass
```

#### Documentation Hypothesis
```
We believe that adding a quickstart guide with video walkthrough
Will result in new contributors getting started faster
We will know we have succeeded when:
- New contributors can set up the repository in under 5 minutes
- First pull request from new contributors increases by 30%
- Setup support issues decrease by 50%
```

#### Feature Hypothesis
```
We believe that adding multi-language solution comparison
Will result in better learning outcomes for developers
We will know we have succeeded when:
- Users can view side-by-side solutions in different languages
- Engagement time on solution pages increases by 40%
- Users report learning new language patterns (via survey)
```

## Hypothesis-Driven Design for Code

When your hypothesis relates to code changes, follow this progression:

### 1. Start with the Hypothesis

Formulate your hypothesis in a GitHub Issue using the standard format.

**Example Issue:**
```markdown
## Hypothesis

We believe that implementing a functional parser for puzzle inputs
Will result in more maintainable and testable code
We will know we have succeeded when:
- Parser logic is isolated from business logic
- Parser has 100% test coverage
- Solutions can easily swap different parsers
- Code review shows improved readability
```

### 2. Derive BDD Scenarios

From your hypothesis, create Gherkin scenarios that describe the desired behavior.

**Example Feature File:**
```gherkin
Feature: Functional Input Parser
  As a puzzle solver
  I want a reusable input parser
  So that I can focus on solution logic

  Scenario: Parse multi-line input into array
    Given I have puzzle input with multiple lines
    When I parse the input using the functional parser
    Then I should receive an array of trimmed strings
    And each line should be a separate array element

  Scenario: Parse input with custom delimiter
    Given I have puzzle input with comma-separated values
    When I parse the input with delimiter ","
    Then I should receive an array of values
    And whitespace should be trimmed from each value

  Scenario: Handle empty input gracefully
    Given I have empty puzzle input
    When I parse the input
    Then I should receive an empty array
    And no errors should be thrown
```

**Use the @bdd-expert agent** to review these scenarios:
```
Review these BDD scenarios for a functional input parser.
Ensure they are declarative, behavior-focused, and properly test the hypothesis.
```

### 3. Create Acceptance Tests (ATDD)

Implement step definitions that make your scenarios executable.

**Example Step Definitions:**
```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { parseInput } = require('../../../src/parsers/functional-parser');

Given('I have puzzle input with multiple lines', function() {
  this.input = 'line1\nline2\nline3';
});

When('I parse the input using the functional parser', function() {
  this.result = parseInput(this.input);
});

Then('I should receive an array of trimmed strings', function() {
  expect(this.result).to.be.an('array');
  expect(this.result).to.have.lengthOf(3);
  expect(this.result.every(line => typeof line === 'string')).to.be.true;
});
```

**Use the @test-quality-reviewer agent** to review acceptance tests:
```
Review these acceptance tests for the functional parser.
Ensure they properly validate the hypothesis and focus on behavior.
```

### 4. Write Unit Tests (TDD)

Create unit tests for the implementation, starting with the simplest cases.

**Example Unit Tests:**
```javascript
describe('FunctionalParser', () => {
  describe('parseInput', () => {
    it('should return empty array for empty input', () => {
      const result = parseInput('');
      expect(result).to.deep.equal([]);
    });

    it('should split on newlines by default', () => {
      const result = parseInput('a\nb\nc');
      expect(result).to.deep.equal(['a', 'b', 'c']);
    });

    it('should trim whitespace from lines', () => {
      const result = parseInput('  a  \n  b  \n  c  ');
      expect(result).to.deep.equal(['a', 'b', 'c']);
    });

    it('should handle custom delimiter', () => {
      const result = parseInput('a,b,c', { delimiter: ',' });
      expect(result).to.deep.equal(['a', 'b', 'c']);
    });

    it('should preserve empty lines when specified', () => {
      const result = parseInput('a\n\nb', { preserveEmpty: true });
      expect(result).to.deep.equal(['a', '', 'b']);
    });
  });
});
```

**Use the @test-quality-reviewer agent** again:
```
Review these unit tests for completeness and quality.
Ensure they test behavior, not implementation details.
```

### 5. Implement (Red → Green → Refactor)

#### Red Phase
Run tests – they should fail initially.

```bash
npm test
# Expected: Tests fail because implementation doesn't exist yet
```

#### Green Phase
Write the simplest implementation to make tests pass.

```javascript
// src/parsers/functional-parser.js

/**
 * Parse puzzle input into structured data
 * @param {string} input - Raw puzzle input
 * @param {Object} options - Parser options
 * @param {string} options.delimiter - Split delimiter (default: '\n')
 * @param {boolean} options.preserveEmpty - Keep empty values (default: false)
 * @returns {string[]} Parsed values
 */
function parseInput(input, options = {}) {
  const { delimiter = '\n', preserveEmpty = false } = options;
  
  if (!input) return [];
  
  const values = input.split(delimiter).map(v => v.trim());
  
  return preserveEmpty ? values : values.filter(v => v.length > 0);
}

module.exports = { parseInput };
```

Run tests again:
```bash
npm test
# Expected: Tests pass
```

#### Refactor Phase
Improve the implementation while keeping tests green.

**Use the @ddd-expert agent** for domain modeling:
```
Review this functional parser implementation.
Suggest improvements using functional programming principles and domain-driven design.
```

**Use the @application-architecture-expert agent** for structure:
```
Review the parser architecture.
Ensure proper separation of concerns and extensibility.
```

### 6. Validate the Hypothesis

Return to your success criteria and verify them:

```markdown
## Validation Results

✅ Parser logic is isolated from business logic
   - Parser is in separate module with single responsibility
   
✅ Parser has 100% test coverage
   - All code paths tested
   - Edge cases covered
   
✅ Solutions can easily swap different parsers
   - Parser accepts options for customization
   - Interface is simple and consistent
   
✅ Code review shows improved readability
   - Clear function names and documentation
   - Functional approach reduces complexity
```

If criteria aren't met, iterate on the implementation or refine the hypothesis.

## Hypothesis-Driven Design for Documentation

When your hypothesis relates to documentation, follow this approach:

### 1. Formulate Documentation Hypothesis

**Example:**
```
We believe that adding a comprehensive troubleshooting guide
Will result in reduced support requests and faster issue resolution
We will know we have succeeded when:
- Common setup issues are documented with solutions
- Support issue resolution time decreases by 40%
- Duplicate support issues decrease by 60%
- New users can self-resolve 80% of common problems
```

### 2. Identify Documentation Needs

Based on the hypothesis, determine what documentation is needed:

- **Location**: Where should this documentation live?
  - `README.md` for critical getting-started info
  - `docs/` for comprehensive guides
  - `.github/` for GitHub-specific workflows
  - Code comments for implementation details

- **Audience**: Who will read this?
  - New contributors
  - Experienced developers
  - Users of the repository
  - GitHub Copilot agent

- **Format**: How should it be structured?
  - Step-by-step guides
  - Reference documentation
  - Examples and code snippets
  - Visual diagrams

### 3. Create Documentation Structure

Outline the documentation before writing:

```markdown
# Troubleshooting Guide (Outline)

## Setup Issues
- Node.js version mismatch
- npm install failures
- Python environment issues
- Go installation problems

## Testing Issues
- BDD tests failing
- Language-specific test failures
- CI/CD pipeline errors

## Development Issues
- Folder structure validation errors
- Language template not found
- Input file parsing problems

## Common Error Messages
- "cucumber-js: not found"
- "Module not found"
- "Python module import error"
- Each with: Cause, Solution, Prevention
```

### 4. Write High-Quality Documentation

Follow these principles:

#### Clarity
- Use simple, direct language
- Define technical terms
- Break complex topics into steps

#### Completeness
- Cover all common scenarios
- Include edge cases
- Provide examples for each point

#### Accuracy
- Test all commands and code examples
- Verify links work
- Keep documentation in sync with code

#### Accessibility
- Use descriptive headings
- Include table of contents for long docs
- Add code syntax highlighting
- Use lists and formatting for scannability

**Example High-Quality Documentation:**

## Troubleshooting: "cucumber-js: not found"

### Symptom
When running `npm test`, you see:

    sh: 1: cucumber-js: not found

### Cause
Node.js dependencies are not installed in your local environment.

### Solution
Install dependencies using npm:

    npm install

Then run tests again:

    npm test

### Expected Output
You should see test results like:

    7 scenarios (7 passed)
    28 steps (28 passed)
    0m00.058s

### Prevention
Always run `npm install` after:
- Cloning the repository
- Pulling updates that modify `package.json`
- Switching branches that have different dependencies

### Related Issues
- [Package installation guide](./CONTRIBUTING.md#installation)
- [CI/CD setup](./CONTINUOUS_DELIVERY.md)

### 5. Validate Documentation Hypothesis

Test the documentation against success criteria:

```markdown
## Documentation Validation

✅ Common setup issues are documented with solutions
   - 15 common issues identified and documented
   - Each has clear symptom, cause, solution, prevention
   
⏸️ Support issue resolution time decreases by 40%
   - Need to measure over 30 days after deployment
   
⏸️ Duplicate support issues decrease by 60%
   - Will measure in issue tracker over time
   
✅ New users can self-resolve 80% of common problems
   - 5 test users successfully resolved 8/10 common issues using guide
```

### 6. Iterate Based on Feedback

Documentation is never truly finished. Update based on:
- User questions and support requests
- Code changes that invalidate documentation
- New common issues discovered
- Feedback from documentation reviews

## Integrating HDD with GitHub Copilot

### Writing Issues for Copilot Agent

When creating GitHub Issues that will be handled by Copilot agent:

1. **Use the hypothesis format** explicitly
2. **Be specific about success criteria**
3. **Provide context** about the repository state
4. **Link to relevant documentation**

**Example Copilot-Optimized Issue:**

```markdown
## Hypothesis

We believe that adding TypeScript support with strict type checking
Will result in fewer runtime errors and better code quality
We will know we have succeeded when:
- TypeScript compiles without errors in strict mode
- Existing JavaScript solutions can coexist with TypeScript
- New TypeScript template is available via CLI
- CI/CD pipeline validates TypeScript code
- Documentation is updated with TypeScript examples

## Context

- Repository currently supports JavaScript, Python, Go
- CLI tool at `src/cli/setup.js` manages templates
- BDD tests validate folder structure
- See `docs/github-copilot-development-guide.md` for development workflow

## Acceptance Criteria

- [ ] TypeScript template created in `src/templates/typescript/`
- [ ] `tsconfig.json` configured for strict mode
- [ ] BDD scenario added for TypeScript language support
- [ ] CLI updated to generate TypeScript folders
- [ ] CI/CD workflow runs TypeScript compiler
- [ ] Documentation updated in README and development guide

## Related Documentation

- [GitHub Copilot Development Guide](./docs/github-copilot-development-guide.md)
- [BDD Feature Files](./features/)
- [Continuous Delivery Principles](./docs/CONTINUOUS_DELIVERY.md)
```

### Copilot Agent Workflow

When Copilot agent receives a hypothesis-driven issue:

1. **Parse the hypothesis** to understand the value proposition
2. **Review success criteria** to know when done
3. **Follow BDD → ATDD → TDD** for code changes
4. **Create comprehensive documentation** for documentation changes
5. **Validate against criteria** before marking complete
6. **Use custom agents** (@bdd-expert, @test-quality-reviewer, etc.) for quality

### Benefits of HDD for Copilot

1. **Clear Objectives**: Copilot knows exactly what success looks like
2. **Measurable Outcomes**: Success criteria are testable and verifiable
3. **Reduced Rework**: Clear hypothesis prevents misaligned implementations
4. **Better Quality**: Built-in validation against stated criteria
5. **Documentation**: Success criteria become test scenarios and docs

## Hypothesis-Driven Design Examples

### Example 1: Performance Optimization

**Hypothesis:**
```
We believe that implementing memoization for recursive solutions
Will result in significantly faster execution for large inputs
We will know we have succeeded when:
- Fibonacci(50) executes in under 1ms (vs 5+ seconds currently)
- Memory usage stays under 50MB
- All existing tests pass
- Performance tests are added to CI/CD
```

**BDD Scenario:**
```gherkin
Scenario: Calculate Fibonacci with memoization
  Given I have a Fibonacci function with memoization
  When I calculate Fibonacci of 50
  Then the result should be correct
  And the calculation should complete in under 1ms
  And memory usage should be under 50MB
```

**TDD Tests:**
```javascript
describe('memoizedFibonacci', () => {
  it('should calculate fib(0) = 0', () => {
    expect(memoizedFibonacci(0)).to.equal(0);
  });

  it('should calculate fib(50) in under 1ms', () => {
    const start = Date.now();
    const result = memoizedFibonacci(50);
    const duration = Date.now() - start;
    
    expect(result).to.equal(12586269025);
    expect(duration).to.be.lessThan(1);
  });
});
```

### Example 2: Developer Experience

**Hypothesis:**
```
We believe that adding interactive examples to the README
Will result in faster onboarding for new contributors
We will know we have succeeded when:
- Examples can be copy-pasted and run immediately
- New contributor first PR time decreases by 50%
- README engagement increases (measured by scroll depth)
- Fewer "how do I get started" issues are opened
```

**Documentation Approach:**
# Quick Start (Before)

1. Clone the repository
2. Install dependencies
3. Create a solution
4. Run tests

# Quick Start (After - Interactive)

## Try it in 60 seconds

    # Clone and setup
    git clone https://github.com/Metaomniliquant/AdventOfCode.git
    cd AdventOfCode
    npm install

    # Create your first puzzle (auto-generates structure)
    node src/cli/setup.js puzzle 2024 1

    # Add a solution
    cat > 2024/day01/javascript/solution.js << 'EOF'
    function solve(input) {
      const lines = input.trim().split('\n');
      return lines.length;
    }
    module.exports = { solve };
    EOF

    # Run tests
    npm test

    # See your solution
    node 2024/day01/javascript/solution.js

**What just happened?**
1. ✅ Created a complete puzzle structure
2. ✅ Added a simple solution
3. ✅ Validated with BDD tests
4. ✅ Ready to solve real puzzles!

**Next Steps:**
- Replace the example with your real solution
- Add tests for your solution (see [Development Guide](./github-copilot-development-guide.md))
- Try another language (multi-language support is built-in)

### Example 3: Code Quality

**Hypothesis:**
```
We believe that enforcing functional programming patterns via linting
Will result in more maintainable and testable code
We will know we have succeeded when:
- ESLint rules prevent common imperative patterns
- Code reviews show increased use of functional patterns
- Bug rate in functional code is 30% lower than imperative code
- Developer satisfaction with code maintainability increases
```

**Implementation:**
```javascript
// .eslintrc.js
module.exports = {
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
    'no-param-reassign': 'error',
    'functional/no-let': 'warn',
    'functional/immutable-data': 'warn',
    'functional/prefer-readonly-type': 'warn',
  },
  plugins: ['functional'],
};
```

**Validation:**

✅ ESLint rules prevent common imperative patterns
   - Rules enforced in CI/CD
   - Pre-commit hooks check compliance
   
⏸️ Code reviews show increased use of functional patterns
   - Will track in code review comments over 3 months
   
⏸️ Bug rate in functional code is 30% lower
   - Need to track bugs by code style over 6 months
   
✅ Developer satisfaction with code maintainability increases
   - Survey shows 4.2/5 satisfaction (up from 3.1/5)

## Hypothesis-Driven Design Workflow Summary

### For Code Development

```
1. Formulate Hypothesis in GitHub Issue
   ↓
2. Derive BDD Scenarios
   ↓ (review with @bdd-expert)
3. Create Acceptance Tests (ATDD)
   ↓ (review with @test-quality-reviewer)
4. Write Unit Tests (TDD)
   ↓ (review with @test-quality-reviewer)
5. Implement (Red → Green → Refactor)
   ↓ (review with @ddd-expert and @application-architecture-expert)
6. Validate Against Success Criteria
   ↓
7. Learn and Iterate
```

### For Documentation

```
1. Formulate Documentation Hypothesis
   ↓
2. Identify Documentation Needs
   ↓
3. Create Documentation Structure
   ↓
4. Write High-Quality Documentation
   ↓
5. Validate Against Success Criteria
   ↓
6. Gather Feedback and Iterate
```

## Best Practices

### Writing Hypotheses

✅ **Do:**
- Be specific about the expected outcome
- Make success criteria measurable
- Focus on value, not just features
- Include both positive and negative indicators
- Set realistic timeframes for measurement

❌ **Don't:**
- Make assumptions without testing
- Write vague success criteria
- Focus only on output (lines of code, features)
- Ignore measurement challenges
- Forget to revisit and validate

### Working with Copilot Agent

✅ **Do:**
- Provide complete context in the issue
- Link to relevant documentation
- Use the hypothesis format explicitly
- Specify which custom agents should be used
- Include clear acceptance criteria

❌ **Don't:**
- Assume Copilot knows repository conventions
- Leave success criteria ambiguous
- Skip the validation step
- Forget to update documentation
- Ignore feedback from custom agents

### Measuring Success

✅ **Do:**
- Use objective, measurable criteria when possible
- Combine quantitative and qualitative measures
- Set up tracking before implementation
- Review results after sufficient time
- Document lessons learned

❌ **Don't:**
- Rely only on subjective assessment
- Measure too early (before meaningful data)
- Cherry-pick data to support hypothesis
- Ignore negative results
- Skip the learning phase

## Templates

### GitHub Issue Template for Hypothesis

```markdown
## Hypothesis

We believe that [doing/building/creating this]
Will result in [this outcome]
We will know we have succeeded when:
- [Measurable criterion 1]
- [Measurable criterion 2]
- [Measurable criterion 3]

## Context

[Background information about current state]
[Links to relevant documentation]
[Related issues or pull requests]

## Acceptance Criteria

- [ ] [Specific deliverable 1]
- [ ] [Specific deliverable 2]
- [ ] [Specific deliverable 3]
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Code reviewed

## Success Metrics

- **Primary**: [Main metric to track]
- **Secondary**: [Supporting metrics]
- **Timeframe**: [When to measure]

## Related Documentation

- [Link to relevant guide]
- [Link to related feature]
```

### BDD Feature Template for Hypothesis

```gherkin
Feature: [Feature Name from Hypothesis]
  As a [user type]
  I want [capability]
  So that [business value from hypothesis]

  Background:
    Given [common setup]

  Scenario: [Happy path from success criteria]
    Given [initial state]
    When [action]
    Then [expected outcome from success criteria]

  Scenario: [Edge case or validation]
    Given [edge case setup]
    When [action]
    Then [expected handling]

  Scenario: [Negative case]
    Given [negative condition]
    When [action]
    Then [expected error or handling]
```

## Conclusion

Hypothesis-Driven Design transforms software development from assumption-based building to scientific experimentation. By combining HDD with BDD, ATDD, and TDD, and leveraging GitHub Copilot's custom agents, you create a powerful workflow that:

- **Reduces rework** through clear success criteria
- **Improves quality** through systematic testing
- **Enhances documentation** through intentional design
- **Accelerates development** through AI assistance
- **Enables learning** through validation and iteration

Start your next feature with a hypothesis, and let the GitHub Copilot coding agent help you validate it through code and documentation.

## Additional Resources

- [GitHub Copilot Development Guide](./github-copilot-development-guide.md)
- [BDD Best Practices](../.github/agents/bdd-expert.agent.md)
- [Continuous Delivery Principles](./CONTINUOUS_DELIVERY.md)
- [Test Quality Guidelines](../.github/agents/test-quality-reviewer.agent.md)
- [Conventional Commits](../.github/instructions/commit-message.instructions.md)

---

**Start with a hypothesis. End with validated learning.** 🧪
