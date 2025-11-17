# Day 1: Historian Hysteria

## Problem

[Link to problem](https://adventofcode.com/2024/day/1)

## Problem Description

The Chief Historian is missing! The Elves need to check historically significant locations. They've split into two groups, each creating a list of location IDs to check. However, the two lists don't match up well.

### Part 1: Calculate Total Distance

To reconcile the lists, we need to:
1. Pair up the smallest number in the left list with the smallest in the right list
2. Then pair the second-smallest numbers, and so on
3. Calculate the distance (absolute difference) for each pair
4. Sum all the distances

**Example:**
```
Left:  3 4 2 1 3 3
Right: 4 3 5 3 9 3
```

After sorting:
```
Left:  1 2 3 3 3 4
Right: 3 3 3 4 5 9
```

Pairs and distances:
- (1, 3): distance = 2
- (2, 3): distance = 1
- (3, 3): distance = 0
- (3, 4): distance = 1
- (3, 5): distance = 2
- (4, 9): distance = 5

**Total distance: 11**

## Solutions

### TypeScript Solution

**Location:** `typescript/solution.ts`

**Architecture:**
The solution follows a functional programming approach with separated concerns:
- `parseInput()` - Extracts two lists from the input string
- `sortLists()` - Sorts both lists in ascending order (immutable)
- `calculateTotalDistance()` - Computes sum of absolute differences
- `solve()` - Orchestrates the complete solution

**Algorithm:**
1. Parse input to extract two lists of numbers
2. Sort both lists in ascending order
3. Pair numbers by index (smallest with smallest)
4. Calculate absolute distance for each pair
5. Sum all distances

**Running Tests:**
```bash
# Run all TypeScript tests
npm run test:typescript

# Run tests in watch mode
npm run test:typescript:watch

# Type checking
npm run typecheck:typescript

# Linting
npm run lint:typescript
```

**Test Coverage:**
- ✅ Example input validation (loaded from `input/example.txt`, expected result: 11)
- ✅ Individual function unit tests (parseInput, sortLists, calculateTotalDistance)
- ✅ Immutability tests (ensures functions don't mutate input)
- ✅ Edge cases (single pair, reverse sorted, already sorted)
- ✅ Large distance calculations
- ✅ Actual puzzle input validation (expected: 1151792)

**Quality Assurance:**
- TypeScript strict mode enabled
- ESLint validation with TypeScript rules
- Vitest for fast, modern testing
- Separated concerns for maintainability

### Input Files

- `input/example.txt` - Example puzzle input from problem description
- `input/input.txt` - Your personal puzzle input

### How to Add Your Puzzle Input

1. Visit https://adventofcode.com/2024/day/1/input
2. Log in to Advent of Code
3. Copy your personal puzzle input
4. Replace the content of `input/input.txt` with your input

### Expected Results

- **Example Input:** 11
- **Actual Input:** 1151792

## Acceptance Criteria Status

- [x] The smallest number in the left list is 1, smallest in right is 3, distance = 2
- [x] Second-smallest: 2 and 3, distance = 1
- [x] Third-smallest: 3 and 3, distance = 0
- [x] Next pair: 3 and 4, distance = 1
- [x] Fifth pair: 3 and 5, distance = 2
- [x] Largest pair: 4 and 9, distance = 5
- [x] Total distance for example = 11 (2+1+0+1+2+5)
- [x] All TypeScript tests pass for example input
- [x] All TypeScript tests pass for actual puzzle input (answer: 1151792)
- [x] Solution validated for both example and actual inputs
- [x] Code tested and validated
- [x] Documentation updated

## Notes

The solution uses a straightforward approach:
- **Time Complexity:** O(n log n) due to sorting
- **Space Complexity:** O(n) for storing the two lists

This is optimal for this problem since we need to sort the lists anyway.
