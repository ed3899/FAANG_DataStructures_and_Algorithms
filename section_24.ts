/**
 * Given an array containing only 1's (land)
 * and 0's (water), count the number of island.
 *
 * An island is land connected horizontally or vertically
 *
 * !Constraints
 * Are the edges of the 2-D Array water?
 * Yes, everything outside the 2-D array is water
 *
 * %Test cases:
 *
 * [
  [1, 1, 1, 1, 0],
  [1, 1, 0, 1, 0],
  [1, 1, 0, 0, 1],
  [0, 0, 0, 1, 1],
] -> 2

[
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1],
  [0, 1, 1, 1, 0],
  [1, 0, 1, 0, 1],
]; -> 7

[] -> 0

[[],[]] -> 0
 *
 *
 */

const testMatrix = [
  [1, 1, 1, 0, 0],
  [1, 1, 1, 0, 1],
  [0, 1, 0, 0, 1],
  [0, 0, 0, 1, 1],
];

/**
 * T: O(MxN)
 * S: O(max(M,N)) -> diagonal, not always the case as with skinny matrices
 *
 * vs
 *
 * DFS
 * T: O(mxn)
 * S: O(mxn)
 *
 * @param _matrix
 * @returns Number of islands. 1's equal to a possible island
 */
const numberOfIslands = function (_matrix: Array<Array<number>>) {
  if (_matrix.length === 0) return 0;

  const directions = [
    // Up
    [-1, 0],
    // Right
    [0, 1],
    // Down
    [1, 0],
    // Left
    [0, -1],
  ];

  let islandCount = 0;

  const outOfBounds = function (
    _nextRow: number,
    _nextCol: number,
    _matrix: Array<Array<number>>
  ) {
    return (
      _nextRow < 0 ||
      _nextRow >= _matrix.length ||
      _nextCol < 0 ||
      _nextCol >= _matrix[0].length
    );
  };

  const isIsland = function (
    _nextRow: number,
    _nextCol: number,
    _matrix: Array<Array<number>>
  ) {
    return _matrix[_nextRow][_nextCol] === 1;
  };

  for (let row = 0; row < _matrix.length; row++) {
    for (let col = 0; col < _matrix[0].length; col++) {
      if (_matrix[row][col] === 1) {
        islandCount++;

        _matrix[row][col] = 0;

        // Initiate bfs
        //Ideally we would implement a queue in JavaScript (Linked List, O(1) shift)
        const queue: Array<Array<number>> = [];

        queue.push([row, col]);

        while (queue.length) {
          const currentPos = queue.shift() as Array<number>;

          const [currentRow, currentCol] = currentPos;

          for (let i = 0; i < directions.length; i++) {
            const currentDir = directions[i];

            const [nextRow, nextCol] = [
              currentRow + currentDir[0],
              currentCol + currentDir[1],
            ];

            if (outOfBounds(nextRow, nextCol, _matrix)) {
              continue;
            }

            if (isIsland(nextRow, nextCol, _matrix)) {
              queue.push([nextRow, nextCol]);

              _matrix[nextRow][nextCol] = 0;
            }
          }
        }
      }
    }
  }

  return islandCount;
};


