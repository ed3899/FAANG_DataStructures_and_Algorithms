/**
 * There are a total of n courses to take, labeled from 0 to n-1
 *
 * Some courses have prerequisite courses. This is expressed as
 * a pair i.e.[1,0] which indicates you must take course 0
 * before taking course 1
 *
 * Given the total number of courses and an array of prerequisite pair,
 * return if its possible to finish all courses.
 *
 * Examples:
 * n=6 -> [0,1,2,3,4,5]
 *
 * [[1,0],[2,1],[2,5],[0,3],[4,3],[3,5],[4,5]]
 *
 * We need to detect cycles, that way we know it is not possible. If
 * we are cyclic (going back to the same node we started)
 *
 * !Constraints
 * Can we have courses unconnected to other courses?
 * Yes, account for separate course chains
 *
 * %Test cases
 * n=7 prereque = [[0,3],[1,0],[2,1],[4,5],[6,4],[5,6]]
 *
 * n=0 -> [] True
 */

const p = [
  [1, 0],
  [2, 1],
  [2, 5],
  [0, 3],
  [4, 3],
  [3, 5],
  [4, 5],
];

/**
 * T: O(P + n^3)
 * S: O(n^2)
 * @param _n
 * @param _prerequisites
 * @returns
 */
const canFinish = function (_n: number, _prerequisites: Array<Array<number>>) {
  /**
   *Fill creates a references to the same array if we were to fill it with []
   Map generates a new one
   */
  const createAdjacencyList = function (
    _n: number,
    _prerequisites: Array<Array<number>>
  ) {
    const adjList: Array<Array<number>> = new Array(_n).fill(0).map(() => []);

    for (let i = 0; i < _prerequisites.length; i++) {
      const pair = _prerequisites[i];
      adjList[pair[1]].push(pair[0]);
    }

    return adjList;
  };
  const vertexHasNotBeenSeen = function (
    _vertex: number,
    _store: {[i: number]: boolean}
  ) {
    return !_store[_vertex];
  };

  const adjList = createAdjacencyList(_n, _prerequisites);

  for (let vertex = 0; vertex < _n; vertex++) {
    const queue: Array<number> = [];
    const seen: {[i: number]: boolean} = {};

    //Fill the queue with prerequisites
    for (let i = 0; i < adjList[vertex].length; i++) {
      queue.push(adjList[vertex][i]);
    }

    //% Perform BFS
    while (queue.length) {
      const current = queue.shift() as number;
      //Avoid looking at vertices prereqs we've already looked
      seen[current] = true;

      //!Cycle detection
      if (current === vertex) return false;

      const adjacent = adjList[current];

      for (let i = 0; i < adjacent.length; i++) {
        const nextVertex = adjacent[i];

        if (vertexHasNotBeenSeen(nextVertex, seen)) {
          queue.push(nextVertex);
        }
      }
    }
  }

  return true;
};

/**
 * Topological sort only applies to DAG
 */

const p2 = [
  [1, 0],
  [2, 1],
  [2, 5],
  [0, 3],
  [4, 3],
  [3, 5],
  [4, 5],
];

/**
 * T: O(p * n^2)
 * S: O(n^2)
 * @param _n Number of vertex
 * @param _prerequisites Connections
 * @returns
 */
const topCanFinish = function (
  _n: number,
  _prerequisites: Array<Array<number>>
) {
  const [inDegree, adjList] = (function createInDegreeAndAdjList(
    _n: number,
    _prerequisites: Array<Array<number>>
  ) {
    const inDegree: Array<number> = new Array(_n).fill(0);
    const adjList: Array<Array<number>> = inDegree.map(() => []);

    for (let i = 0; i < _prerequisites.length; i++) {
      const pair = _prerequisites[i];
      inDegree[pair[0]]++;
      adjList[pair[1]].push(pair[0]);
    }

    return [inDegree, adjList];
  })(_n, _prerequisites);

  for (let i = 0; i < _prerequisites.length; i++) {
    const pair = _prerequisites[i];
    inDegree[pair[0]]++;
    adjList[pair[1]].push(pair[0]);
  }

  const stack = [];

  for (let i = 0; i < inDegree.length; i++) {
    //InDegree and Adjlist share then same index
    if (inDegree[i] === 0) stack.push(i);
  }

  let count = 0;

  while (stack.length) {
    const current = stack.pop() as number;
    count++;

    const adjacentVertex = adjList[current];

    for (let i = 0; i < adjacentVertex.length; i++) {
      //Again, value is same as index
      const nextVertex = adjacentVertex[i];
      inDegree[nextVertex]--;

      if (inDegree[nextVertex] === 0) stack.push(nextVertex);
    }
  }

  return count === _n;
};

console.log(topCanFinish(6, p2));
