# GitHub Copilot – Application Development Guide

## Overview

This guide outlines a development approach that leverages **GitHub Copilot** and **Copilot agents** to build applications in any programming language or framework. The workflow emphasizes:

- **Hypothesis-Driven Design (HDD)** – Start with testable hypotheses about value
- **Behavior-Driven Development (BDD)** – Define features using Gherkin syntax
- **Acceptance Test Driven Development (ATDD)** – Derive acceptance tests from scenarios
- **Test Driven Development (TDD)** – Write tests before implementation
- **Functional Principles** – Favor clarity, immutability, and composability
- **Language Agnosticism** – Apply these practices across any language or technology stack

> 💡 **New to Hypothesis-Driven Design?** See the [Hypothesis-Driven Design Guide](./HYPOTHESIS_DRIVEN_DESIGN.md) for a comprehensive introduction to formulating hypotheses in GitHub Issues and validating them through code and documentation.

## Philosophy

**Hypothesis → BDD → ATDD → TDD → Red → Green → Refactor**

1. Formulate testable hypothesis in GitHub Issue (HDD)
2. Write Gherkin feature scenarios from hypothesis (BDD)
3. Convert scenarios to acceptance tests (ATDD)
4. Write failing unit/integration tests (TDD)
5. Write minimal code to pass tests (Red → Green)
6. Refactor while keeping tests green
7. Validate against hypothesis success criteria
8. Repeat and iterate based on learnings

## Copilot Agents

Specialized Copilot agents enhance quality at each stage of development. They should be used proactively.

### Available Agents

#### 1. BDD Expert
- Reviews and improves Gherkin feature files
- Ensures scenarios are declarative and focus on user behavior
- Validates ubiquitous language

#### 2. DDD Expert
- Guides domain modeling and bounded context identification
- Designs entities, value objects, and aggregates
- Prevents primitive obsession and anemic models

#### 3. Test Quality Reviewer
- Reviews unit, integration, and acceptance tests
- Ensures tests focus on behavior, not implementation details
- Identifies brittle or fragile tests

#### 4. UI/Styling Expert
- Reviews layout and styling patterns
- Ensures accessibility and responsive design
- Optimizes component composition

#### 5. Application Architecture Expert
- Reviews overall system design
- Ensures separation of concerns
- Validates architectural patterns

## Development Workflow

### Phase 1: Feature Definition (BDD)

**Goal**: Define the feature in plain language using Gherkin

**Steps**:
1. Collaborate with stakeholders to understand requirements
2. Write feature file with scenarios in Given-When-Then format
3. Use **@bdd-expert** agent to review scenarios
4. Iterate until scenarios are declarative and behavior-focused

**Example**:
```gherkin
Feature: User Authentication
  As a user
  I want to log in with my credentials
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid username "john@example.com"
    And I enter valid password "SecurePass123"
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see "Welcome, John"
```

**Agent Review**: Ask @bdd-expert to review for:
- Declarative vs imperative style
- Appropriate level of detail
- Ubiquitous language usage

### Phase 2: Acceptance Test Implementation (ATDD)

**Goal**: Convert scenarios into executable acceptance tests

**Steps**:
1. Create step definitions that map to scenario steps
2. Implement test fixtures and test data
3. Run tests – they should fail (no implementation yet)
4. Use **@test-quality-reviewer** agent to review tests

**Example** (JavaScript/Cucumber):
```javascript
Given('I am on the login page', async function() {
  await this.page.navigate('https://example.com/login');
});

When('I enter valid username {string}', async function(username) {
  await this.page.fill('#username', username);
});

When('I enter valid password {string}', async function(password) {
  await this.page.fill('#password', password);
});

When('I click the login button', async function() {
  await this.page.click('#login-button');
});

Then('I should be redirected to the dashboard', async function() {
  expect(await this.page.url()).toBe('https://example.com/dashboard');
});
```

**Agent Review**: Ask @test-quality-reviewer to verify:
- Tests focus on behavior
- Appropriate use of test doubles
- Clear assertions

### Phase 3: Unit Test Creation (TDD)

**Goal**: Write unit tests for individual components

**Steps**:
1. Identify the units of functionality needed
2. Write failing unit tests for each unit
3. Use **@test-quality-reviewer** agent to review tests
4. Ensure tests are independent and focused

**Example** (JavaScript/Jest):
```javascript
describe('AuthenticationService', () => {
  describe('validateCredentials', () => {
    it('should return true for valid credentials', () => {
      const service = new AuthenticationService();
      const result = service.validateCredentials('john@example.com', 'SecurePass123');
      expect(result).toBe(true);
    });

    it('should return false for invalid password', () => {
      const service = new AuthenticationService();
      const result = service.validateCredentials('john@example.com', 'WrongPassword');
      expect(result).toBe(false);
    });

    it('should throw error for empty username', () => {
      const service = new AuthenticationService();
      expect(() => {
        service.validateCredentials('', 'SecurePass123');
      }).toThrow('Username cannot be empty');
    });
  });
});
```

**Agent Review**: Ask @test-quality-reviewer to check:
- One assertion per test
- Clear test names
- Appropriate test coverage

### Phase 4: Implementation (Red → Green)

**Goal**: Write minimal code to make tests pass

**Steps**:
1. Run tests – verify they fail (Red)
2. Write simplest implementation to pass tests
3. Run tests – verify they pass (Green)
4. Use **@ddd-expert** for domain modeling guidance
5. Use **@application-architecture-expert** for structural guidance

**Example**:
```javascript
class AuthenticationService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  validateCredentials(username, password) {
    if (!username) {
      throw new Error('Username cannot be empty');
    }
    
    if (!password) {
      throw new Error('Password cannot be empty');
    }

    const user = this.userRepository.findByUsername(username);
    if (!user) {
      return false;
    }

    return user.passwordMatches(password);
  }
}
```

**Agent Review**: Ask @ddd-expert to verify:
- Proper domain modeling
- No primitive obsession
- Rich domain objects

### Phase 5: Refactor

**Goal**: Improve code quality while keeping tests green

**Steps**:
1. Identify code smells and duplication
2. Refactor to improve design
3. Run tests after each refactoring
4. Use agents to review improvements

**Refactoring Checklist**:
- [ ] Extract magic numbers and strings
- [ ] Remove duplication
- [ ] Improve naming
- [ ] Simplify complex conditionals
- [ ] Extract methods for clarity
- [ ] Apply functional patterns where appropriate

**Agent Review**: Ask @application-architecture-expert for:
- SOLID principle violations
- Separation of concerns
- Design pattern opportunities

## Functional Programming Principles

Apply these principles regardless of language:

### 1. Immutability
Prefer immutable data structures

**Bad**:
```javascript
function updateUser(user, newEmail) {
  user.email = newEmail; // Mutation!
  return user;
}
```

**Good**:
```javascript
function updateUser(user, newEmail) {
  return { ...user, email: newEmail }; // New object
}
```

### 2. Pure Functions
Functions should have no side effects

**Bad**:
```javascript
let total = 0;
function addToTotal(value) {
  total += value; // Side effect!
  return total;
}
```

**Good**:
```javascript
function add(a, b) {
  return a + b; // Pure
}
```

### 3. Composition
Build complex behavior from simple functions

**Example**:
```javascript
const validateEmail = (email) => email.includes('@');
const validateLength = (str) => str.length >= 8;
const validateUppercase = (str) => /[A-Z]/.test(str);

const validatePassword = (password) => 
  validateLength(password) && validateUppercase(password);
```

### 4. Higher-Order Functions
Use map, filter, reduce instead of loops

**Bad**:
```javascript
const adults = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 18) {
    adults.push(users[i]);
  }
}
```

**Good**:
```javascript
const adults = users.filter(user => user.age >= 18);
```

## Language-Specific Guidance

### JavaScript/TypeScript
- Use const by default
- Leverage async/await for asynchronous code
- Use TypeScript for type safety
- Employ ESLint and Prettier
- Consider functional libraries (Ramda, Lodash/FP)

### Python
- Use type hints
- Leverage dataclasses or Pydantic for data models
- Use pytest for testing
- Follow PEP 8 style guide
- Consider functional tools (toolz, fn.py)

### C#/.NET
- Use records for immutable data
- Leverage LINQ for functional operations
- Use nullable reference types
- Apply async/await patterns
- Consider functional libraries (LanguageExt)

### Java
- Use records (Java 14+) or immutable classes
- Leverage streams and Optional
- Apply modern testing frameworks (JUnit 5)
- Consider Vavr for functional programming
- Use builder pattern for complex objects

### Go
- Embrace simplicity and explicitness
- Use table-driven tests
- Leverage interfaces for abstraction
- Apply error handling best practices
- Keep functions small and focused

## Best Practices

### 1. Start with the Simplest Test
Don't try to solve everything at once

### 2. Refactor Ruthlessly
If tests are green, improve the code

### 3. Keep Tests Fast
Slow tests discourage running them

### 4. Use Agents Proactively
Don't wait for problems – get early feedback

### 5. Document Intent
Tests are documentation – make them readable

### 6. Avoid Over-Engineering
Build what you need, when you need it

### 7. Commit Often
Small commits with clear messages

### 8. Review Regularly
Use agents to review code frequently

## Agent Usage Patterns

### When Starting a Feature
1. @bdd-expert – Review feature file
2. @ddd-expert – Design domain model

### When Writing Tests
1. @test-quality-reviewer – Review test structure
2. @test-quality-reviewer – Verify test coverage

### When Implementing
1. @ddd-expert – Validate domain logic
2. @application-architecture-expert – Check structure

### When Refactoring
1. @test-quality-reviewer – Ensure tests still valid
2. @application-architecture-expert – Verify improvements

### When Building UI
1. @ui-styling-expert – Review components and check accessibility

## Continuous Integration

Integrate automated checks in your CI/CD pipeline:

1. **Linting**: Enforce code style
2. **Unit Tests**: Run on every commit
3. **Integration Tests**: Run on PR
4. **Acceptance Tests**: Run on PR
5. **Code Coverage**: Track and report
6. **Security Scans**: Check vulnerabilities

## Conclusion

This workflow combines the best practices of BDD, ATDD, and TDD with the power of GitHub Copilot and specialized agents. By following this guide, you'll build applications that are:

- **Well-tested**: Comprehensive test coverage at all levels
- **Well-designed**: Clean architecture and domain modeling
- **Well-documented**: Living documentation through tests
- **Well-maintained**: Easy to understand and change

Remember: The goal is not perfection on the first try, but continuous improvement through iterative development and proactive quality reviews.

## Additional Resources

- [Hypothesis-Driven Design Guide](./HYPOTHESIS_DRIVEN_DESIGN.md)
- [Continuous Delivery Principles](./CONTINUOUS_DELIVERY.md)
- [BDD Best Practices](../.github/agents/bdd-expert.agent.md)
- [DDD Patterns](../.github/agents/ddd-expert.agent.md)
- [Test Quality Guidelines](../.github/agents/test-quality-reviewer.agent.md)
- [Application Architecture Expert](../.github/agents/application-architecture-expert.agent.md)
- [UI/Styling Expert](../.github/agents/ui-styling-expert.agent.md)
- [Conventional Commits](../.github/instructions/commit-message.instructions.md)

---

**Happy Coding with GitHub Copilot!** 🚀
