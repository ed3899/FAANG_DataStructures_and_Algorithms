import {BinarySearchTree, BinarySearchTreeNode, comparator} from "./section_17";

const bst = new BinarySearchTree(comparator);
const bst2 = new BinarySearchTree(comparator),
  n = [1, 2, 3, 4, 5, 6, 7, 8],
  n2 = [20, 15, 30, 10, 16, 40, 13, 12];

n.forEach(n => bst.insert(n));
n2.forEach(n => bst2.insert(n));

/**
 * Given a binary tree, imagine you're standing to the right
 * of the tree. Return an array of the values of the nodes
 * you can see ordered from top to bottom
 *       20
 *     /    \
 *    15     30
 *   /  \    /  \
 *  10  16       40
 * / \
 *    13
 *   /
 *  12
 *
 * Result: [20,3,40,13,12]
 *
 * Constraints: Return an empty array when no nodes provided or null, also when only 1 value is
 * provided, it returns that value as [value]
 */
const rigthSideViewBFS = function <T>(
  root: BinarySearchTreeNode<T>
): Array<T | void> {
  if (!root) return [];
  const result = [];
  let queue = [root];

  while (queue.length) {
    let length = queue.length,
      count = 0,
      currentNode;

    while (count < length) {
      currentNode = queue.shift();

      if (currentNode?.leftNode) {
        queue.push(currentNode.leftNode);
      }

      if (currentNode?.rightNode) {
        queue.push(currentNode.rightNode);
      }

      count++;
    }

    result.push(currentNode?.data);
  }

  return result;
};

console.log("Right side view n = ", rigthSideViewBFS(bst.root!));
//Expected: [1, 2, 3, 4, 5, 6, 7, 8]
console.log("Right side view n2 = ", rigthSideViewBFS(bst2.root!));
//Expected: [20,30,40,13,12]
console.log("Right side view n2 with dfs", bst2.rightPreOrderTraversal());
//Expected: [20,30,40,13,12]

