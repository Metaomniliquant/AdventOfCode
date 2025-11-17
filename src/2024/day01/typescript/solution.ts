// Solution for Day 1: Historian Hysteria

/**
 * Parses the puzzle input into two separate lists of numbers.
 * 
 * @param input - The puzzle input as a string with two columns of numbers
 * @returns A tuple containing the left and right lists
 */
export function parseInput(input: string): [number[], number[]] {
  const lines = input.trim().split('\n');
  const leftList: number[] = [];
  const rightList: number[] = [];
  
  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 2) {
      leftList.push(parseInt(parts[0], 10));
      rightList.push(parseInt(parts[1], 10));
    }
  }
  
  return [leftList, rightList];
}

/**
 * Sorts both lists in ascending order.
 * 
 * @param lists - Tuple containing the left and right lists
 * @returns A tuple containing the sorted left and right lists
 */
export function sortLists(lists: [number[], number[]]): [number[], number[]] {
  const [left, right] = lists;
  return [
    [...left].sort((a, b) => a - b),
    [...right].sort((a, b) => a - b)
  ];
}

/**
 * Calculates the total distance between two sorted lists.
 * Pairs numbers by index and sums the absolute differences.
 * 
 * @param left - The sorted left list
 * @param right - The sorted right list
 * @returns The total distance between the lists
 */
export function calculateTotalDistance(left: number[], right: number[]): number {
  let totalDistance = 0;
  for (let i = 0; i < left.length; i++) {
    totalDistance += Math.abs(left[i] - right[i]);
  }
  return totalDistance;
}

/**
 * Solves the Historian Hysteria puzzle by calculating the total distance
 * between two lists of location IDs.
 * 
 * Algorithm:
 * 1. Parse the input to extract two lists of numbers
 * 2. Sort both lists in ascending order
 * 3. Pair up numbers by index (smallest with smallest, etc.)
 * 4. Calculate the absolute distance for each pair
 * 5. Sum all distances
 * 
 * @param input - The puzzle input as a string with two columns of numbers
 * @returns The total distance between the two lists
 */
export function solve(input: string): number {
  const lists = parseInput(input);
  const [left, right] = sortLists(lists);
  return calculateTotalDistance(left, right);
}
