import { solve, parseInput, sortLists, calculateTotalDistance } from './solution';
import * as fs from 'fs';
import * as path from 'path';

describe('Day 1: Historian Hysteria', () => {
  describe('Example input', () => {
    // Load example input from file
    const exampleInputPath = path.join(__dirname, '../input/example.txt');
    const exampleInput = fs.readFileSync(exampleInputPath, 'utf-8');

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
  });

  describe('Separated concerns', () => {
    test('parseInput should extract two lists correctly', () => {
      const input = `3   4
4   3
2   5`;
      const [left, right] = parseInput(input);
      expect(left).toEqual([3, 4, 2]);
      expect(right).toEqual([4, 3, 5]);
    });

    test('sortLists should sort both lists in ascending order', () => {
      const lists: [number[], number[]] = [[3, 1, 2], [6, 4, 5]];
      const [left, right] = sortLists(lists);
      expect(left).toEqual([1, 2, 3]);
      expect(right).toEqual([4, 5, 6]);
    });

    test('sortLists should not mutate original lists', () => {
      const leftOriginal = [3, 1, 2];
      const rightOriginal = [6, 4, 5];
      const lists: [number[], number[]] = [leftOriginal, rightOriginal];
      sortLists(lists);
      expect(leftOriginal).toEqual([3, 1, 2]); // unchanged
      expect(rightOriginal).toEqual([6, 4, 5]); // unchanged
    });

    test('calculateTotalDistance should compute sum of absolute differences', () => {
      const left = [1, 2, 3];
      const right = [3, 3, 3];
      const distance = calculateTotalDistance(left, right);
      // |1-3| + |2-3| + |3-3| = 2 + 1 + 0 = 3
      expect(distance).toBe(3);
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
    test('should calculate correct answer for actual puzzle input', () => {
      const inputPath = path.join(__dirname, '../input/input.txt');
      
      // Skip test if input file doesn't exist
      if (!fs.existsSync(inputPath)) {
        return;
      }
      
      const actualInput = fs.readFileSync(inputPath, 'utf-8');
      const result = solve(actualInput);
      
      // Verified correct answer for AoC 2024 Day 1 Part 1
      expect(result).toBe(1151792);
    });
  });
});
