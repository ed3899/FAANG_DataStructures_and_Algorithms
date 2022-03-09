/**
 * For a given staircase, the i-th step is assigned
 * a non-negative cost indicated by a cost array.
 *
 * Once you pay the cost for a step, you can either climb
 * one or two steps. Find the minimum cost to reach the top
 * of the staircase. Your first step can either be the first or
 * the second step
 */

/**
 * T: 2^n (doubles every time exponentially)
 * S: The call stack only contains calls of a single branch down to the bottom of our binary tree at worst so while there are still 2^N calls being made, the callstack will only ever be as large as N in size
 * @param _cost
 * @returns
 */
const minCostClimbingStairs = function (_cost: number[]) {
  const n = _cost.length;

  const minCost = function (_i: number, _cost: number[]): number {
    //Out of boundaries
    if (_i < 0) return 0;

    //No number is less than nothin
    if (_i === 0 || _i === 1) return _cost[_i];

    return _cost[_i] + Math.min(minCost(_i - 1, _cost), minCost(_i - 2, _cost));
  };

  //Recurrence relation
  return Math.min(minCost(n - 1, _cost), minCost(n - 2, _cost));
};

console.log(minCostClimbingStairs([20, 15, 30, 5]));

const minCostClimbingStairs_DP = function (_cost: number[]) {
  const n = _cost.length;

  //Array to store previously calculated trees
  const dp: number[] = [];

  //Function declaration
  const minCost = function (_i: number, _cost: number[], _dp: number[]) {
    if (_i < 0) return 0;

    if (_i === 0 || _i === 1) return _cost[_i];

    //Check for storage
    if (_dp[_i] !== undefined) return _dp[_i];

    //Store
    _dp[_i] =
      _cost[_i] +
      Math.min(minCost(_i - 1, _cost, _dp), minCost(_i - 2, _cost, _dp));

    return _dp[_i];
  };

  return Math.min(minCost(n - 1, _cost, dp), minCost(n - 2, _cost, dp));
};

console.log("DP", minCostClimbingStairs_DP([20, 15, 30, 5]));

/**
 * T:O(n)
 * S:O(n)
 * @param _cost
 * @returns
 */
const minCostClimbingStairs_Ite = function (_cost: number[]) {
  const dp: number[] = [];

  const n = _cost.length;

  if (n === 0) return 0;

  if (n === 1) return _cost[0];

  for (let i = 0; i < n; i++) {
    if (i < 2) {
      dp[i] = _cost[i];
    } else {
      dp[i] = _cost[i] + Math.min(dp[i - 1], dp[i - 2]);
    }
  }

  return Math.min(dp[n - 1], dp[n - 2]);
};

console.log("It", minCostClimbingStairs_Ite([20, 15, 30, 5]));

/**
 * T:O(n)
 * S:O(1)
 * @param _cost 
 * @returns 
 */
const minCostClimbingStairs_IteOpt = function (_cost: number[]) {
  const n = _cost.length;

  if (n === 0) return 0;

  if (n === 1) return _cost[0];

  let [dpOne, dpTwo] = [_cost[0], _cost[1]];

  for (let i = 2; i < n; i++) {
    const current = _cost[i] + Math.min(dpOne, dpTwo);
    [dpOne, dpTwo] = [dpTwo, current];
  }

  return Math.min(dpOne, dpTwo);
};

console.log("MCOPTit", minCostClimbingStairs_IteOpt([20, 15, 30, 5]))
