/**
 * On a given nxn chessboard, a knight piece will
 * start at the r-th row and c-th column. The knight
 * will attempt to make k moves
 *
 * A knight can move in 8 possible ways. Each move
 * will choose one of these 8 at random. The knight
 * continues moving until it finishes k moves or it moves
 * off the chessboard. Return the probability that the
 * knight is on the chessboard after it finished moving
 *
 * !Constraints
 *
 * How many decimals do we round to?
 */

/**
 * T:O(8^_numberOfMovs)
 * S:O(8^_numberOfMovs)? Maybe O(_numberOfMovs) -> height of the tree
 * @param _nSquareSize
 * @param _numberOfMovs
 * @param _row
 * @param _col
 * @returns
 */
const knightProbability = function (
  _nSquareSize: number,
  _numberOfMovs: number,
  _row: number,
  _col: number
) {
  const directions = [
    //Two up, one left
    [-2, -1],
    //Two up, one right
    [-2, 1],
    //One up, two right
    [-1, 2],
    //One down, two right
    [1, 2],
    //Two down, one right
    [2, 1],
    //Two down, one left
    [2, -1],
    //One down, two left
    [1, -2],
    //One up, two left
    [-1, -2],
  ];

  const _init = function (
    _nSquareSize: number,
    _numberOfMovs: number,
    _row: number,
    _col: number,
    _directions: number[][]
  ) {
    const outOfBounds = function (
      _nSquareSize: number,
      _row: number,
      _col: number
    ) {
      //Limits of chessboard. Non inclusive indexing
      return (
        _row < 0 || _col < 0 || _row >= _nSquareSize || _col >= _nSquareSize
      );
    };

    if (outOfBounds(_nSquareSize, _row, _col)) return 0;

    if (_numberOfMovs === 0) return 1;

    let response = 0;

    for (const move of _directions) {
      const [x, y] = move;

      response +=
        _init(
          _nSquareSize,
          _numberOfMovs - 1,
          _row + x,
          _col + y,
          _directions
        ) / 8;
    }

    return response;
  };

  return _init(_nSquareSize, _numberOfMovs, _row, _col, directions);
};

console.log("Normal", knightProbability(6, 2, 2, 2));

const knightProbability_Memo = function (
  _nSquareSize: number,
  _numberOfMovs: number,
  _row: number,
  _col: number
) {
  const directions = [
    //Two up, one left
    [-2, -1],
    //Two up, one right
    [-2, 1],
    //One up, two right
    [-1, 2],
    //One down, two right
    [1, 2],
    //Two down, one right
    [2, 1],
    //Two down, one left
    [2, -1],
    //One down, two left
    [1, -2],
    //One up, two left
    [-1, -2],
  ];

  //Columns of the matrix
  const movMatrixCols = new Array(_nSquareSize).fill(0);

  //Generate matrix
  const movMatrix = movMatrixCols.map(() =>
    //Generate row per each column
    new Array(_nSquareSize).fill(undefined)
  );

  //Generate matrix per each _numberOfMovs + 1, because our moves are not indexed
  const movMatrixArray = new Array(_numberOfMovs + 1)
    .fill(0)
    //!Be careful here because were are only returning a reference to the same matrix
    .map(() => movMatrix);

  //Declare recursive function
  const recurse = function (
    _nSquareSize: number,
    _numberOfMovs: number,
    _row: number,
    _col: number,
    _movMatrixArray: unknown[][][],
    _directions: number[][]
  ) {
    //Check
    const outOfBounds = function (
      _row: number,
      _col: number,
      _nSquareSize: number
    ) {
      return (
        _row < 0 || _col < 0 || _row >= _nSquareSize || _col >= _nSquareSize
      );
    };

    if (outOfBounds(_row, _col, _nSquareSize)) return 0;

    if (_numberOfMovs === 0) return 1;

    if (_movMatrixArray[_numberOfMovs][_row][_col] !== undefined)
      return _movMatrixArray[_numberOfMovs][_row][_col] as number;

    let res = 0;

    //Sum results
    for (const move of _directions) {
      const [y, x] = move;
      res +=
        (recurse(
          _nSquareSize,
          _numberOfMovs - 1,
          _row + y,
          _col + x,
          _movMatrixArray,
          _directions
        ) as number) / 8;
    }

    //Set result
    _movMatrixArray[_numberOfMovs][_row][_col] = res;

    return _movMatrixArray[_numberOfMovs][_row][_col] as number;
  };

  return recurse(
    _nSquareSize,
    _numberOfMovs,
    _row,
    _col,
    movMatrixArray,
    directions
  );
};

console.log("Memo", knightProbability_Memo(6, 2, 2, 2));

/**
 * T: O(K * N^2)
 * S: O(K * N^2)
 * @param _nSquareSize
 * @param _kMoves
 * @param _initialRow
 * @param _initialColumn
 * @returns
 */
const knightProbTab = function (
  _nSquareSize: number,
  _kMoves: number,
  _initialRow: number,
  _initialColumn: number
) {
  //Eight posible knight directions
  const directions = [
    //Two up, one left
    [-2, -1],
    //Two up, one right
    [-2, 1],
    //One up, two right
    [-1, 2],
    //One down, two right
    [1, 2],
    //Two down, one right
    [2, 1],
    //Two down, one left
    [2, -1],
    //One down, two left
    [1, -2],
    //One up, two left
    [-1, -2],
  ];

  //Check boundaries
  const withinChessboard = function (
    _row: number,
    _col: number,
    _nSquareSize: number
  ) {
    //nSquareSize is basically the non-inclusive length, so no index should touch it
    return _row >= 0 && _col >= 0 && _row < _nSquareSize && _col < _nSquareSize;
  };

  //Temp matrix
  const dp = new Array(_kMoves + 1)
    .fill(0)
    .map(() =>
      new Array(_nSquareSize).fill(0).map(() => new Array(_nSquareSize).fill(0))
    );

  //Set initial prob
  dp[0][_initialRow][_initialColumn] = 1;

  //Skip the first array as zero moves are taken, the piece is placed
  for (let step = 1; step <= _kMoves; step++) {
    //Scan the matrix of this step
    for (let row = 0; row < _nSquareSize; row++) {
      for (let col = 0; col < _nSquareSize; col++) {
        for (const move of directions) {
          const [y, x] = move;
          const [prevRow, prevCol] = [row + y, col + x];
          if (withinChessboard(prevRow, prevCol, _nSquareSize)) {
            //Add up the probability for this cell
            dp[step][row][col] += dp[step - 1][prevRow][prevCol] / 8;
          }
        }
      }
    }
  }

  let res = 0;

  for (let i = 0; i < _nSquareSize; i++) {
    for (let j = 0; j < _nSquareSize; j++) {
      /**
       * Only add up the probabilities of the last array, which should contain all the
       * previous sums of probabilities
       **/
      res += dp[_kMoves][i][j];
    }
  }

  console.log("dp", dp);

  return res;
};

console.log("Knight Prob Tab", knightProbTab(6, 3, 2, 2));

/**
 * T: O(K*N^2)
 * S: O(N^2)
 * @param _nSquareSize
 * @param _kMoves
 * @param _initialRow
 * @param _initialColumn
 * @returns
 */
const knightProbTab_Opt = function (
  _nSquareSize: number,
  _kMoves: number,
  _initialRow: number,
  _initialColumn: number
) {
  //Eight posible knight directions
  const directions = [
    //Two up, one left
    [-2, -1],
    //Two up, one right
    [-2, 1],
    //One up, two right
    [-1, 2],
    //One down, two right
    [1, 2],
    //Two down, one right
    [2, 1],
    //Two down, one left
    [2, -1],
    //One down, two left
    [1, -2],
    //One up, two left
    [-1, -2],
  ];

  //Check boundaries
  const withinChessboard = function (
    _row: number,
    _col: number,
    _nSquareSize: number
  ) {
    //nSquareSize is basically the non-inclusive length, so no index should touch it
    return _row >= 0 && _col >= 0 && _row < _nSquareSize && _col < _nSquareSize;
  };

  //Prev matrix
  let prevDp = new Array(_nSquareSize)
    .fill(0)
    .map(() => new Array(_nSquareSize).fill(0));

  //Current matrix
  let currentDp = new Array(_nSquareSize)
    .fill(0)
    .map(() => new Array(_nSquareSize).fill(0));

  //Set initial prob
  prevDp[_initialRow][_initialColumn] = 1;

  //Skip the first array as zero moves are taken, the piece is placed
  for (let step = 1; step <= _kMoves; step++) {
    //Scan the matrix of this step
    for (let row = 0; row < _nSquareSize; row++) {
      for (let col = 0; col < _nSquareSize; col++) {
        for (const move of directions) {
          const [y, x] = move;
          const [prevRow, prevCol] = [row + y, col + x];
          if (withinChessboard(prevRow, prevCol, _nSquareSize)) {
            //Add up the probability for this cell
            currentDp[row][col] += prevDp[prevRow][prevCol] / 8;
          }
        }
      }
    }
    //Reassign and create a new empty one
    [prevDp, currentDp] = [
      currentDp,
      new Array(_nSquareSize)
        .fill(0)
        .map(() => new Array(_nSquareSize).fill(0)),
    ];
  }

  let res = 0;

  for (let i = 0; i < _nSquareSize; i++) {
    for (let j = 0; j < _nSquareSize; j++) {
      /**
       * Only add up the probabilities of the last array, which should contain all the
       * previous sums of probabilities
       **/
      res += prevDp[i][j];
    }
  }

  return res;
};

console.log("Knight Prob Tab Opt", knightProbTab_Opt(6, 3, 2, 2));
