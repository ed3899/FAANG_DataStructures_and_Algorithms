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

console.log(knightProbability(6, 2, 2, 2));
