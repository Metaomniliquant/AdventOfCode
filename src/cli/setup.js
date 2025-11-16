#!/usr/bin/env node

const {
  createYearFolder,
  createPuzzleFolder,
  createLanguageFolder
} = require('../utils/folderManager');

const args = process.argv.slice(2);
const command = args[0];

function showUsage() {
  console.log(`
Advent of Code Setup Tool

Usage:
  node setup.js year <year>                    Create a year folder
  node setup.js puzzle <year> <day>            Create a puzzle folder
  node setup.js language <year> <day> <lang>   Create a language-specific solution

Examples:
  node setup.js year 2024
  node setup.js puzzle 2024 1
  node setup.js language 2024 1 Python
  `);
}

function main() {
  if (!command) {
    showUsage();
    process.exit(1);
  }

  switch (command) {
    case 'year':
      const year = args[1];
      if (!year) {
        console.error('Error: Year is required');
        showUsage();
        process.exit(1);
      }
      const yearPath = createYearFolder(year);
      console.log(`✓ Created year folder: ${yearPath}`);
      break;

    case 'puzzle':
      const puzzleYear = args[1];
      const day = args[2];
      if (!puzzleYear || !day) {
        console.error('Error: Year and day are required');
        showUsage();
        process.exit(1);
      }
      const puzzlePath = createPuzzleFolder(puzzleYear, day);
      console.log(`✓ Created puzzle folder: ${puzzlePath}`);
      break;

    case 'language':
      const langYear = args[1];
      const langDay = args[2];
      const language = args[3];
      if (!langYear || !langDay || !language) {
        console.error('Error: Year, day, and language are required');
        showUsage();
        process.exit(1);
      }
      const langPath = createLanguageFolder(langYear, langDay, language);
      console.log(`✓ Created ${language} solution folder: ${langPath}`);
      break;

    default:
      console.error(`Error: Unknown command "${command}"`);
      showUsage();
      process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
