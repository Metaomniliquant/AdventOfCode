// Solution for Day 1: Historian Hysteria

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
  const lines = input.trim().split('\n');
  
  const leftList: number[] = [];
  const rightList: number[] = [];
  
  // Parse input into two lists
  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 2) {
      leftList.push(parseInt(parts[0], 10));
      rightList.push(parseInt(parts[1], 10));
    }
  }
  
  // Sort both lists
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);
  
  // Calculate total distance
  let totalDistance = 0;
  for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  }
  
  return totalDistance;
}
