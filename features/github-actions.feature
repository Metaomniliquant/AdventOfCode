Feature: GitHub Actions pipeline for building and testing puzzles
  As a developer contributing to the Advent of Code repository
  I want an automated CI/CD pipeline
  So that all solutions are tested and validated automatically

  Scenario: Run tests on pull requests
    Given a GitHub Actions workflow exists
    When a pull request is created
    Then the workflow should run all tests
    And the workflow should validate the folder structure

  Scenario: Multi-language build support
    Given solutions exist in multiple languages
    When the CI pipeline runs
    Then it should build and test JavaScript solutions
    And it should build and test Python solutions
    And it should build and test solutions in other supported languages
