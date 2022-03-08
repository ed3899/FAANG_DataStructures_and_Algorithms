/**
 * For a given staircase, the i-th step is assigned
 * a non-negative cost indicated by a cost array.
 *
 * Once you pay the cost for a step, you can either climb
 * one or two steps. Find the minimum cost to reach the top
 * of the staircase. Your first step can either be the first or
 * the second step
 */

const minCost = function (_i: number, _cost: number[]): number {
  //Out of boundaries
  if (_i < 0) return 0;

  //No number is less than nothin
  if (_i === 0 || _i === 1) return _cost[_i];

  return _cost[_i] + Math.min(minCost(_i - 1, _cost), minCost(_i - 2, _cost));
};

/**
 * T: 2^n (doubles every time exponentially)
 * S: The call stack only contains calls of a single branch down to the bottom of our binary tree at worst so while there are still 2^N calls being made, the callstack will only ever be as large as N in size
 * @param _cost 
 * @returns 
 */
const minCostClimbingStairs = function (_cost: number[]) {
  const n = _cost.length;
  //Recurrence relation
  return Math.min(minCost(n - 1, _cost), minCost(n - 2, _cost));
};

console.log(minCostClimbingStairs([20, 15, 30, 5]))