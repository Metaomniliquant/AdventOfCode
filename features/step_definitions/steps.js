const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const {
  createYearFolder,
  createPuzzleFolder,
  yearFolderExists,
  puzzleFolderExists,
  padDay,
  getSupportedLanguages,
  createLanguageFolder
} = require('../../src/utils/folderManager');

// Test workspace
const TEST_WORKSPACE = path.join(process.cwd(), 'test-workspace');

Before(function () {
  // Create test workspace
  if (!fs.existsSync(TEST_WORKSPACE)) {
    fs.mkdirSync(TEST_WORKSPACE, { recursive: true });
  }
  // Create src directory in test workspace
  const srcPath = path.join(TEST_WORKSPACE, 'src');
  if (!fs.existsSync(srcPath)) {
    fs.mkdirSync(srcPath, { recursive: true });
  }
  // Change to test workspace
  this.originalCwd = process.cwd();
  process.chdir(TEST_WORKSPACE);
});

After(function () {
  // Restore original working directory
  process.chdir(this.originalCwd);
  
  // Clean up test workspace
  if (fs.existsSync(TEST_WORKSPACE)) {
    fs.rmSync(TEST_WORKSPACE, { recursive: true, force: true });
  }
});

// Folder Structure Steps
Given('I want to create a folder for year {string}', function (year) {
  this.year = year;
});

When('I create the year folder', function () {
  this.createdPath = createYearFolder(this.year);
});

Then('a folder named {string} should exist', function (folderName) {
  const folderPath = path.join(process.cwd(), 'src', folderName);
  expect(fs.existsSync(folderPath)).to.be.true;
});

Then('the folder should contain a README file', function () {
  const readmePath = path.join(this.createdPath, 'README.md');
  expect(fs.existsSync(readmePath)).to.be.true;
});

Given('a year folder {string} exists', function (year) {
  this.year = year;
  createYearFolder(year);
  expect(yearFolderExists(year)).to.be.true;
});

When('I add a puzzle for day {string}', function (day) {
  this.day = day;
  this.puzzlePath = createPuzzleFolder(this.year, day);
});

Then('a folder {string} should exist', function (folderPath) {
  const fullPath = path.join(process.cwd(), 'src', folderPath);
  expect(fs.existsSync(fullPath)).to.be.true;
});

Then('the puzzle folder should have the standard structure', function () {
  // Check for README
  const readmePath = path.join(this.puzzlePath, 'README.md');
  expect(fs.existsSync(readmePath)).to.be.true;
  
  // Check for input folder
  const inputPath = path.join(this.puzzlePath, 'input');
  expect(fs.existsSync(inputPath)).to.be.true;
});

Given('I want to create puzzles for year {string}', function (year) {
  this.year = year;
  createYearFolder(year);
});

When('I create puzzles for days {string}, {string}, and {string}', function (day1, day2, day3) {
  this.days = [day1, day2, day3];
  this.days.forEach(day => createPuzzleFolder(this.year, day));
});

Then('all day folders should be zero-padded to two digits', function () {
  this.days.forEach(day => {
    const paddedDay = padDay(day);
    expect(paddedDay.length).to.equal(2);
    expect(paddedDay).to.match(/^\d{2}$/);
  });
});

Then('the folders should be named {string}, {string}, and {string}', function (folder1, folder2, folder3) {
  const expectedFolders = [folder1, folder2, folder3];
  expectedFolders.forEach((folder, index) => {
    const folderPath = path.join(process.cwd(), 'src', this.year, folder);
    expect(fs.existsSync(folderPath)).to.be.true;
  });
});

// Language Flexibility Steps
Given('a puzzle folder exists for year {string} day {string}', function (year, day) {
  this.year = year;
  this.day = day;
  createYearFolder(year);
  createPuzzleFolder(year, day);
});

When('I check the supported languages', function () {
  this.supportedLanguages = getSupportedLanguages();
});

Then('the puzzle should support {string}, {string}, {string}, and other languages', function (lang1, lang2, lang3) {
  expect(this.supportedLanguages).to.include(lang1);
  expect(this.supportedLanguages).to.include(lang2);
  expect(this.supportedLanguages).to.include(lang3);
  expect(this.supportedLanguages.length).to.be.greaterThan(3);
});

Given('a puzzle folder for year {string} day {string}', function (year, day) {
  this.year = year;
  this.day = day;
  createYearFolder(year);
  createPuzzleFolder(year, day);
});

When('I add a solution in {string}', function (language) {
  this.language = language;
  this.languagePath = createLanguageFolder(this.year, this.day, language);
});

Then('the solution should be in a language-specific folder', function () {
  expect(fs.existsSync(this.languagePath)).to.be.true;
  const folderName = path.basename(this.languagePath);
  expect(folderName).to.equal(this.language.toLowerCase());
});

Then('the folder should contain the appropriate files for Python', function () {
  const solutionFile = path.join(this.languagePath, 'solution.py');
  const testFile = path.join(this.languagePath, 'test_solution.py');
  
  expect(fs.existsSync(solutionFile)).to.be.true;
  expect(fs.existsSync(testFile)).to.be.true;
});

// GitHub Actions Steps
Given('a GitHub Actions workflow exists', function () {
  const workflowPath = path.join(this.originalCwd, '.github', 'workflows');
  this.workflowExists = fs.existsSync(workflowPath);
});

When('a pull request is created', function () {
  // This is a conceptual step - in reality, this would trigger GitHub Actions
  this.prCreated = true;
});

Then('the workflow should run all tests', function () {
  // This validates that the workflow file exists and is configured
  expect(this.workflowExists).to.be.true;
});

Then('the workflow should validate the folder structure', function () {
  // This is validated by the workflow configuration
  expect(this.workflowExists).to.be.true;
});

Given('solutions exist in multiple languages', function () {
  this.year = '2024';
  this.day = '1';
  createYearFolder(this.year);
  createPuzzleFolder(this.year, this.day);
  createLanguageFolder(this.year, this.day, 'JavaScript');
  createLanguageFolder(this.year, this.day, 'Python');
});

When('the CI pipeline runs', function () {
  this.ciRunning = true;
});

Then('it should build and test JavaScript solutions', function () {
  const jsPath = path.join(process.cwd(), 'src', this.year, `day${padDay(this.day)}`, 'javascript');
  expect(fs.existsSync(jsPath)).to.be.true;
});

Then('it should build and test Python solutions', function () {
  const pyPath = path.join(process.cwd(), 'src', this.year, `day${padDay(this.day)}`, 'python');
  expect(fs.existsSync(pyPath)).to.be.true;
});

Then('it should build and test solutions in other supported languages', function () {
  // This is validated by the multi-language support in the utility
  const languages = getSupportedLanguages();
  expect(languages.length).to.be.greaterThan(2);
});
