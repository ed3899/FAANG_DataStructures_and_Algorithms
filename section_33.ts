/**
 * Solve a sudoku
 *
 * !What happens if the board cannot be solved?
 * Leave it as it is
 */

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const solveSudoku = function (_board: (number | string)[][]) {
  const n = _board.length;

  //Type helper
  type ArrayOfIndexedObj_Num_Boo = {[i: number]: boolean}[];

  //%Declare our data structures
  const boxes: ArrayOfIndexedObj_Num_Boo = new Array(n),
    rows: ArrayOfIndexedObj_Num_Boo = new Array(n),
    cols: ArrayOfIndexedObj_Num_Boo = new Array(n);

  //%Get boxID helper
  const _getBoxId = function (_row: number, _col: number) {
    const rowVal = Math.floor(_row / 3) * 3;
    const colVal = Math.floor(_col / 3);
    return rowVal + colVal;
  };

  //%Fill them with empty objects
  for (let i = 0; i < n; i++) {
    [boxes[i], rows[i], cols[i]] = [{}, {}, {}];
  }

  //%Fill in with provided values
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (_board[r][c] !== ".") {
        //Sets the value for each box. We could also use a set, which avoids duplicate values
        const boxID = _getBoxId(r, c);

        //Sets the value for each row and column
        const val = _board[r][c] as number;

        boxes[boxID][val] = true;
        rows[r][val] = true;
        cols[c][val] = true;
      }
    }
  }

  //%Helper for main function
  const _isValid = function (
    _box: {[i: number]: boolean},
    _row: {[i: number]: boolean},
    _col: {[i: number]: boolean},
    _num: any
  ) {
    if (_box[_num] || _row[_num] || _col[_num]) {
      return false;
    } else {
      return true;
    }
  };

  const _solveBacktrack = function (
    _board: (number | string)[][],
    _boxes: ArrayOfIndexedObj_Num_Boo,
    _rows: ArrayOfIndexedObj_Num_Boo,
    _cols: ArrayOfIndexedObj_Num_Boo,
    _r: number,
    _c: number
  ) {
    //Last check
    if (_r === _board.length || _c === _board[0].length) {
      return true;
    } else {
      //Check for empty value
      if ((_board[_r][_c] as string) === ".") {
        //Try 1-9
        for (let num = 1; num <= 9; num++) {
          const numVal = num.toString();
          _board[_r][_c] = numVal;

          //Get the array of hashes needed for verification
          const boxID = _getBoxId(_r, _c);
          const box = boxes[boxID];
          const row = rows[_r];
          const col = cols[_c];

          //Set hashmap in array
          if (_isValid(box, row, col, numVal)) {
            box[numVal as any] = true;
            row[numVal as any] = true;
            col[numVal as any] = true;

            //Check if we are at the edge of a row
            if (_c === _board[0].length - 1) {
              //Go to the following row
              if (_solveBacktrack(_board, _boxes, _rows, _cols, _r + 1, 0)) {
                return true;
              }
            } else {
              if (_solveBacktrack(_board, _boxes, _rows, _cols, _r, _c + 1)) {
                return true;
              }
            }

            //Remove from hash
            delete box[numVal as any];
            delete row[numVal as any];
            delete col[numVal as any];
          }

          //Set value again to dot
          _board[_r][_c] = ".";
        }
      } else {
        //In case we see a prev add number
        if (_c === _board[0].length - 1) {
          if (_solveBacktrack(_board, _boxes, _rows, _cols, _r + 1, 0)) {
            return true;
          }
        } else {
          if (_solveBacktrack(_board, _boxes, _rows, _cols, _r, _c + 1)) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const solveBacktrack2 = function (
    board: any,
    boxes: any,
    rows: any,
    cols: any,
    r: any,
    c: any
  ) {
    //Maybe unncesary check?
    if (r === board.length || c === board[0].length) {
      console.log("c", c);
      return true;
    } else {
      if (board[r][c] === ".") {
        for (let num = 1; num <= 9; num++) {
          const numVal = num.toString();
          board[r][c] = numVal;

          const boxId = _getBoxId(r, c);
          const box = boxes[boxId];
          const row = rows[r];
          const col = cols[c];

          if (_isValid(box, row, col, numVal as any)) {
            box[numVal] = true;
            row[numVal] = true;
            col[numVal] = true;

            if (c === board[0].length - 1) {
              if (solveBacktrack2(board, boxes, rows, cols, r + 1, 0)) {
                return true;
              }
            } else {
              if (solveBacktrack2(board, boxes, rows, cols, r, c + 1)) {
                return true;
              }
            }

            delete box[numVal];
            delete row[numVal];
            delete col[numVal];
          }

          board[r][c] = ".";
        }
      } else {
        if (c === board[0].length - 1) {
          if (solveBacktrack2(board, boxes, rows, cols, r + 1, 0)) {
            return true;
          }
        } else {
          if (solveBacktrack2(board, boxes, rows, cols, r, c + 1)) {
            return true;
          }
        }
      }
    }

    return false;
  };

  //Start backtracking
  _solveBacktrack(_board, boxes, rows, cols, 0, 0);

  // solveBacktrack2(_board, boxes, rows, cols, 0, 0);

  return _board;
};

console.log(solveSudoku(board));
