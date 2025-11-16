Feature: Repository folder structure for Advent of Code
  As a developer solving Advent of Code puzzles
  I want to organize my solutions in a consistent folder structure
  So that I can easily find and manage puzzles by year and day

  Scenario: Create a folder for a target year
    Given I want to create a folder for year "2023"
    When I create the year folder
    Then a folder named "2023" should exist
    And the folder should contain a README file

  Scenario: Add a puzzle to a year's folder
    Given a year folder "2024" exists
    When I add a puzzle for day "1"
    Then a folder "2024/day01" should exist
    And the puzzle folder should have the standard structure

  Scenario: Ensure consistent folder naming
    Given I want to create puzzles for year "2025"
    When I create puzzles for days "1", "5", and "15"
    Then all day folders should be zero-padded to two digits
    And the folders should be named "day01", "day05", and "day15"
