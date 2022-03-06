/**
 * Given a 2D array containing 0's(empty cell),
 * 1's(fresh orange) and 2's(rotten orange).
 * Every minute, all fresh orange immediately
 * adjacent(4 directions) to rotten oranges will rot.
 *
 * How many minutes must pass untill all oranges
 * are rotten?
 *
 * !Constraints
 *
 * What do we return if it's not possible?
 * -1
 *
 * What do we return if there are no oranges?
 * 0
 *
 * %Test cases
 * [[2,1,1,0,0],
 * [1,1,1,0,0],
 * [0,1,1,1,1],
 * [0,1,0,0,1]
 * ]
 *
 * [[1,1,0,0,0],
 * [2,1,0,0,0],
 * [0,0,0,1,2],
 * [0,1,0,0,1]]
 *
 */

const directions = [
  //Up
  [-1, 0],
  //Right
  [0, 1],
  //Down
  [1, 0],
  //Left
  [0, -1],
];

const testMatrix2 = [
  [2, 1, 1, 0, 0],
  [1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1],
  [0, 1, 0, 0, 1],
];

const orangesRotting = function (_matrix: Array<Array<number>>) {
  if (_matrix.length === 0) return 0;

  const orange = {
    EMPTY: 0,
    FRESH: 1,
    ROTTEN: 2,
  };

  //Keep track of layer/minutes
  const queue: Array<Array<number>> = [];

  //Make sure we rot them all
  let freshOranges = 0;

  //Count all rot and fresh oranges
  for (let row = 0; row < _matrix.length; row++) {
    for (let col = 0; col < _matrix[0].length; col++) {
      if (_matrix[row][col] === orange.ROTTEN) {
        queue.push([row, col]);
      }

      if (_matrix[row][col] === orange.FRESH) {
        freshOranges++;
      }
    }
  }

  let currentQueueSize = queue.length,
    minutes = 0;

  while (queue.length) {
    if (currentQueueSize === 0) {
      currentQueueSize = queue.length;
      minutes++;
    }

    const currentOrange = queue.shift() as Array<number>;
    currentQueueSize--;
    const [row, col] = [currentOrange[0], currentOrange[1]];

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

    //BFS
    for (let i = 0; i < directions.length; i++) {
      const currentDir = directions[i];
      const [nextRow, nextCol] = [currentDir[0] + row, currentDir[1] + col];

      if (outOfBounds(nextRow, nextCol, _matrix)) {
        continue;
      }

      if (_matrix[nextRow][nextCol] === orange.FRESH) {
        //Rot orange
        _matrix[nextRow][nextCol] = 2;

        freshOranges--;
        //Coordinate of new rotten orange
        queue.push([nextRow, nextCol]);
      }
    }
  }

  if (freshOranges > 0) return -1;

  return minutes;
};

