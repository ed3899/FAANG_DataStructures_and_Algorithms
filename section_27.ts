/**
 * Multiple way to represent graphs
 * adjacency list, object or matrix
 */

const adjList = [
  [1, 3],
  [0],
  [3, 8],
  [0, 2, 4, 5],
  [3, 6],
  [3],
  [4, 7],
  [6],
  [2],
];

/**
 *
 * @param _graph Adjacency list
 * @returns
 */
const traversalBFS_27 = function (_graph: Array<Array<number>>) {
  const queue: Array<number> = [0];
  const values = [];
  const seen: {[i: number]: boolean} = {};
  const haventSeenNode = function (_node: number) {
    return !seen[_node];
  };

  while (queue.length) {
    const vertex = queue.shift() as number;

    values.push(vertex);
    seen[vertex] = true;

    const connections = _graph[vertex];

    for (let i = 0; i < connections.length; i++) {
      const connection = connections[i];

      if (haventSeenNode(connection)) {
        queue.push(connection);
      }
    }
  }

  return values;
};

const values: Array<number> = [];

const travelsalDFS_27 = function (
  _vertex: number,
  _graph: Array<Array<number>>,
  _values: Array<number>,
  _seen: {[i: number]: boolean}
) {
  _values.push(_vertex);
  _seen[_vertex] = true;

  const haventSeenNode = function (_node: number) {
    return !_seen[_node];
  };

  const connections = _graph[_vertex];

  for (let i = 0; i < connections.length; i++) {
    const connection = connections[i];

    if (haventSeenNode(connection)) {
      travelsalDFS_27(connection, _graph, _values, _seen);
    }
  }

  return _values;
};

travelsalDFS_27(0, adjList, values, {});

console.log(values);

console.log(travelsalDFS_27(0, adjList, [], {}));
