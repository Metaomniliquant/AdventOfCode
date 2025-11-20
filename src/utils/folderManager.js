const fs = require('fs');
const path = require('path');
const { getLanguageTemplate, getGenericTemplate } = require('./languageTemplates');
const { Year, Day, Language, SafePath } = require('../domain');

/**
 * Gets the base path for year folders (src/ directory)
 * @returns {string} - Path to the src directory
 */
function getBasePath() {
  return path.join(process.cwd(), 'src');
}

/**
 * Creates a folder for a specific Advent of Code year
 * @param {string|number|Year} year - The year (e.g., "2023") or Year value object
 * @returns {string} - Path to the created folder
 * @throws {Error} If year is invalid
 */
function createYearFolder(year) {
  // Parse and validate: create Year value object if not already one
  const yearVO = year instanceof Year ? year : new Year(year);
  
  // Use SafePath to prevent path traversal
  const yearPath = new SafePath(getBasePath(), yearVO.toFolderName());
  const yearPathString = yearPath.toString();
  
  if (!fs.existsSync(yearPathString)) {
    fs.mkdirSync(yearPathString, { recursive: true });
  }
  
  // Create README for the year
  const readmePath = yearPath.append('README.md').toString();
  if (!fs.existsSync(readmePath)) {
    const readmeContent = `# Advent of Code ${yearVO.toString()}\n\nSolutions for Advent of Code ${yearVO.toString()}.\n`;
    fs.writeFileSync(readmePath, readmeContent);
  }
  
  return yearPathString;
}

/**
 * Pads a day number to two digits
 * @param {string|number} day - The day number
 * @returns {string} - Zero-padded day (e.g., "01", "15")
 * @deprecated Use Day value object's toPaddedString() method instead
 */
function padDay(day) {
  return String(day).padStart(2, '0');
}

/**
 * Creates a puzzle folder for a specific day
 * @param {string|number|Year} year - The year or Year value object
 * @param {string|number|Day} day - The day number or Day value object
 * @returns {string} - Path to the created puzzle folder
 * @throws {Error} If year or day is invalid
 */
function createPuzzleFolder(year, day) {
  // Parse and validate: create value objects if not already
  const yearVO = year instanceof Year ? year : new Year(year);
  const dayVO = day instanceof Day ? day : new Day(day);
  
  // Use SafePath to prevent path traversal
  const puzzlePath = new SafePath(
    getBasePath(),
    yearVO.toFolderName(),
    dayVO.toFolderName()
  );
  const puzzlePathString = puzzlePath.toString();
  
  if (!fs.existsSync(puzzlePathString)) {
    fs.mkdirSync(puzzlePathString, { recursive: true });
  }
  
  // Create README for the puzzle
  const readmePath = puzzlePath.append('README.md').toString();
  if (!fs.existsSync(readmePath)) {
    const readmeContent = `# Day ${dayVO.toNumber()}\n\n## Problem\n\n[Link to problem](https://adventofcode.com/${yearVO.toString()}/day/${dayVO.toNumber()})\n\n## Solutions\n\nSolutions can be implemented in multiple languages.\n`;
    fs.writeFileSync(readmePath, readmeContent);
  }
  
  // Create input folder
  const inputPath = puzzlePath.append('input').toString();
  if (!fs.existsSync(inputPath)) {
    fs.mkdirSync(inputPath, { recursive: true });
    // Create placeholder for input
    fs.writeFileSync(path.join(inputPath, '.gitkeep'), '');
  }
  
  return puzzlePathString;
}

/**
 * Checks if a year folder exists
 * @param {string|number|Year} year - The year or Year value object
 * @returns {boolean}
 * @throws {Error} If year is invalid
 */
function yearFolderExists(year) {
  // Parse and validate
  const yearVO = year instanceof Year ? year : new Year(year);
  
  // Use SafePath for security
  const yearPath = new SafePath(getBasePath(), yearVO.toFolderName());
  return fs.existsSync(yearPath.toString());
}

/**
 * Checks if a puzzle folder exists
 * @param {string|number|Year} year - The year or Year value object
 * @param {string|number|Day} day - The day number or Day value object
 * @returns {boolean}
 * @throws {Error} If year or day is invalid
 */
function puzzleFolderExists(year, day) {
  // Parse and validate
  const yearVO = year instanceof Year ? year : new Year(year);
  const dayVO = day instanceof Day ? day : new Day(day);
  
  // Use SafePath for security
  const puzzlePath = new SafePath(
    getBasePath(),
    yearVO.toFolderName(),
    dayVO.toFolderName()
  );
  return fs.existsSync(puzzlePath.toString());
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
 * @param {string|number|Year} year - The year or Year value object
 * @param {string|number|Day} day - The day number or Day value object
 * @param {string|Language} language - The programming language or Language value object
 * @returns {string} - Path to the language folder
 * @throws {Error} If year, day, or language is invalid
 */
function createLanguageFolder(year, day, language) {
  // Parse and validate: create value objects if not already
  const yearVO = year instanceof Year ? year : new Year(year);
  const dayVO = day instanceof Day ? day : new Day(day);
  const langVO = language instanceof Language ? language : new Language(language);
  
  // Use SafePath to prevent path traversal
  const langPath = new SafePath(
    getBasePath(),
    yearVO.toFolderName(),
    dayVO.toFolderName(),
    langVO.toFolderName()
  );
  const langPathString = langPath.toString();
  
  if (!fs.existsSync(langPathString)) {
    fs.mkdirSync(langPathString, { recursive: true });
  }
  
  // Create language-specific template files (using SafePath for security)
  createLanguageTemplate(langPath, langVO);
  
  return langPathString;
}

/**
 * Creates template files for a specific language
 * @param {SafePath} langPath - SafePath to the language folder
 * @param {Language} language - The Language value object
 * @throws {Error} If template file names are invalid
 */
function createLanguageTemplate(langPath, language) {
  const template = getLanguageTemplate(language.toString()) || getGenericTemplate(language.toString());
  
  template.forEach(file => {
    // Additional security: validate filename to prevent directory traversal
    const filename = file.filename;
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      throw new Error(`Invalid template filename: "${filename}" contains path traversal characters`);
    }
    
    // Use SafePath to securely construct the file path
    const filePath = langPath.append(filename).toString();
    fs.writeFileSync(filePath, file.content);
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
