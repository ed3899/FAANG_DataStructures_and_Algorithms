function recFactorial(x: number): number {
  if (x <= 1) {
    return 1;
  } else {
    return x * recFactorial(x - 1);
  }
}

function tailFactorial(x: number, totalSoFar: number = 1): number {
  if (x === 0) {
    return totalSoFar;
  } else {
    return tailFactorial(x - 1, totalSoFar * x);
  }
}

/*
Given an unsorted array, return the kth largest
element. It is the kth largest element in sorted order, not the kth
distinct element
*/

//! Constraints

/*
Can we get an array where k is larger than the array length?
No, assume an answer is always available
*/

//% Test cases
const t1 = [5, 3, 1, 6, 4, 2];
//Expected: [1,2,3,4,'5',6] , k=2
const t2 = [2, 3, 1, 2, 4, 2];
//Expected: [1,2,'2',2,3,4], k=4
const t3 = [3];
//Expected: ['3'], k=1

//? Solution:

const swap = (array: Array<number>, i: number, j: number) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const partition = (
  array: Array<number>,
  left: number,
  right: number
): number => {
  const pivotElement = array[right];
  let partitionIdx = left;

  for (let j = left; j < right; j++) {
    if (array[j] < pivotElement) {
      swap(array, partitionIdx, j);
      partitionIdx++;
    }
  }

  swap(array, partitionIdx, right);
  return partitionIdx;
};

const quickSort = (array: Array<number>, left: number, right: number) => {
  if (left < right) {
    const partitionIdx = partition(array, left, right);
    quickSort(array, left, partitionIdx - 1);
    quickSort(array, partitionIdx + 1, right);
  }
};

const getKthLargest = (array: Array<number>, k: number): number => {
  const indexToFind = array.length - k;
  quickSort(array, 0, array.length - 1);
  return array[indexToFind];
};

//Time: O(n log n)
//Space: O(log  n)

//Quick select
const quickSelect = (
  array: Array<number>,
  left: number,
  right: number,
  idxToFind: number
): number | undefined | Array<number> => {
  if (left < right) {
    const partitionIdx = partition(array, left, right);
    if (partitionIdx === idxToFind) {
      return array[partitionIdx];
    } else if (idxToFind < partitionIdx) {
      return quickSelect(array, left, partitionIdx - 1, idxToFind);
    } else {
      return quickSelect(array, partitionIdx + 1, right, idxToFind);
    }
  }
};

const getKthLargest_QS = (array: Array<number>, k: number) => {
  const indexToFind = array.length - k;
  quickSelect(array, 0, array.length - 1, indexToFind);
  return array[indexToFind];
};

console.log(getKthLargest_QS(t1, 2));
console.log(getKthLargest_QS(t2, 4));
console.log(getKthLargest_QS(t3, 1));

/*
This means we get O(N + N/2 + N/4 + N/8 + N/16) .... which as we know is equal to O(2N) which is O(N). The worst case is O(N^2) just like quicksort because if the partition element we choose each time ends up being the very last element index, then we actually only reduce our search space by 1 element, which means we get O(N + N - 1 + N - 2 + N - 3 + N - 4....) which is O(N^2)!

Space: O(1)
*/
