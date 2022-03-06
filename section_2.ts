//? Question
//For a given array of numbers and a target
// Find the index of two numbers that add up to the target

//! Constrains
// Positive numbers only
// No duplicates
// Only two pointers

//! Test cases:
const test_1 = [1, 3, 7, 9, 2];
const t_1 = 11;

//// Solution:
const twoSum = function (nums: number[], target: number) {
  for (let p1 = 0; p1 < nums.length; p1++) {
    const numberToFind = target - nums[p1];
    for (let p2 = p1 + 1; p2 < nums.length; p2++) {
      if (numberToFind === nums[p2]) {
        return [p1, p2];
      }
    }
  }
  return null;
};

//T: O(N^2)
//S: O(1) - Only setting int variables

//? Optimization
// We can trade off some space for time

//// Optimized solution:

//Store the index of the opposing pair

const twoSumOptimized = function (nums: number[], target: number) {
  const numsMap: {
    [target: number]: number;
  } = {};
  
  for (let p1 = 0; p1 < nums.length; p1++) {
    const numberToFind: number = target - nums[p1];
    const indexOfHash = numsMap[nums[p1]];

    if (indexOfHash >= 0) {
      const results = [p1, indexOfHash];
      return results;
    }

    numsMap[numberToFind] = p1;
  }
  return null;
};

//T: O(N)
//S: O(N) - It will only grow as much as the number of elements in the array

console.log(twoSumOptimized(test_1, t_1));
