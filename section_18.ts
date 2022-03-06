/*
Given a binary tree, return the level order
traversal of the nodes values as an array
*/

//! Constraints

//Return an empty array if tree is empty

//% Test cases
// [[3],[6,1],[9,2,4],[5],[8]]
// [[3]]

import {comparator, BinarySearchTree, BinarySearchTreeNode} from "./section_17";

const bst = new BinarySearchTree(comparator),
  n = [9, 4, 6, 20, 170, 15, 1];

n.forEach(n => {
  bst.insert(n);
});

/**
 * Time is O(n) and space is O(n)
 * @param root
 * @returns Levels of a tree organized in an array of sub-arrays, from top to bottom
 */
const levelOrder = function <T>(root: BinarySearchTreeNode<T> | null) {
  if (!root) return [];

  const result = [],
    queue = [root];

  while (queue.length) {
    //Assignment doesn't change when property changes, only at the moment of assignment at every iteration
    let length = queue.length,
      count = 0;

    const currentLevelValues = [];

    while (count < length) {
      const currentNode = queue.shift() as BinarySearchTreeNode<T>;
      console.log(count, length);
      currentLevelValues.push(currentNode.data);

      if (currentNode.leftNode) queue.push(currentNode.leftNode);
      if (currentNode.rightNode) queue.push(currentNode.rightNode);

      count++;
      console.log(count, length);
    }

    result.push(currentLevelValues);
  }

  return result;
};

console.log(levelOrder(bst.root!));
