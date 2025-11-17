import { solve } from './solution';
import * as fs from 'fs';
import * as path from 'path';

describe('Day 1: Historian Hysteria', () => {
  describe('Example input', () => {
    const exampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

    test('should calculate correct total distance for example input', () => {
      const result = solve(exampleInput);
      expect(result).toBe(11);
    });

    test('should pair smallest numbers correctly', () => {
      // The smallest number in the left list is 1, and the smallest in right is 3
      // Distance: |1 - 3| = 2
      const input = `1   3`;
      const result = solve(input);
      expect(result).toBe(2);
    });

    test('should handle identical numbers (distance 0)', () => {
      const input = `3   3`;
      const result = solve(input);
      expect(result).toBe(0);
    });

    test('should handle multiple pairs correctly', () => {
      // Pairs: (1,3)=2, (2,3)=1, (3,3)=0, (3,4)=1, (3,5)=2, (4,9)=5
      // Total: 11
      const result = solve(exampleInput);
      expect(result).toBe(11);
    });
  });

  describe('Edge cases', () => {
    test('should handle single pair', () => {
      const input = `5   10`;
      const result = solve(input);
      expect(result).toBe(5);
    });

    test('should handle reverse sorted lists', () => {
      const input = `5   1
4   2
3   3`;
      const result = solve(input);
      // After sorting: left=[3,4,5], right=[1,2,3]
      // Distances: |3-1|=2, |4-2|=2, |5-3|=2
      expect(result).toBe(6);
    });

    test('should handle already sorted lists', () => {
      const input = `1   1
2   2
3   3`;
      const result = solve(input);
      expect(result).toBe(0);
    });

    test('should handle large distances', () => {
      const input = `1   100
2   200`;
      const result = solve(input);
      // After sorting: left=[1,2], right=[100,200]
      // Distances: |1-100|=99, |2-200|=198
      expect(result).toBe(297);
    });
  });

  describe('Actual puzzle input', () => {
    test('should solve actual puzzle input if file exists', () => {
      const inputPath = path.join(__dirname, '../input/input.txt');
      
      if (fs.existsSync(inputPath)) {
        const actualInput = fs.readFileSync(inputPath, 'utf-8');
        
        // Check if the file contains actual puzzle data (not the placeholder)
        if (actualInput.includes('# Actual Puzzle Input')) {
          console.log('Actual puzzle input not found. Please add your input to ../input/input.txt');
          // Skip the test if placeholder is still there
          expect(true).toBe(true);
        } else {
          const result = solve(actualInput);
          
          // The result should be a positive number
          expect(result).toBeGreaterThan(0);
          expect(Number.isNaN(result)).toBe(false);
          
          // Log the result for verification
          console.log(`Actual puzzle answer: ${result}`);
        }
      } else {
        console.log('Actual puzzle input not found. Please add your input to ../input/input.txt');
        // Skip the test if file doesn't exist
        expect(true).toBe(true);
      }
    });
  });
});
