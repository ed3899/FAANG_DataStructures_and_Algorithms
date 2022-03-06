/**
 * A company has n employees with unique IDs from
 * 0 to n-1. The head of the company has the ID
 * headID
 *
 * n=8 8 employees: 0,1,2,3,4,5,6,7
 * headID = 4
 *
 * You will receive a managers array where managers[i] is the
 * ID of the manager for the employee i. Each employee
 * has one direct manager. The company head has no managers
 * (manager[headID] = -1). It's guaranted the subordination
 * relationship will have a tree structure.
 *
 * The head of the company wants to inform all employees of news.
 * He will inform his direct subordinates who will inform their
 * subordinates and so on until everyone knows the news.
 *
 * You will receive an informTime array where informTime[i]
 * is the time it takes for employee i to inform all their subordinates.
 * Return the total number of minutes it takes to inform all employees
 * of the news
 *
 * !Constraints:
 * Is this cyclic?No
 * Can employees have more than 1 manager? No, only one
 * Unconnected? Does every employee have a managers? Yes, except for HEAD
 * Weighted?
 * Directed?
 *
 * %Test cases
 * n=8
 * headID=4
 * managers = [2,2,4,6,-1,4,4,5]
 * informTime = [0,0,4,0,7,3,6,0]
 * 13
 *
 * n=1 headID=0
 * managers[-1]
 * informTime[0]
 * 0
 *
 * One sided
 * n=7
 * headId=6
 * manager=[1,2,3,4,5,6,-1]
 * informTime=[0,6,5,4,3,2,1]
 * 21
 */

const managers = [2, 2, 4, 6, -1, 4, 4, 5];
const informTime = [0, 0, 4, 0, 7, 3, 6, 0];

const dfs = function (
  _currentID: number,
  _adjList: Array<Array<number>>,
  _informTime: Array<number>
) {
  const employeeHasNoSubordinates = function (
    _currentID: number,
    _adjList: Array<Array<number>>
  ) {
    return _adjList[_currentID].length === 0;
  };

  if (employeeHasNoSubordinates(_currentID, _adjList)) {
    return 0;
  }

  const subordinates = _adjList[_currentID];

  let max = 0;

  for (let i = 0; i < subordinates.length; i++) {
    max = Math.max(max, dfs(subordinates[i], _adjList, _informTime));
  }

  return max + _informTime[_currentID];
};

/**
 * T: O(N)
 * S: O(N)
 * @param _n
 * @param _headID
 * @param _managers
 * @param _informTime
 * @returns
 */
const numOfMinutes = function (
  _n: number,
  _headID: number,
  _managers: Array<number>,
  _informTime: Array<number>
) {
  const adjList = _managers.map(() => []) as Array<Array<number>>;

  for (let e = 0; e < _n; e++) {
    const manager = _managers[e];

    if (manager === -1) continue;

    adjList[manager].push(e);
  }

  return dfs(_headID, adjList, _informTime);
};

console.log(numOfMinutes(8, 4, managers, informTime));
