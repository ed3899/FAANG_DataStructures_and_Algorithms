const matrix = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
];

/**
 * Time: O(n)
 * Space: O(n)
 * @param _matrix
 * @returns An array with the values in order of traversal
 */
const traversalDFS = function (_matrix: Array<Array<number>>) {
  const directions = [
    /** Up */
    [-1, 0],
    /**Right */
    [0, 1],
    /**Down */
    [1, 0],
    /** Left */
    [0, -1],
  ];

  const _traversalDFS = function (_matrix: Array<Array<number>>) {
    const seen = new Array(_matrix.length).fill(0).map(() => {
      return new Array(_matrix[0].length).fill(false);
    });

    const values: Array<number> = [];

    dfs(_matrix, 0, 0, seen, values);

    return values;
  };

  const dfs = function (
    _matrix: Array<Array<number>>,
    _row: number,
    _col: number,
    _seen: Array<Array<boolean>>,
    _values: Array<number>
  ) {
    if (
      _row < 0 ||
      _col < 0 ||
      _row >= _matrix.length ||
      _col >= _matrix[0].length ||
      _seen[_row][_col]
    )
      return;

    _values.push(_matrix[_row][_col]);
    _seen[_row][_col] = true;

    for (let i = 0; i < directions.length; i++) {
      const currentDirection = directions[i];
      dfs(
        _matrix,
        _row + currentDirection[0],
        _col + currentDirection[1],
        _seen,
        _values
      );
    }
  };

  return _traversalDFS(_matrix);
};

const traversalBFS = function (_matrix: Array<Array<number>>) {
  const directions = [
    /** Up */
    [-1, 0],
    /**Right */
    [0, 1],
    /**Down */
    [1, 0],
    /** Left */
    [0, -1],
  ];

  /**
   * Time: O(n)
   * Space: O(n)
   * @param _matrix
   * @returns Array of numbers in visit order
   */
  const _traversalBFS = function (_matrix: Array<Array<number>>) {
    const seen = new Array(_matrix.length).fill(0).map(() => {
      return new Array(_matrix[0].length).fill(false);
    });

    const values: Array<number> = [];

    /**
     * Coordinates
     */
    const queue: Array<Array<number>> = [[0, 0]];

    const outsideOfBoundsOrSeen = function (
      _row: number,
      _col: number,
      _matrix: Array<Array<number>>,
      _seen: Array<Array<boolean>>
    ) {
      return (
        _row < 0 ||
        _row >= _matrix.length ||
        _col < 0 ||
        _col >= _matrix[0].length ||
        _seen[_row][_col]
      );
    };

    while (queue.length) {
      const [row, col] = queue.shift() as Array<number>;

      if (outsideOfBoundsOrSeen(row, col, _matrix, seen)) {
        continue;
      }

      seen[row][col] = true;
      values.push(_matrix[row][col]);

      /**
       * Populate the queue
       */
      for (let i = 0; i < directions.length; i++) {
        const currentDir = directions[i];
        queue.push([row + currentDir[0], col + currentDir[1]]);
      }
    }

    return values;
  };

  return _traversalBFS(_matrix);
};
