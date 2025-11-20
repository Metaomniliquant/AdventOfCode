const fs = require('fs');
const path = require('path');
const { getLanguageTemplate, getGenericTemplate } = require('./languageTemplates');

/**
 * Gets the base path for year folders (src/ directory)
 * @returns {string} - Path to the src directory
 */
function getBasePath() {
  return path.join(process.cwd(), 'src');
}

/**
 * Creates a folder for a specific Advent of Code year
 * @param {string} year - The year (e.g., "2023")
 * @returns {string} - Path to the created folder
 */
function createYearFolder(year) {
  const yearPath = path.join(getBasePath(), year);
  
  if (!fs.existsSync(yearPath)) {
    fs.mkdirSync(yearPath, { recursive: true });
  }
  
  // Create README for the year
  const readmePath = path.join(yearPath, 'README.md');
  if (!fs.existsSync(readmePath)) {
    const readmeContent = `# Advent of Code ${year}\n\nSolutions for Advent of Code ${year}.\n`;
    fs.writeFileSync(readmePath, readmeContent);
  }
  
  return yearPath;
}

/**
 * Pads a day number to two digits
 * @param {string|number} day - The day number
 * @returns {string} - Zero-padded day (e.g., "01", "15")
 */
function padDay(day) {
  return String(day).padStart(2, '0');
}

/**
 * Creates a puzzle folder for a specific day
 * @param {string} year - The year
 * @param {string|number} day - The day number
 * @returns {string} - Path to the created puzzle folder
 */
function createPuzzleFolder(year, day) {
  const paddedDay = padDay(day);
  const dayFolder = `day${paddedDay}`;
  const puzzlePath = path.join(getBasePath(), year, dayFolder);
  
  if (!fs.existsSync(puzzlePath)) {
    fs.mkdirSync(puzzlePath, { recursive: true });
  }
  
  // Create README for the puzzle
  const readmePath = path.join(puzzlePath, 'README.md');
  if (!fs.existsSync(readmePath)) {
    const readmeContent = `# Day ${parseInt(day)}\n\n## Problem\n\n[Link to problem](https://adventofcode.com/${year}/day/${parseInt(day)})\n\n## Solutions\n\nSolutions can be implemented in multiple languages.\n`;
    fs.writeFileSync(readmePath, readmeContent);
  }
  
  // Create input folder
  const inputPath = path.join(puzzlePath, 'input');
  if (!fs.existsSync(inputPath)) {
    fs.mkdirSync(inputPath, { recursive: true });
    // Create placeholder for input
    fs.writeFileSync(path.join(inputPath, '.gitkeep'), '');
  }
  
  return puzzlePath;
}

/**
 * Checks if a year folder exists
 * @param {string} year - The year
 * @returns {boolean}
 */
function yearFolderExists(year) {
  const yearPath = path.join(getBasePath(), year);
  return fs.existsSync(yearPath);
}

/**
 * Checks if a puzzle folder exists
 * @param {string} year - The year
 * @param {string|number} day - The day number
 * @returns {boolean}
 */
function puzzleFolderExists(year, day) {
  const paddedDay = padDay(day);
  const dayFolder = `day${paddedDay}`;
  const puzzlePath = path.join(getBasePath(), year, dayFolder);
  return fs.existsSync(puzzlePath);
}

/**
 * Gets the list of supported languages
 * @returns {Array<string>}
 */
function getSupportedLanguages() {
  return ['JavaScript', 'Python', 'Go', 'Rust', 'Java', 'C++', 'TypeScript'];
}

/**
 * Creates a language-specific solution folder
 * @param {string} year - The year
 * @param {string|number} day - The day number
 * @param {string} language - The programming language
 * @returns {string} - Path to the language folder
 */
function createLanguageFolder(year, day, language) {
  const paddedDay = padDay(day);
  const dayFolder = `day${paddedDay}`;
  const languageFolder = language.toLowerCase();
  const langPath = path.join(getBasePath(), year, dayFolder, languageFolder);
  
  if (!fs.existsSync(langPath)) {
    fs.mkdirSync(langPath, { recursive: true });
  }
  
  // Create language-specific template files
  createLanguageTemplate(langPath, language);
  
  return langPath;
}

/**
 * Creates template files for a specific language
 * @param {string} langPath - Path to the language folder
 * @param {string} language - The programming language
 */
function createLanguageTemplate(langPath, language) {
  const template = getLanguageTemplate(language) || getGenericTemplate(language);
  
  template.forEach(file => {
    fs.writeFileSync(path.join(langPath, file.filename), file.content);
  });
}

module.exports = {
  createYearFolder,
  createPuzzleFolder,
  yearFolderExists,
  puzzleFolderExists,
  padDay,
  getSupportedLanguages,
  createLanguageFolder
};
