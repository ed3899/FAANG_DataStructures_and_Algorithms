/**
 * --- A full tree
 *              A
 *             / \
 *            B   C
 *               / \
 *              D   E
 * Each node has either 0 or 2 nodes
 *
 * --- A complete tree
 *                A
 *             /     \
 *            B       C
 *           / \     / \
 *          D   E   F   G
 *          Full & Complete
 *
 *                A
 *             /     \
 *            B       C
 *           / \     / \
 *          D   E
 * Every level is completely full minus the last level or all
 * nodes pushed to the left
 */

/**
 * Given a complete binary tree, count the number of
 * nodes
 *
 * //? Test cases
 * Video at 3:22
 *
 */

import {BinarySearchTreeNode, BinarySearchTree, comparator} from "./section_17";

const bst = new BinarySearchTree(comparator);
const n = [40, 30, 100, 35, 70, 200, 34];
n.forEach(n => bst.insert(n));

/**
 * @description Assumes a node from a complete tree as its input.
 * @example A tree of the following form [40, 30, 100, 35, 70, 200, 34]
 * @param root
 * @returns The height of a complete tree starting from 0
 */
const getTreeHeight = function <T>(_root: BinarySearchTreeNode<T>): number {
  let height = 0;

  while (_root.leftNode) {
    height++;
    _root = _root.leftNode as BinarySearchTreeNode<T>;
  }

  return height;
};

const nodeExists = function <T>(
  _idxToFind: number,
  _height: number,
  _node: BinarySearchTreeNode<T> | null | undefined
): boolean {
  let left = 0,
    right = Math.pow(2, _height) - 1,
    count = 0;

  while (count < _height) {
    /**
     * Right inclusiveness
     */
    let midOfNode = Math.ceil((left + right) / 2);

    if (_idxToFind >= midOfNode) {
      _node = _node!.rightNode;
      left = midOfNode;
    } else {
      _node = _node!.leftNode;
      //Because of the >= this is non-inclusive
      right = midOfNode - 1;
    }

    count++;
  }

  return _node !== null;
};
/**
 * @description Counts the number of nodes in a complete tree.
 * Time is O(log^2 n) with n as the number of nodes.
 * Space: O(1)
 * @param root Initial node of a tree
 * @returns Number of nodes
 */
const countNodes = function <T>(root: BinarySearchTreeNode<T>): number {
  if (!root) return 0;

  const height = getTreeHeight(root); // O(h)

  if (height === 0) return 1;

  /**
   * Gets the upper count of the tree. Mathematically proved.
   * Also used as the index value for the right most pointer of
   * the bottom part of the tree, the nodes are stored in an array
   */
  const upperCount = Math.pow(2, height) - 1;

  let left = 0,
    right = upperCount;

  /**
   * Start performing binary search
   */
  while (left < right) {
    /**
     * We want to be right inclusive so we round up. We're trying to find
     * the right most value
     */
    let idxToFind = Math.ceil((left + right) / 2); // > O(h)

    /**
     * Reduce to the right side of the tree
     */
    if (nodeExists(idxToFind, height, root)) {
      // > O(h)
      left = idxToFind;
    } else {
      right = idxToFind - 1;
    }
  }

  /**
   * We can use either left of right because at the
   * end of the while loop both pointers have stored
   * the index value. We add one to get the length
   */
  return upperCount + left + 1;
};


