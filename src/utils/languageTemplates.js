/**
 * Language template configurations for Advent of Code solutions
 * Each language has a set of files with their content
 */

const templates = {
  javascript: [
    {
      filename: 'solution.js',
      content: '// Solution for this puzzle\n\nfunction solve(input) {\n  // Implement your solution here\n  return null;\n}\n\nmodule.exports = { solve };\n'
    },
    {
      filename: 'solution.test.js',
      content: 'const { solve } = require(\'./solution\');\n\ntest(\'sample test\', () => {\n  // Add your tests here\n});\n'
    }
  ],
  python: [
    {
      filename: 'solution.py',
      content: '# Solution for this puzzle\n\ndef solve(input_data):\n    """Implement your solution here"""\n    pass\n\nif __name__ == "__main__":\n    with open("../input/input.txt") as f:\n        data = f.read()\n    result = solve(data)\n    print(result)\n'
    },
    {
      filename: 'test_solution.py',
      content: 'from solution import solve\n\ndef test_sample():\n    # Add your tests here\n    pass\n'
    }
  ],
  go: [
    {
      filename: 'solution.go',
      content: 'package main\n\nimport (\n\t"fmt"\n\t"os"\n)\n\nfunc solve(input string) interface{} {\n\t// Implement your solution here\n\treturn nil\n}\n\nfunc main() {\n\tdata, _ := os.ReadFile("../input/input.txt")\n\tresult := solve(string(data))\n\tfmt.Println(result)\n}\n'
    },
    {
      filename: 'solution_test.go',
      content: 'package main\n\nimport "testing"\n\nfunc TestSample(t *testing.T) {\n\t// Add your tests here\n}\n'
    }
  ],
  typescript: [
    {
      filename: 'solution.ts',
      content: '// Solution for this puzzle\n\nexport function solve(input: string): number | null {\n  // Implement your solution here\n  return null;\n}\n'
    },
    {
      filename: 'solution.test.ts',
      content: 'import { solve } from \'./solution\';\n\ntest(\'sample test\', () => {\n  // Add your tests here\n});\n'
    }
  ]
};

/**
 * Gets the template configuration for a specific language
 * @param {string} language - The programming language
 * @returns {Array<{filename: string, content: string}>|null} - Array of file templates or null if not found
 */
function getLanguageTemplate(language) {
  const normalizedLanguage = language.toLowerCase();
  return templates[normalizedLanguage] || null;
}

/**
 * Creates a generic template for unsupported languages
 * @param {string} language - The programming language
 * @returns {Array<{filename: string, content: string}>}
 */
function getGenericTemplate(language) {
  return [
    {
      filename: 'solution.txt',
      content: `Solution for this puzzle in ${language}\n`
    }
  ];
}

module.exports = {
  getLanguageTemplate,
  getGenericTemplate
};
