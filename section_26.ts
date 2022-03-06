/**
 * Given a 2D array containing - 1's (wall), 0's(gates)
 * and INF's (empty room). Fill each empty room with
 * the number of steps to the nearest gate.
 *
 * If it is impossible to reach a gate, leave INF as the value.
 * INF is equal to 2147483647
 */
const INF = 2147483647;

const testMatrix3 = [
  [INF, -1, 0, INF],
  [INF, INF, INF, 0],
  [INF, -1, INF, -1],
  [0, -1, INF, INF],
];

/**
 * T: O(N)
 * S: O(N)
 * @param _matrix
 * @returns
 */
const wallsAndGates = function (_matrix: Array<Array<number>>) {
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const {WALL, GATE, EMPTY} = {
    WALL: -1,
    GATE: 0,
    EMPTY: 2147483647,
  };

  const dfs = function (
    _matrix: Array<Array<number>>,
    _row: number,
    _col: number,
    _currentStep: number
  ) {
    const outOfBoundsOrGreater = function (
      _matrix: Array<Array<number>>,
      _row: number,
      _col: number,
      _currentStep: number
    ) {
      return (
        _row < 0 ||
        _row >= _matrix.length ||
        _col < 0 ||
        _col >= _matrix[0].length ||
        _currentStep > _matrix[_row][_col]
      );
    };

    if (outOfBoundsOrGreater(_matrix, _row, _col, _currentStep)) {
      return;
    }

    _matrix[_row][_col] = _currentStep;

    for (let i = 0; i < directions.length; i++) {
      const currentDir = directions[i];
      //Traverse all directions
      dfs(
        _matrix,
        _row + currentDir[0],
        _col + currentDir[1],
        _currentStep + 1
      );
    }
  };

  for (let row = 0; row < _matrix.length; row++) {
    for (let col = 0; col < _matrix[0].length; col++) {
      if (_matrix[row][col] === GATE) {
        dfs(_matrix, row, col, 0);
      }
    }
  }

  return _matrix;
};

console.log(wallsAndGates(testMatrix3));
