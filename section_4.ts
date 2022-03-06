//? Question
// Get water trapped

//! Constrains
// Positive numbers only
// Only two pointers

//// Solution

const heights_section4 = [0, 1, 0, 2, 1, 0, 3, 1, 0, 1, 2];

const getTrappedRainwater = function (heights: Array<number>) {
  let totalWater: number = 0;

  for (let p = 0; p < heights.length; p++) {
    let leftP = p,
      rightP = p,
      maxLeft = 0,
      maxRight = 0;

    while (leftP >= 0) {
      maxLeft = Math.max(maxLeft, heights[leftP]);
      leftP--;
    }

    while (rightP < heights.length) {
      maxRight = Math.max(maxRight, heights[rightP]);
      rightP++;
    }

    const currentWater = Math.min(maxLeft, maxRight) - heights[p];

    if (currentWater >= 0) {
      totalWater += currentWater;
    }
  }

  return totalWater;
};

// Time: O(n^2)
// Space: O(1)

//// Optimized Solution

//Steps:
/*
[a,b,c,d,e]
p1.......p2

1. Identify between the lesser between the left and the right pointer
2. Is this pointer value greather than or equal to max on that side?
    - Yes -> update max on that side
    - No -> get water for that pointer and add it to the total
3. Move pointer inwards
4. Repeat for other pointer
*/

const getTrappedRainwater_Optimized = function (heights: Array<number>) {
  let left = 0,
    right = heights.length - 1,
    maxLeft = 0,
    maxRight = 0,
    totalWater = 0;

  while (left < right) {
    if (heights[left] <= heights[right]) {
      if (heights[left] >= maxLeft) {
        maxLeft = heights[left];
      } else {
        totalWater += maxLeft - heights[left];
      }
      left++;
    } else {
      if (heights[right] >= maxRight) {
        maxRight = heights[right];
      } else {
        totalWater += maxRight - heights[right];
      }
      right--;
    }
  }

  return totalWater;
};

console.log(getTrappedRainwater_Optimized(heights_section4));
//Time O(n)
//Space O(1)
