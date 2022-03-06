const binarySearch = <T>(
  nums: Array<T>,
  left: number,
  right: number,
  target: T
) => {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const foundVal = nums[mid];

    if (foundVal === target) return mid;
    else if (foundVal < target) {
      //throw everything to the left
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};

// T:O(log n)
// S:O(1)

/*
Given an array of integers sorted in ascending order,
return the starting and ending index of a given target
value in an array, i.e. [x,y]

Should run in O(log n) time

*/

//! Constraints
//Return -1 if not found, all values are positive

//% Test cases
/*
t=5
[1,3,3,5,5,5,8,9]
Start:3 Ending:5

t=4
[1,2,3,4,5,6]
Start:3 Ending:3

t=9
[1,2,3,4,5,6]
[-1,-1]

t=3
[]
[-1,-1]
*/

const searchRange = (nums: Array<number>, target: number): Array<number> => {
  if (nums.length === 0) return [-1, -1];

  const firstPos = binarySearch(nums, 0, nums.length - 1, target);

  if (firstPos === -1) return [-1, -1];

  let startPos: number = firstPos,
    endPos: number = firstPos,
    temp1: number = 0,
    temp2: number = 0;

  //Searching to the right
  while (startPos !== -1) {
    temp1 = startPos;
    startPos = binarySearch(nums, 0, startPos - 1, target);
  }
  startPos = temp1;

  while (endPos !== -1) {
    temp2 = endPos;
    endPos = binarySearch(nums, endPos + 1, nums.length - 1, target);
  }
  endPos = temp2;

  return [startPos, endPos];
};

// Time -> O(log n)
//Space -> O(n)
