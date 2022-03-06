//? Question
// Get max water container

//! Constrains
// Positive numbers only
// Only two pointers

//// Solution

const heights = [7, 1, 2, 3, 9];

const getMaxWaterContainer = function (heights: Array<number>) {
  let maxArea = 0;
  for (let p1 = 0; p1 < heights.length; p1++) {
    for (let p2 = p1 + 1; p2 < heights.length; p2++) {
      const height: number = Math.min(heights[p1], heights[p2]);
      const width: number = p2 - p1;
      const area: number = height * width;

      maxArea = Math.max(maxArea, area);
    }
  }
  return maxArea;
};

// Time: O(n^2)
// Space: O(1)

//// Solution optimized with two pointer technique

const heights_2: Array<number> = [4, 8, 1, 2, 3, 9];

const getMaxWaterContainer_Optimized = function (heights: Array<number>) {
  let p1 = 0,
    p2 = heights.length - 1,
    maxArea = 0;

  while (p1 < p2) {
    const height: number = Math.min(heights[p1], heights[p2]);
    const width: number = p2 - p1;
    const area: number = height * width;
    maxArea = Math.max(maxArea, area);

    if (heights[p1] <= heights[p2]) {
      p1++;
    } else {
      p2--;
    }
  }

  return maxArea;
};

console.log(getMaxWaterContainer_Optimized(heights_2));
