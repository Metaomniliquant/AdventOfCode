Feature: Language and technology flexibility
  As a developer solving Advent of Code puzzles
  I want to use different programming languages for different puzzles
  So that I can practice with various technologies

  Scenario: Support for multiple programming languages
    Given a puzzle folder exists for year "2024" day "1"
    When I check the supported languages
    Then the puzzle should support "JavaScript", "Python", "Go", and other languages

  Scenario: Language-specific folder structure
    Given a puzzle folder for year "2024" day "2"
    When I add a solution in "Python"
    Then the solution should be in a language-specific folder
    And the folder should contain the appropriate files for Python
