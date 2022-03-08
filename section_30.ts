/**
 * There are n networks nodes labelled 1 to N
 *
 * Given a times array, containing edges represented by
 * arrays [u,v,w] where u is the source node, v is the
 * target node, and w is the time taken to travel from the
 * source node to the target node.
 *
 * Send a signal from node k, return how long it takes for
 * all nodes to receive the signal. Return -1  if it's
 * impossible
 *
 * n=5 nodes=1,2,3,4,5
 *
 * times = [[1,2,9],[1,4,2],[2,5,1],[4,2,4],[4,5,6],[3,2,3],[5,3,7],[3,1,5]]
 *
 * !Constraints
 *
 * Can the graph be unconnected? Yes
 * Can the time be negative integers? No, always positive
 *
 * %Test cases
 * Best case, prev section
 *
 * n=3 k=2 times=[[2,3,4]] -> -1
 *
 * n=3 k=1 times=[[1,2,8],[3,1,3]] -> -1
 */

import {PriorityQueue} from "./section_22";

const t = [
  [1, 2, 9],
  [1, 4, 2],
  [2, 5, 1],
  [4, 2, 4],
  [4, 5, 6],
  [3, 2, 3],
  [5, 3, 7],
  [3, 1, 5],
];

/**
 * @description
 * T: (E*logN + NlogN -> E*logN)
 * S: O(E+N)
 * Can the graph be unconnected? Yes
 * Can the time be negative integers? No, always positive
 * @param _times
 * @param _numberOfNodes
 * @param _selectedNode
 * @returns How long it takes for
 * all nodes to receive the signal. Return -1  if it's
 * impossible
 */
const networkDelayTime = function (
  _times: Array<Array<number>>,
  _numberOfNodes: number,
  _selectedNode: number
) {
  //Generates the data structures we need with an IIFE
  const [distancesArray, adjList, minHeap] = (function generateUtilities(
    _numberOfNodes: number,
    _selectedNode: number
  ) {
    //Generate distances Array
    const distancesArray = new Array(_numberOfNodes).fill(
      Infinity
    ) as Array<number>;

    //Generate adjList
    const adjList = distancesArray.map(() => []) as number[][][];

    // Consider the indexing of an array
    distancesArray[_selectedNode - 1] = 0;

    //Generate min heap to help us pick the smallest weight of values
    const minHeap = new PriorityQueue(
      (_a: number, _b: number) => distancesArray[_a] < distancesArray[_b]
    );

    return [distancesArray, adjList, minHeap];
  })(_numberOfNodes, _selectedNode);

  //Remember we consider the index
  minHeap.push(_selectedNode - 1);

  //Populates the adjList
  for (const item of _times) {
    const [source, target, weight] = item;
    adjList[source - 1].push([target - 1, weight]);
  }

  //Performs the traversal
  while (minHeap.isNotEmpty()) {
    const currentVertex = minHeap.pop()!;
    const adjacent = adjList[currentVertex];

    for (const item of adjacent) {
      const [neighbouringVertex, weight] = item;

      if (
        //Compare current weight vs distance stored for its neighbour
        distancesArray[currentVertex] + weight <
        distancesArray[neighbouringVertex]
      ) {
        //Set the value of the neighbour to the new lowest
        distancesArray[neighbouringVertex] =
          distancesArray[currentVertex] + weight;

        minHeap.push(neighbouringVertex);
      }
    }
  }

  //Verifies the answer, the array will contain value summing up to the shortest path
  const answer = Math.max(...distancesArray);
  return answer === Infinity ? -1 : answer;
};

console.log(networkDelayTime(t, 5, 1));

const t2 = [
  [1, 4, 2],
  [1, 2, 9],
  [4, 2, -4],
  [2, 5, -3],
  [4, 5, 6],
  [3, 2, 3],
  [5, 3, 7],
  [3, 1, 5],
];

/**
 * %Bellman and Ford
 * Dynamic Programming
 */

const netWorkTimeDelay_BellFord = function (
  _times: number[][],
  _numberOfNodes: number,
  _startingNode: number
) {
  //Generate only distances array
  const distancesArray = (function generateUtility(
    _numberOfNodes: number,
    _startingNode: number
  ) {
    //Generate distances Array
    const _distancesArray = new Array(_numberOfNodes).fill(
      Infinity
    ) as Array<number>;

    // Consider the indexing of an array
    _distancesArray[_startingNode - 1] = 0;

    return _distancesArray;
  })(_numberOfNodes, _startingNode);

  /**
   * _numberOfNodes -1 , the maximum amount of iteration to go through
   * all the nodes. Prevents us from falling into negative cycles
   */
  for (let i = 0; i < _numberOfNodes - 1; i++) {
    let count = 0;

    //Loop through the edges
    for (const edge of _times) {
      const [source, target, weight] = edge;
      /**
       * Sum up the cummulative distance towards that node towards that node, always
       * aiming for the shortest
       */
      if (distancesArray[source - 1] + weight < distancesArray[target - 1]) {
        distancesArray[target - 1] = distancesArray[source - 1] + weight;
        count++;
      }
    }

    //No values were updated
    if (count === 0) break;
  }

  //Verifies the answer, the array will contain value summing up to the shortest path
  const answer = Math.max(...distancesArray);

  //Making sure all nodes were reached
  return answer === Infinity ? -1 : answer;
};

console.log(netWorkTimeDelay_BellFord(t2, 5, 1));
