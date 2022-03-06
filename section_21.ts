/**
 * Given a binary tree, determine if its
 * a valid binary search tree
 *
 * !Constraints
 * Can there be duplicate values?
 * Yes,if you receive duplicate values
 * the tree is not a valid bst
 *
 * %Test cases
 * null -> True
 * 10 -> True
 */

import {BinarySearchTreeNode, BinarySearchTree, comparator} from "./section_17";

/**
 * T: O(n)
 * S: O(n) -> skewed tree
 *
 * @param _node
 * @param _min
 * @param _max
 * @returns True if the tree is a valid BST
 */
const dfs = function (
  _node: BinarySearchTreeNode<number>,
  _min: number = -Infinity,
  _max: number = Infinity
): boolean {
  /**
   * The equal checks for duplicates
   */
  if (_node.data <= _min || _node.data >= _max) return false;

  if (_node.leftNode) {
    /**
     * If we fail down the left side
     */
    if (!dfs(_node.leftNode, _min, _node.data)) {
      return false;
    }
  }

  /**
   * If we fail down the right side
   */
  if (_node.rightNode) {
    if (!dfs(_node.rightNode, _node.data, _max)) {
      return false;
    }
  }

  return true;
};

const isValidBST = function (_root: BinarySearchTreeNode<number>) {
  if (!_root) return true;
  return dfs(_root, -Infinity, Infinity);
};

const bst = new BinarySearchTree(comparator);
const n = [10, 5, 18, 3, 8, 12, 25];

n.forEach(n => {
  bst.insert(n);
});

console.log(isValidBST(bst.root!));
